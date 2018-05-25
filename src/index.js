import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import MainPage from './js/Components/MainPage/MainPage'
import { Provider } from 'react-redux'
import reducer from './js/reducers/index.js'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route } from 'react-router-dom'

const store = createStore(reducer, applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={MainPage} />
    </BrowserRouter>
  </Provider>, document.getElementById('index'))
