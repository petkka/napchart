
import React from 'react'
import HeaderElement from './HeaderElement.jsx'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='header'>
        <HeaderElement className='logo' href="/" text='Napchart' />

      	{this.props.data.chartid}
        <HeaderElement href="#save" text='Save' onClick={this.props.onSave.bind(null, this.props.data)} />
        <HeaderElement href="#export" text='Export' onClick={this.props.onSave.bind(null, this.props.data)} />
        <HeaderElement href="#tour" text='Undo' style= {{float:'right'}} onClick={this.props.undo} />
        <HeaderElement href="#tour" text='Start tour' style= {{float:'right'}} onClick={this.props.onStartTour.bind(null, this.props.data)} />
      </div>

    )
  }
}
