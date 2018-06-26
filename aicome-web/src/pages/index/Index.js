import React, { Component } from 'react';
import '../../assets/style/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/style/vendor/animate/animate.css';
import '../../assets/style/vendor/css-hamburgers/hamburgers.min.css';
import '../../assets/style/vendor/animsition/css/animsition.min.css';
import '../../assets/style/vendor/select2/select2.min.css';
import '../../assets/style/vendor/daterangepicker/daterangepicker.css';
import '../../assets/style/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../assets/style/fonts/iconic/css/material-design-iconic-font.min.css';
import '../../assets/style/css/util.css';
import '../../assets/style/css/main.css';
import '../../assets/style/css/bootstrap.min.css'
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

        {/*<!-- Bootstrap core JavaScript -->*/}
        <script src="../../assets/style/vendor/jquery/jquery.min.js"></script>
        <script src="../../assets/style/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

      </div>
    );
  }
}
