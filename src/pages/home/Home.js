import React, { Component } from 'react';
import './css/home.css';
import './css/bootstrap.min.css';

import Footer from '../../components/footer/footer.js'
import NavBar from '../../components/navbar/navbar.js'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      storesPerPage: 4,
      stores: [
        {
          name: "Loja 1",
          bio: "Bio Loja 1",
          image: "",
          id: 1
        },
        {
          name: "Loja 2",
          bio: "Bio Loja 2",
          image: "",
          id: 2
        },
        {
          name: "Loja 3",
          bio: "Bio Loja 3",
          image: "",
          id: 3
        },
        {
          name: "Loja 4",
          bio: "Bio Loja 4",
          image: "",
          id: 4
        },
        {
          name: "Loja 5",
          bio: "Bio Loja 5",
          image: "",
          id: 5
        },
        {
          name: "Loja 6",
          bio: "Bio Loja 6",
          image: "",
          id: 6
        },
        {
          name: "Loja 7",
          bio: "Bio Loja 7",
          image: "",
          id: 7
        },
        {
          name: "Loja 8",
          bio: "Bio Loja 8",
          image: "",
          id: 8
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event, pageNumber) => {
    if (pageNumber > 0 && pageNumber <= this.state.stores.length / this.state.storesPerPage) {
      this.setState({
        currentPage: Number(pageNumber)
      });
    }
  }

  render() {
    const { stores, currentPage, storesPerPage } = this.state
    // Logic for displaying stores
    const indexOfLastStore = currentPage * storesPerPage;
    const indexOfFirstStore = indexOfLastStore - storesPerPage;
    const currentStores = stores.slice(indexOfFirstStore, indexOfLastStore);

    const renderStores = currentStores.map((store, index) => {
      return (
        <div key={index}>
          <div className="row">
            <div className="col-md-7">
              <a>
                <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="" />
              </a>
            </div>
            <div className="col-md-5">
              <h3>{store.name}</h3>
              <p>{store.bio}</p>
              <a className="btn bg-danger text-white">Visitar página da loja</a>
            </div>
          </div>
          <hr />
        </div>
      )
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.stores.length / this.state.storesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className="page-item" key={number} id={number} onClick={(event) => this.handleClick(event, number)}>
          <a className="page-link">{number}</a>
        </li>
      );
    });

    return (
      <div className="Home">
        {/*<!-- Navigation -->*/}
        <NavBar />

        {/*<!-- Page Content -->*/}
        <div className="container">

          {/*<!-- Page Heading -->*/}
          <h1 className="my-4">Escolha seu restaurante preferido <small>_</small></h1>

          {/*<!-- Stores -->*/}
          {renderStores}

          {/*<!-- Pagination -->*/}
          <ul className="pagination justify-content-center">
            <li className="page-item" onClick={(event) => this.handleClick(event, this.state.currentPage - 1)}>
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>

            {renderPageNumbers}

            <li className="page-item" onClick={(event) => this.handleClick(event, this.state.currentPage + 1)}>
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>

          {/*<!-- Bootstrap core JavaScript -->*/}
          <script src="vendor/jquery/jquery.min.js"></script>
          <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        </div>
        <br/><br/>
        <Footer />
      </div>
    );
  }
}
