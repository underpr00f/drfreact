import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Posts from '../reactify/Posts';

class ReacTifyComp extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <div>
        <Link className='some-link' to='/about/'>Static Page</Link>
        <Posts />
      </div>
      
    )
  }
}

export default ReacTifyComp