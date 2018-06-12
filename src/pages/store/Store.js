import React, { Component } from 'react';
import './css/store.css';
import './css/bootstrap.min.css';

export default class Store extends Component {
  constructor() {
    super()
    this.state = {
      menu: [
        {
          borders: ["Chocolate", "Catupiry", "Cheddar"],
          sizes: ["Gigante", "Grande", "Média", "Pequena"],
          tastes: []
        }
      ]
    }
  }

  render() {
    return (
      <div className="Store">
      </div>
    );
  }
}
