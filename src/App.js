import React, { Component } from 'react';
import './App.scss';
import Tabbar from './components/tabBar/tabBar';
import { getMovie } from './api/api';
import List from './components/list/list'
import { BrowserRouter, Route, } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: []
    }
  }

  render() {
    return (
      <div className="App">
        <div className='scroll-wrapper'>
          <Route path="/" component={List} />
        </div>
        <Route component={Tabbar} path='/' />
      </div>
    );
  }

  componentDidMount() {
    getMovie().then(res => {
      this.setState({
        movie: res.data.subjects
      })
    })
  }
}


export default App;
