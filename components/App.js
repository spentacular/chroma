import React, { Component } from 'react'
import Picker from './Picker.js'

class App extends Component {
  render () {
    return (
      <div>
        <Picker />
      </div>
    )
  }
}

function randColor (min, max, div = 1) {
  return (Math.floor(Math.random() * max) + min) / div
}

Picker.defaultProps = {
  color: {
    h: randColor(1, 359),
    s: (randColor(30, 99, 100)),
    l: (randColor(40, 60, 100)),
    a: 1
  }
}

export default App
