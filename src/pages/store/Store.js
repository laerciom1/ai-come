import 'rc-tabs/assets/index.css';
import React, { Component } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import './css/store.css';
import PropTypes from 'prop-types'
import * as AiComeAPI from '../../apis/AiComeAPI.js'
import NavBar from '../../components/navbar/navbar.js'
import Footer from '../../components/footer/footer.js'

export default class Store extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      store: {}
    }
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({
        ...this.state,
        store: this.context.store.getState().storesReducer.actualStore
      })
    })
  }

  componentDidMount() {
    let { id } = this.props.match.params
    this.context.store.dispatch(AiComeAPI.loadMenu(id))
  }

  render() {
    const contentStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100px',
      backgroundColor: '#fff',
    };
    return (
      <div className="Store">
        <NavBar />
        <div className="container py-3">
          <div className="card">
            <div className="row ">
              <div className="col-md-4">
                <img src="https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400" className="w-100" alt="" />
              </div>
              <div className="col-md-8 px-3">
                <div className="card-block px-3">
                  <br />
                  <h4 className="card-title">{this.state.store.name}</h4>
                  <p className="card-text">{this.state.store.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <Tabs data-extra="tabs"
              renderTabBar={() =>
                <SwipeableInkTabBar
                  pageSize={2}
                  speed={1}
                  data-extra="tabbar"
                />
              }
              renderTabContent={() => <TabContent />}
            >
              {[
                /* Cardapio begin */
                <TabPane tab={<div data-extra="tab-bar-title">{"Cardápio"}</div>} data-extra="tabpane" key={`${1}`}>
                  <div style={contentStyle}>
                    <p>Conteúdo</p>
                  </div>
                </TabPane>
                /* Cardapio end */,
                /* Info begin */
                <TabPane tab={<div data-extra="tab-bar-title">{"Informações"}</div>} data-extra="tabpane" key={`${2}`}>
                  <div style={contentStyle}>
                    <p>Conteúdo</p>
                  </div>
                </TabPane>
                /* Info end */
              ]}
            </Tabs>
          </div>
        </div>
        <Footer />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      </div >
    );
  }
}
