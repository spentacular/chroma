import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'

const renderApp = () => {
  render(
    <App />,
    document.getElementById('app')
  )
}

renderApp()
