import React, { Component } from 'react';
import '../../assets/style/css/util.css';
import '../../assets/style/css/main.css';
import './index.css';

import Footer from '../../components/footer/footer.js'
import NavBar from '../../components/navbar/navbar.js'

export default class Index extends Component {
  render() {
    return (
      <div className="Index bg-dark">
        {/*<!-- Navigation -->*/}
        <NavBar />

        <div class="container">
          <img className="bgImg" src={require('../../assets/style/images/bg.jpg')} alt=""/>
          <div class="jumbotron shadow text-danger text-center">
            <span><h1><strong>Delivery pra qualquer fome:<br />Peça e receba em casa</strong></h1></span>
            <br/>
            <form className="login100-form validate-form" action="/" onSubmit={this.fazLogin}>
              <div className="wrap-input100 validate-input m-b-23">
                <input className="input100 text-center" type="text" name="username" id="username" placeholder="Procure por um restaurante..."
                  ref={(inputStore) => this.inputStore = inputStore} />
                <span className="focus-input100"></span>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" type="submit">Procurar</button>
                </div>
              </div>
            </form>
          </div>
        </div>


        {/*<!-- Page Content -->*/}
        <Footer />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      </div>
    );
  }
}
