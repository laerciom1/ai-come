import React, { Component } from 'react';
import PropTypes from 'prop-types'

import * as cartAPI from '../../reduxStore/cart/api.js'

export default class Cart extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      cart: {}
    }
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({
        ...this.state,
        cart: this.context.store.getState().cartReducer.cart
      })
    })
  }

  componentDidMount() {
    this.context.store.dispatch(cartAPI.load())
  }

  renderItens = () => {
    if (this.state.cart.itens) {
      return (
        this.state.cart.itens.map((item, index) =>
          <div key={index} className="row">
            <div className="col-6 text-truncate">
              <span>{item.title}</span>
            </div>
            <div className="col-3 pl-0 pr-1">
              <span>R${parseFloat(item.totalValue).toFixed(2)}</span>
            </div>
            <div style={{ display: "block", width: "auto", height: "inherit" }}>
              <i className="fas fa-minus-circle text-danger"></i>
              <span style={{ display: "inline-block" }}>&nbsp;{item.qt}&nbsp;</span>
              <i className="fas fa-plus-circle text-success"></i>
            </div>
          </div>
        )
      )
    } else {

    }
  }

  renderResume = () => {
    console.log(this.state)
    return (
      <div>
        <div className="row">
          <div className="col-md-8 text-right">
            <span><strong>Sub Total Do Pedido</strong></span>
          </div>
          <div className="col-md-4 pl-0 text-left">
            <span>R${parseFloat(this.state.cart.subTotal).toFixed(2)}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 text-right">
            <span><strong>Taxa de entrega</strong></span>
          </div>
          <div className="col-md-4 pl-0 text-left">
            <span>R${parseFloat(this.state.cart.deliveryCost).toFixed(2)}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 text-right">
            <span><strong>Total</strong></span>
          </div>
          <div className="col-md-4 pl-0 text-left">
            <span>R${parseFloat(this.state.cart.total).toFixed(2)}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 text-right">
            <span className="small"><strong>Tempo de entrega estimado:</strong></span>
          </div>
          <div className="col-md-4 pl-0 text-left">
            <span className="small">{this.state.cart.estimatedTime}</span>
          </div>
        </div>
      </div>
    )
  }

  renderFinalize = () => {
    return (
      <div className="row align-items-center py-3">
        <div className="col-md-12">
          <a className="nav-link btn bg-danger text-white" onClick={cartAPI.finalize()}>Fechar pedido</a>
        </div>
      </div>
    )
  }

  render() {
    const itens = this.renderItens()
    const resume = this.renderResume()
    const finalize = this.renderFinalize()
    return (
      <div className="col-md-3 pl-0">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              {/*Cabecalho do carrinho*/}
              <div className="card-block bg-danger px-3">
                <div className="row align-items-center py-3">
                  <div className="col-md-3">
                    <i className="fas fa-shopping-cart fa-2x text-white"></i>
                  </div>
                  <div className="col-md-9">
                    <p className="h4 text-white">Seu carrinho</p>
                  </div>
                </div>
              </div>

              {this.state.cart.itens ?
                <div>
                  <div className="card-block py-1 px-1">
                    {itens}
                  </div>
                  <div className="card-block py-1 px-1 bg-light">
                    {resume}
                  </div>
                  <div className="card-block px-3">
                    {finalize}
                  </div>
                </div>
                :
                <div className="card-block py-1 px-1">
                  <label>EMPTY</label>
                </div>
              }
            </div>
          </div>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        </div>
      </div>
    );
  }
}