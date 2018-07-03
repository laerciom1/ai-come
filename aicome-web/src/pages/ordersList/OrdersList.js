import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import * as ordersActions from '../../redux/orders/actions.js'

import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'


class OrdersList extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      currentPage: 1,
      ordersPerPage: 10
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (pageNumber) => {
    if (pageNumber > 0 &&
      pageNumber <= Math.ceil(this.props.orders.length / this.state.ordersPerPage) &&
      // pageNumber <= Math.ceil(orders.length / this.state.ordersPerPage) &&
      pageNumber !== this.state.currentPage) {
      this.setState({
        currentPage: Number(pageNumber)
      });
    }
  }

  render() {
    const { currentPage, ordersPerPage } = this.state
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = this.props.orders.slice(indexOfFirstOrder, indexOfLastOrder);
    
    const renderOrders = currentOrders.map((order, index) => {
      return (
        <div key={index}>
          <div className="row">
            <div className="col-md-12">
              <h3>{order.storeName}</h3>
            </div>
          </div>
          <div className="row">
            {order.itens.map((item) => {
              return (
                <div key={item.id} className="col-2 text-truncate">
                  <span>{item.title}</span><br />
                  <span style={{ "fontSize": "11px" }}>
                    {item.size === "xl" ? "Gigante" :
                      item.size === "l" ? "Grande" :
                        item.size === "m" ? "Média" :
                          "Pequena"}
                  </span><br />
                  <span style={{ "fontSize": "11px" }}>Massa: {item.pasta.name}</span><br />
                  <span style={{ "fontSize": "11px" }}>Borda: {item.border.name}</span><br />
                  <span style={{ "fontSize": "11px" }}>Quantidade: {item.qt}</span><br />
                  <span style={{ "fontSize": "11px" }}>Valor unitário: {item.totalValue}</span><br />
                </div>
              )
            })
            }
          </div>
          <div className="row">
            <div className="col-md-12">
              <strong>Total:</strong> {order.total}<br/>
              <strong>Tempo de entrega estimado:</strong> {order.estimatedTime}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 offset-md-7">
              <Link className="btn bg-danger text-white" to={`order/${order.id}`}>Acompanhar este pedido em tempo real</Link>
            </div>
          </div>
          <hr />
        </div>
      )
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.orders.length / this.state.ordersPerPage); i++) {
    // for (let i = 1; i <= Math.ceil(orders.length / this.state.ordersPerPage); i++) {
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
      <div className="OrdersList">
        <NavBar />

        {/*<!-- Page Content -->*/}
        <div className="container">

          {/*<!-- Page Heading -->*/}
          <h1 className="my-4">Aqui está a lista dos seus pedidos <small>_</small></h1>

          {/*<!-- Stores -->*/}
          {renderOrders}

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
    orders: state.ordersReducer.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrder: (orderId) => dispatch(ordersActions.loadOrder(orderId)),
    addOrder: (order) => dispatch(ordersActions.addOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);