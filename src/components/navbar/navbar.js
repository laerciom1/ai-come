import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import './bootstrap.min.css';

export default class NavBar extends Component {
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
                            <li className="nav-item">
                                <a className="nav-link">Contato</a>
                            </li>
                            {   localStorage.getItem('USER_firstName') ?
                                <li className="nav-item">
                                    <a className="nav-link">Bem-vindo, <strong>{localStorage.getItem('USER_firstName')}</strong></a>
                                </li>
                                :
                                <li className="nav-item">
                                    <a className="nav-link btn bg-white text-danger" href="/login">Entrar ou cadastrar</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}