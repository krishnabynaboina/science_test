import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import ErrorBoundary from 'react-error-boundaries'
import JssProvider from 'react-jss/lib/JssProvider'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import AppRouter from './router'
import store from './store'
import history from './history'
import { create } from 'jss'
import preset from 'jss-preset-default'

/* const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName */

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to React</h1>
          </header>
          <p className='App-intro'>
            <AppRouter />
          </p>
        </div>
      </Provider>
    )
  }
}
