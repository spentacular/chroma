import React, { Component } from 'react'

class Editable extends Component {
  constructor (props) {
    super()

    this.state = {
      active: false,
      value: props.value.toUpperCase()
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: String(nextProps.value).toUpperCase() })
    }
  }

  handleChange (event) {
    console.log('changing')
    this.setState({ value: event.target.value })
  }

  handleClick (event) {
    this.setState({active: true})
  }

  render () {
    return (
      <div contentEditable={this.state.active}
        onChange={this.handleChange}
        onClick={this.handleClick}>
        {this.state.value}
      </div>
    )
  }
}

export default Editable
