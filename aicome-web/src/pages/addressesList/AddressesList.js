import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import * as addressesActions from '../../reduxStore/addresses/actions.js'

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'
import MapContainer from '../../components/map/MapContainer.js'

import './addressRegister.css'


class AddressesList extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  }
  render() {
    return (
      <div className="AddressesList">
        <NavBar />
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
    stores: state.storesReducer.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAddresses: () => dispatch(addressesActions.load())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressesList);