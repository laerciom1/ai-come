import React, { Component } from 'react';

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'


class AddressRegister extends Component {

  render() {
    return (
      <div className="AddressRegister">
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

export default AddressRegister;