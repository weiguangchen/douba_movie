import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import Tabbar from './components/tabBar/tabBar';
import List from './components/list/list'
import MovieDetail from './components/movieDetail/detail';
import AllComments from './components/comments/allComments';
import { BrowserRouter, Route, } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <>
            <Route exact  path='/' component={App} />
            <Route path='/movieDetail/:id' component={MovieDetail} />
            <Route path='/allComments/:id' component={AllComments}/>
        </>
    </BrowserRouter>
), document.getElementById('root'))

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
