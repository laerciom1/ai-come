import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      marker: {
        lat: -5.8339954,
        lng: -35.2098009
      }
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
      lat: 0,
      lng: 0,
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      zip: ''
    }

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.marker.lat},${this.state.marker.lng}&sensor=false`)
      .then((response) => {
        if (!response.ok) {
          throw response.json()
        }
        return response.json()
      })
      .then((jsonResponse) => {
        const addressComponents = jsonResponse.results[0].address_components
        addressComponents.forEach(addressComponent => {
          const types = addressComponent.types
          types.forEach(type => {
            if (type === 'street_number') { //number
              address = {
                ...address,
                number: addressComponent.long_name
              }
            } else if (type === 'route') { //street
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
        <Marker position={{ lat: this.state.marker.lat, lng: this.state.marker.lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDHPPJZhwkqPfC-waP7HW_NzRqCYqDUNoE')
})(MapContainer)