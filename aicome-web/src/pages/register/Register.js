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


export default class Register extends Component {
  fazRegistro = (event) => {
    event.preventDefault()
    const loginInfo = {
      login: this.inputLogin.value,
      senha: this.inputPass.value,
      firstName: this.inputFirstName.value,
      lastName: this.inputLastName.value
    }
    localStorage.setItem('USER_firstName', loginInfo.firstName)
    localStorage.setItem('USER_lastName', loginInfo.lastName)
    localStorage.setItem('username', loginInfo.login)
    this.props.history.push('/')
    // fetch(`http://localhost:3001/login?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
    //   method: 'POST',
    //   body: JSON.stringify(loginInfo)
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw response.json()
    //     }
    //     return response.json()
    //   })
    //   .then((jsonResponse) => {
    //     localStorage.setItem('TOKEN', jsonResponse.token)
    //     localStorage.setItem('ACTUALUSER', loginInfo.login)
    //     this.props.history.push('/')
    //   })
    //   .catch((error) => {
    //     this.setState({ hasError: true, errorMessage: "Usuario Invalido" })
    //     //this.props.history.push({
    //     //    pathname:'/error',
    //     //    message: 'Usuario Invalido'
    //     //})
    //   })
  }
  render() {
    localStorage.removeItem('USER_firstName')
    localStorage.removeItem('USER_lastName')
    localStorage.removeItem('username')
    return (
      <div className="Register">
        <div className="limiter">
          <div className="container-login100 bg-danger">
            <div className="shadow wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form className="login100-form validate-form" action="/" onSubmit={this.fazRegistro}>
                <span className="login100-form-title p-b-49">Cadastro</span>
                <div className="wrap-input100 validate-input m-b-23" data-validate="Usuário é obrigatório">
                  <span className="label-input100">Usuário</span>
                  <input  className="input100" type="text" name="username" id="username" placeholder="Digite seu usuário"
                          ref={ (inputLogin) => this.inputLogin = inputLogin }/>
                  <span className="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div className="wrap-input100 validate-input m-b-23" data-validate="Primeiro nome é obrigatório">
                  <span className="label-input100">Primeiro nome</span>
                  <input  className="input100" type="text" name="firstName" id="firstName" placeholder="Digite seu primeiro nome"
                          ref={ (inputFirstName) => this.inputFirstName = inputFirstName }/>
                  <span className="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div className="wrap-input100 validate-input m-b-23" data-validate="Último nome é obrigatório">
                  <span className="label-input100">Último nome</span>
                  <input  className="input100" type="text" name="lastName" id="lastName" placeholder="Digite seu último nome"
                          ref={ (inputLastName) => this.inputLastName = inputLastName }/>
                  <span className="focus-input100" data-symbol="&#xf206;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Senha é obrigatório">
                  <span className="label-input100">Senha</span>
                  <input  className="input100" type="password" name="password" id="password" placeholder="Digite sua senha"
                          ref={ (inputPass) => this.inputPass = inputPass }/>
                  <span className="focus-input100" data-symbol="&#xf190;"></span>
                </div>

                 <div className="wrap-input100 validate-input" data-validate="Confirmar a senha é obrigatório">
                  <span className="label-input100">Confirme a senha</span>
                  <input  className="input100" type="password" name="passconfirm" id="passconfirm" placeholder="Confirme sua senha"
                          ref={ (inputPassConfirm) => this.inputPassConfirm = inputPassConfirm }/>
                  <span className="focus-input100" data-symbol="&#xf190;"></span>
                </div>
                <br/><br/>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="login100-form-btn" type="submit">Cadastrar</button>
                  </div>
                </div>

                <div className="flex-col-c p-t-25">
                  <span className="txt1 p-b-17">Já tem uma conta?</span>

                  <a className="txt2" href="/login">Faça Login</a>
                </div>
              </form>
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
