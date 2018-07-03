import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import * as config from '../../config';

import * as storesActions from '../../redux/stores/actions.js'

import './home.css';

import Footer from '../../components/footer/footer.js'
import NavBar from '../../components/navbar/navbar.js'

class Home extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      currentPage: 1,
      storesPerPage: 4
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (pageNumber) => {
    if (pageNumber > 0 &&
      pageNumber <= Math.ceil(this.state.stores.length / this.state.storesPerPage) &&
      pageNumber !== this.state.currentPage) {
      this.setState({
        currentPage: Number(pageNumber)
      });
    }
  }

  componentDidMount() {
    this.props.onInitStores();
  }

  render() {
    const { currentPage, storesPerPage } = this.state
    // Logic for displaying stores
    const indexOfLastStore = currentPage * storesPerPage;
    const indexOfFirstStore = indexOfLastStore - storesPerPage;
    const currentStores = this.props.stores.slice(indexOfFirstStore, indexOfLastStore);

    const renderStores = currentStores.map((store, index) => {
      return (
        <div key={index}>
          <div className="row">
            <div className="col-md-7">
              <Link to={`store/${store.id}`}><img className="img-fluid rounded mb-3 mb-md-0" src={store.thumbnailImage ? config.API_URL + store.thumbnailImage : 'http://placehold.it/700x300'} alt="" /></Link>
            </div>
            <div className="col-md-5">
              <h3>{store.name}</h3>
              <p>{store.bio}</p>
              <Link className="btn bg-danger text-white" to={`store/${store.id}`}>Visitar página da loja</Link>
            </div>
          </div>
          <hr />
        </div>
      )
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.stores.length / this.state.storesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className="page-item" key={number} id={number} onClick={() => this.handleClick(number)}>
          <a className="page-link">{number}</a>
        </li>
      );
    });
    return (
      <div className="Home">
        <NavBar />

        {/*<!-- Page Content -->*/}
        <div className="container">

          {/*<!-- Page Heading -->*/}
          <h1 className="my-4">Escolha seu restaurante preferido <small>_</small></h1>

          {/*<!-- Stores -->*/}
          {renderStores}

          {/*<!-- Pagination -->*/}
          <ul className="pagination justify-content-center">
            <li className="page-item" onClick={() => this.handleClick(this.state.currentPage - 1)}>
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>

            {renderPageNumbers}

            <li className="page-item" onClick={() => this.handleClick(this.state.currentPage + 1)}>
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </div>
        <br /><br />
        <Footer />
        {/* Bootstrap core CSS */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" />
        {/* Bootstrap core JavaScript */}
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stores: state.storesReducer.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStores: () => dispatch(storesActions.loadStores())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);