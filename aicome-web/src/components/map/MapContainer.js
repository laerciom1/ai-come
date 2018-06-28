import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

const apiKey = 'AIzaSyDHPPJZhwkqPfC-waP7HW_NzRqCYqDUNoE'
export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      marker: {
        lat: props.lat ? props.lat : 0,
        lng: props.lng ? props.lng : 0
      },
      addressId: props.addressId
    }
    this.mapClicked = this.mapClicked.bind(this);
  }

  mapClicked(mapProps, map, clickEvent) {
    this.setState({
      marker: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      }
    })
    var address = {
      id: this.state.addressId,
      lat: this.state.marker.lat,
      lng: this.state.marker.lng,
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      zip: ''
    }

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.marker.lat},${this.state.marker.lng}&result_type=street_address&key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw response.json()
        }
        return response.json()
      })
      .then((jsonResponse) => {
        if (jsonResponse.status === 'OK') {
          address = {
            ...address,
            lat: jsonResponse.results[0].geometry.location.lat,
            lng: jsonResponse.results[0].geometry.location.lng
          }
          const addressComponents = jsonResponse.results[0].address_components
          addressComponents.forEach(addressComponent => {
            const types = addressComponent.types
            types.forEach(type => {
              if (type === 'street_number') { //number
                address = {
                  ...address,
                  number: addressComponent.long_name
                }
              } else if (type === 'route' || type === 'premise') { //street
                address = {
                  ...address,
                  street: addressComponent.long_name
                }
              } else if (type === 'sublocality') { //neighborhood
                address = {
                  ...address,
                  neighborhood: addressComponent.long_name
                }
              } else if (type === 'locality') { //city
                address = {
                  ...address,
                  city: addressComponent.long_name
                }
              } else if (type === 'postal_code') { //zip
                address = {
                  ...address,
                  zip: addressComponent.long_name
                }
              }
            })
          })
          this.props.addressCallback(address)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map google={this.props.google}
        style={style}
        initialCenter={{
          lat: this.props.lat ? this.props.lat : this.state.marker.lat, //lat e lng do IMD
          lng: this.props.lng ? this.props.lng : this.state.marker.lng
        }}
        zoom={18}
        onClick={this.mapClicked} >
        <Marker position={{ lat: this.props.lat ? this.props.lat : this.state.marker.lat,
                            lng: this.props.lng ? this.props.lng : this.state.marker.lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(MapContainer)