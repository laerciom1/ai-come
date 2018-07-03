import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as addressesActions from '../../redux/addresses/actions.js'

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'

import './addressesList.css'


class AddressesList extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.loadAddresses()
  }

  removeAddress(addressId) {
    this.props.removeAddress(addressId)
  }

  editAddress(addressId) {
    this.props.history.push({
      pathname: '/addressEdit',
      state: {addressId: addressId}
    })
  }

  renderAddresses() {
    return (
      this.props.addresses ?
        this.props.addresses.map((a) => {
          return (
            <div key={a.id}>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{a.street}, {a.number}</h6>
                  <div className="row">
                    <div className="col-md-10">
                      <p className="card-text">{a.neighborhood} - {a.city}</p>
                    </div>
                    <div className="col-md-1">
                      <a className="btn bg-danger text-white"
                        onClick={() => this.removeAddress(a.id)}>Remover</a>
                    </div>
                    <div className="col-md-1">
                      <a className="btn bg-danger text-white"
                        onClick={() => this.editAddress(a.id)}>Editar</a>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          )
        })
        :
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Nenhum endereço cadastrado <strong>:( :( :(</strong></h6>
          </div>
        </div>
    )
  }

  render() {
    const addresses = this.renderAddresses()
    return (
      <div className="AddressesList">
        <NavBar />
        <br /><br />
        <div className="container">
          {addresses}
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

const mapStateToProps = (state) => {
  return {
    addresses: state.addressesReducer.addresses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAddresses: () => dispatch(addressesActions.load()),
    removeAddress: (addresId) => dispatch(addressesActions.removeAddress(addresId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressesList);