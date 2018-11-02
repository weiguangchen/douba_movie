import React, { Component } from 'react';
import './App.scss';
import Movie from './components/movie/movie';
import Tabbar from './components/tabBar/tabBar';
import Scroll from './components/scroll/scroll';
import getMovie from './api/api';
import { ListView } from 'antd-mobile';
// 上拉加载

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
          {/* <Scroll> */}
            {this.state.movie.map(m => {
              return <Movie movieDetail={m} key={m.id} />
            })}
          {/* </Scroll> */}
        </div>

        <Tabbar className='tabbar' />
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
