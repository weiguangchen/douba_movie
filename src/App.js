import React, { Component } from 'react';
import './App.scss';
import Tabbar from './components/tabBar/tabBar';
import { getMovie } from './api/api';
import MovieList from './components/list/movieList';
import { BrowserRouter, Route, } from 'react-router-dom';

function getData(start = 0) {
  return getMovie(start).then(res => {
    let dataSource = {};
    let dataBlobs = [];
    let rowIDs = [];
    res.data.subjects.map(m => {
      dataBlobs[m.id] = m;
      rowIDs.push(m.id);
    })
    dataSource = {
      dataBlobs, rowIDs
    }
    return dataSource;
  }, err => err)
}


const NewMovieList = function(){
  return <MovieList getData={getData} />;
}

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
          <Route path="/" component={NewMovieList} />
        </div>
        <Route component={Tabbar} path='/' />
      </div>
    );
  }

  componentDidMount() {

  }
}


export default App;
