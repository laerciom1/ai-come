import React, { Component } from 'react';
import { geolocated } from 'react-geolocated'
import qs from 'qs';
import axios from 'axios'

import * as config from '../../config'

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'
import MapContainer from '../../components/map/MapContainer.js'

import './addressRegister.css'


class AddressRegister extends Component {
  constructor() {
    super()
    this.state = {
      address: {
        id: 0,
        lat: 0,
        lng: 0,
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        zip: ''
      }
    }
    this.saveAddress = this.saveAddress.bind(this)
  }

  setAddress = (address) => {
    this.setState({
      address: {
        ...address
      }
    })
  }

  componentDidMount() {
    if (this.props.location.state) {
      const addressId = this.props.location.state.addressId
      axios.get(config.API_URL + `/me/addresses`)
        .then(response => {
          const address = response.data.find((a) => a.id === addressId)
          this.setAddress(address, true)
        })
        .catch(error => {
          console.error(error);
        })
    }
  }

  saveAddress() {
    const basicAuth = {
      username: config.CLIENT_ID,
      password: config.CLIENT_SECRET
    }

    const payloadData = this.state.address

    const headerData = {
      'content-type': 'application/json'
    }

    const request = {
      method: 'PUT',
      headers: headerData,
      auth: basicAuth,
      data: qs.stringify(payloadData),
      url: `${config.API_URL}/me/addresses/${this.state.address.id}`
    }

    axios(request).then(response => {
      this.props.history.push('/addresses')
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="AddressRegister">
        <NavBar />
        <div className="container">
          <div className="row">
            <h1 className="my-4">Cadastre seu endereço <small>_</small></h1>
            {this.props.coords ?
              <div className="col-md-12 map">
                <MapContainer lat={this.state.address.lat !== 0 ? this.state.address.lat : this.props.coords.latitude}
                  lng={this.state.address.lng !== 0 ? this.state.address.lng : this.props.coords.longitude}
                  addressCallback={this.setAddress}
                  addressId={this.state.address.id}
                />
              </div>
              :
              ''
            }
          </div>
          <br />
          <legend>Dados do endereço</legend>
          <br />
          <div className="row form-line">
            <label className="col-md-1 control-label">Rua</label>
            <div className="col-md-8">
              <input type="text" placeholder="Rua" className="form-control" value={this.state.address.street} disabled />
            </div>
            <label className="col-md-1 control-label">Número</label>
            <div className="col-md-2">
              <input type="text" placeholder="Número" className="form-control" value={this.state.address.number}
                onChange={(event) => this.setState({ address: { ...this.state.address, number: event.target.value } })} />
            </div>
          </div>
          <br />
          <div className="row form-line">
            <label className="col-md-1 control-label">Bairro</label>
            <div className="col-md-3">
              <input type="text" placeholder="Bairro" className="form-control" value={this.state.address.neighborhood} disabled />
            </div>
            <label className="col-md-1 control-label" >Cidade</label>
            <div className="col-md-3">
              <input type="text" placeholder="Cidade" className="form-control" value={this.state.address.city} disabled />
            </div>
            <label className="col-md-1 control-label" >CEP</label>
            <div className="col-md-3">
              <input type="text" placeholder="CEP" className="form-control" value={this.state.address.zip} disabled />
            </div>
          </div>
          <br />
          <div className="row form-line">
            <div className="col-md-12">
              <button type="submit" className="btn btn-default">Cancel</button>
              <button type="submit" className="btn btn-danger" onClick={this.saveAddress}>Save</button>
            </div>
          </div>
        </div>
        <Footer />
        {/* CSS */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" />
        {/* JS */}
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(AddressRegister);