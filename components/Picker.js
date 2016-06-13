import React from 'react'
import { ColorWrap, Hue, Saturation } from 'react-color/lib/components/common'
import HuePointer from './HuePointer'
import SaturationPointer from './SaturationPointer'
import ClipboardButton from 'react-clipboard.js'
import Modal from 'react-modal'
import data from '../src/data'

class Picker extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      isActive: false,
      infoIsOpen: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.openInfo = this.openInfo.bind(this)
    this.closeInfo = this.closeInfo.bind(this)
  }

  componentDidMount (event) {
    window.addEventListener('keydown', this.handleKeyDown, false)
    window.addEventListener('keyup', this.handleKeyUp, false)
  }

  handleChange (data) {
    this.props.onChange(data)
  }

  handleMouseDown (event) {
    event.preventDefault()

    this.setState({isActive: true})

    window.addEventListener('mouseup', () => {
      this.setState({isActive: false})
    })
  }

  handleWheel (event) {
    let delta
    if (event.shiftKey) {
      delta = 0.1
    } else {
      delta = 0.5
    }

    let oldH = this.props.hsl.h
    let h = event.deltaY < 0 ? (oldH + delta) : (oldH - delta)

    if (h > 0 && h < 360) {
      if (this.props.hsl.h !== h) {
        this.props.onChange({
          h: h,
          s: this.props.hsl.s,
          l: this.props.hsl.l,
          a: this.props.hsl.a,
          source: 'hsl'
        })
      }
    }
  }

  handleKeyDown (event) {
    event.stopPropagation()
    if (event.keyCode === 32) {
      this.setState({isActive: true})
    }
  }

  handleKeyUp (event) {
    event.stopPropagation()
    if (event.keyCode === 32) {
      this.setState({isActive: false})
    }
  }

  openInfo () {
    this.setState({infoIsOpen: true})
  }

  closeInfo () {
    this.setState({infoIsOpen: false})
  }

  render () {
    let activeClass

    let overlayColor = {
      backgroundColor: this.props.hex
    }

    if (this.state.isActive) {
      activeClass = 'active'
    } else {
      activeClass = 'inactive'
    }

    const hexValue = this.props.hex.toUpperCase()

    const activeHue = {
      color: `hsl(${this.props.hsl.h}, 100%, 30%)`
    }

    const modalStyles = {
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0)'
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '2em',
        border: '0',
        boxShadow: '0 0 5px rgba(0, 0, 0, .3)'
      }
    }

    return (
      <div>
        <div className='header flex items-center justify-between'>
          <div>
            <div className='flex items-center'>
              <h1 style={activeHue}>{data.name} <span className='sml fw-300'>{data.version}</span></h1>
              <div className='ml1'>
                <button className='info icon' onMouseUp={this.openInfo}></button>
                <Modal
                  isOpen={this.state.infoIsOpen}
                  onRequestClose={this.closeInfo}
                  style={modalStyles}>
                  <div>
                    <h2 className='lh1'>Chroma</h2>
                    <p>A simple color picker</p>
                    <hr />
                    <h3 className='lh1'>Controls</h3>
                    <ul>
                      <li><code>Space</code> - Focus active color</li>
                      <li><code>Scroll</code> - Adjust hue</li>
                      <li><code>Scroll + Shift</code> - Minor adjust hue</li>
                    </ul>
                    <hr />
                    <p className='mb0 sml'><a href='https://github.com/spentacular/chroma' style={activeHue}>View on GitHub</a></p>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className='col w40'>
            <div className='hue'>
              <Hue {...this.props} pointer={HuePointer} onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <div className='flex items-center'>
              <ClipboardButton className='color-input' data-clipboard-text={hexValue}>
                {hexValue}
              </ClipboardButton>
            </div>
          </div>
        </div>
        <div className='saturation' onMouseDown={this.handleMouseDown} onWheel={this.handleWheel}>
          <div className='color-overlay' style={overlayColor}></div>
          <div className={activeClass}>
            <Saturation {...this.props} pointer={SaturationPointer} onChange={this.handleChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default ColorWrap(Picker)
