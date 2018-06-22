import React, { Component } from 'react';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/animsition/css/animsition.min.css';
import './vendor/select2/select2.min.css';
import './vendor/daterangepicker/daterangepicker.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './fonts/iconic/css/material-design-iconic-font.min.css';
import './css/util.css';
import './css/main.css';
import './css/bootstrap.min.css'

import './css/index.css';
import './css/bootstrap.min.css';

import Footer from '../../components/footer/footer.js'
import NavBar from '../../components/navbar/navbar.js'

export default class Index extends Component {
  render() {
    return (
      <div className="Index bg-dark">
        {/*<!-- Navigation -->*/}
        <NavBar />

        <div class="container">
          <img className="bgImg" src={require('./images/bg.jpg')} alt=""/>
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

        {/*<!-- Bootstrap core JavaScript -->*/}
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

      </div>
    );
  }
}
