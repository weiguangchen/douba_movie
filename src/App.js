import React, { Component } from 'react';
import './App.css';
import Movie from './components/movie/movie';
import getMovie from './api/api';

import { Button } from 'antd-mobile';

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
        {this.state.movie.map(m => {
          return <Movie movieDetail={m} key={m.id}/>
        })}
        <Button>确认</Button>
      </div>
    );
  }

  componentWillMount() {
    getMovie().then(res => {
      console.log(res)
      this.setState({
        movie: res.data.subjects
      })
    })
  }
}
export default App;
