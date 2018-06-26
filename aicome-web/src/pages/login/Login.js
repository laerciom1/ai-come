import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as authActions from '../../reduxStore/auth/actions'

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


class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    return (
      <div className="Login">
        <div className="limiter">
          <div className="container-login100 bg-danger">
            <div className="shadow wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              {/* <form className="login100-form validate-form" onSubmit={this.fazLogin}> */}
                <span className="login100-form-title p-b-49">Login</span>
                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                  <span className="label-input100">Usuário</span>
                  <input  className="input100" type="text" name="username" id="username" 
                          placeholder="Digite seu usuário"
                          onChange={(event) => this.setState({username: event.target.value})}
                          ref={ (inputLogin) => this.inputLogin = inputLogin }/>
                  <span className="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <span className="label-input100">Senha</span>
                  <input  className="input100" type="password" name="pass" id="password" placeholder="Digite sua senha"
                          onChange={(event) => this.setState({password: event.target.value})}
                          ref={ (inputPass) => this.inputPass = inputPass }/>
                  <span className="focus-input100" data-symbol="&#xf190;"></span>
                </div>

                <div className="text-right p-t-8 p-b-31">
                  <a>Esqueceu sua senha?</a>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button onClick={() => this.props.onLogin(this.state.username, this.state.password)} className="login100-form-btn">Login</button>
                  </div>
                </div>

                <div className="flex-col-c p-t-25">
                  <span className="txt1 p-b-17">Não tem uma conta?</span>

                  <a className="txt2" href="/register">Cadastre-se</a>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>


        <div id="dropDownSelect1"></div>

        <script src="../../assets/style/vendor/jquery/jquery-3.2.1.min.js"></script>
        <script src="../../assets/style/vendor/animsition/js/animsition.min.js"></script>
        <script src="../../assets/style/vendor/bootstrap/js/popper.js"></script>
        <script src="../../assets/style/vendor/bootstrap/js/bootstrap.min.js"></script>
        <script src="../../assets/style/vendor/select2/select2.min.js"></script>
        <script src="../../assets/style/vendor/daterangepicker/moment.min.js"></script>
        <script src="../../assets/style/vendor/daterangepicker/daterangepicker.js"></script>
        <script src="../../assets/style/vendor/countdowntime/countdowntime.js"></script>
        <script src="../../assets/style/js/main.js"></script>
        <script src="../../assets/style/js/bootstrap.min.js"></script>
        <script src="../../assets/style/js/jquery-3.3.1.slim.min.js"></script>
        <script src="../../assets/style/js/popper.min.js"></script>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => dispatch(authActions.login(username, password))
  }
}

export default connect(null, mapDispatchToProps)(Login);