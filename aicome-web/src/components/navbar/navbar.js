import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      showMenu: false
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
  }

  renderDropDown() {
    return (
      <div>
        <li className="nav-item">
          <a className="nav-link btn bg-white text-danger dropdown-toggle"
            onClick={this.showMenu}>Bem-vindo, <strong>{localStorage.getItem('user_fname')}</strong></a>
        </li>

        {this.state.showMenu ?
          <div className="dd-menu bg-danger text-white">
            <li><Link className="btn bg-danger text-white nav-link" to={"/addresses"}>Meus endereços</Link></li>
            <li><Link className="btn bg-danger text-white nav-link" to={"/login"}>Sair</Link></li>
          </div>
          :
          null
        }
      </div>
    )
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
        <div className="container">
          <Link to={'/'} className="navbar-brand logo text-white"><strong>Ai Come</strong></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link">Sobre o Ai Come</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Cadastre seu restaurante</a>
              </li>
              {localStorage.getItem('access_token') ?
                this.renderDropDown()
                :
                <li className="nav-item">
                  <a className="nav-link btn bg-white text-danger" href="/login">Entrar ou cadastrar</a>
                </li>
              }
            </ul>
          </div>
        </div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      </nav>
    );
  }
}