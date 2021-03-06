import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as config from '../../config';

import * as storesActions from '../../redux/stores/actions.js'
import * as cartActions from '../../redux/cart/actions.js'

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'
import Cart from '../../components/cart/cart.js'

import './store.css';

class Store extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      selectedSize: '',
      selectedPasta: {},
      selectedBorder: {}
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params
    this.props.loadActualStore(id)
  }

  renderSizes = () => {
    return (
      <section>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block px-3">
                <br />
                <h4 className="card-title">1. Tipo / Tamanho da pizza</h4>
                {this.props.store.menu.sizes.map( (size, index) => {
                  return (<label key={index} className="radio-inline col-3 opt">
                    <input type="radio" name="size" value={JSON.stringify(size)}
                          onChange={(event) => this.setState({selectedSize: event.target.value})}/>
                          {size.name}
                  </label>)  
                } )}
                <br /><br />
              </div>
            </div>
          </div>
        </div >
      </section >
    );
  }

  renderPastas = () => {
    return (
      <section>
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block px-3">
                <br />
                <h4 className="card-title">2. Tipo da massa </h4>
                {this.props.store.menu.pastas.map((pasta, index) =>
                  <label key={index} className="radio-inline col-4 opt">
                    <input  type="radio" name="pasta" value={JSON.stringify(pasta)}
                            onChange={(event) => this.setState({selectedPasta: event.target.value})}/>
                      {pasta.name} (R${parseFloat(pasta.value).toFixed(2)})
                  </label>
                )}
                <br /><br />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderBorders = () => {
    return (
      <section>
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block px-3">
                <br />
                <h4 className="card-title">3. Bordas recheadas</h4>
                {this.props.store.menu.borders.map((border, index) =>
                  <label key={index} className="radio-inline col-3 opt">
                  <input  type="radio" name="border" value={JSON.stringify(border)}
                          onChange={(event) => this.setState({selectedBorder: event.target.value})}/> {border.name} (R${parseFloat(border.value).toFixed(2)})</label>
                )}
                <br /><br />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderTastes = () => {
    return (
      <section>
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block px-3">
                <br />
                <h4 className="card-title">4. Escolha o sabor</h4>
                {this.props.store.menu.tastes.map((taste, index) =>
                  <li key={index}>
                    <div className="row">
                      <div className="col-md-10">
                        <p><strong>{taste.name}</strong></p>
                        <p>{taste.description}</p>
                      </div>
                      <div className="col-md-2">
                        <a className="nav-link btn bg-danger text-white" onClick={() => this.addItem(taste)}>+</a>
                      </div>
                    </div>
                    <hr />
                  </li>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderMenu = () => {
    if (this.props.store && this.props.store.menu) {
      return (
        <div className="col-md-9">
          {this.renderSizes()}
          <br />
          {this.renderPastas()}
          <br />
          {this.renderBorders()}
          <br />
          {this.renderTastes()}
          <br />
          <br />
          <br />
        </div>
      )
    } else {
      return "not yet"
    }
  }

  addItem (taste) {
    if(this.state.selectedSize !== '' && this.state.selectedPasta !== '' && this.state.selectedBorder !== '') {
      const item = {
        storeId: this.props.store.id,
        storeName: this.props.store.name,
        size: JSON.parse(this.state.selectedSize),
        pasta: JSON.parse(this.state.selectedPasta),
        border: JSON.parse(this.state.selectedBorder),
        taste: taste,
        title: taste.name
      }
      this.props.addItemCart(item)
    }
  }

  render() {
    const menuContent = this.renderMenu()
    return (
      <div className="Store">
        <NavBar />
        <br /><br />
        <div className="container">

          {/* Store Card*/}
          {(this.props.store) ? 
          <section>
            <div className="container py-3">
              <div className="card">
                <div className="row ">
                  <div className="col-md-3">
                    <img className="w-100" src={this.props.store.profileImage ? config.API_URL + this.props.store.profileImage : 'http://via.placeholder.com/200x200'} alt="" />
                  </div>
                  <div className="col-md-9 px-3">
                    <div className="card-block px-3">
                      <br />
                      <h4 className="card-title">{this.props.store.name}</h4>
                      <p className="card-text">{this.props.store.bio}</p>
                      <a className="btn btn-danger text-white">+ Informações</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> : null}

          {(this.props.store) ? 
          <div className="container">
            <div className="row">
              {/* Menu*/}
              {menuContent}
              <Cart />
            </div>
          </div> : null}

          <Footer />
          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
          <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.storesReducer.actualStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadActualStore: (storeId) => dispatch(storesActions.loadActualStore(storeId)),
    addItemCart: (item) => dispatch(cartActions.addItemCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);