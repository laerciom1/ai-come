import React, { Component } from 'react';
import { geolocated } from 'react-geolocated'

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'
import MapContainer from '../../components/map/MapContainer.js'

import './addressRegister.css'


class AddressRegister extends Component {
  constructor() {
    super()
    this.state = {
      address: {
        lat: 0,
        lng: 0,
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        zip: ''
      }
    }
  }

  setAddress = (address) => {
    this.setState({
      address
    })
  }

  componentDidMount() {
    if (this.props.location.state.addressId) {
      console.log(this.props.location.state)
    }
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
                <MapContainer lat={this.props.coords.latitude}
                  lng={this.props.coords.longitude}
                  addressCallback={this.setAddress}
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
              <input  type="text" placeholder="Número" className="form-control" value={this.state.address.number} 
                      onChange={(event) => this.setState({address: {...this.state.address, number: event.target.value}})} />
            </div>
          </div>
          <br />
          <div className="row form-line">
            <label className="col-md-1 control-label">Bairro</label>
            <div className="col-md-3">
              <input type="text" placeholder="Bairro" className="form-control" value={this.state.address.neighborhood} disabled/>
            </div>
            <label className="col-md-1 control-label" >Cidade</label>
            <div className="col-md-3">
              <input type="text" placeholder="Cidade" className="form-control" value={this.state.address.city} disabled/>
            </div>
            <label className="col-md-1 control-label" >CEP</label>
            <div className="col-md-3">
              <input type="text" placeholder="CEP" className="form-control" value={this.state.address.zip} disabled/>
            </div>
          </div>
          <br />
          <div className="row form-line">
            <div className="col-md-12">
              <button type="submit" className="btn btn-default">Cancel</button>
              <button type="submit" className="btn btn-danger">Save</button>
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