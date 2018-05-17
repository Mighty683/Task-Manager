import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import MainPage from './js/Components/MainPage/MainPage'
import { Provider } from 'react-redux'
import reducer from './js/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(reducer, applyMiddleware(thunk))
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </BrowserRouter>, document.getElementById('index'))
