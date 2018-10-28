import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import PostList from '../posts/PostList';

class DynamicRouteComp extends Component {
  componentDidMount () {
    // const { slug } = this.props.match.params

    // this.performLookup(slug) //grabing data from your api

    // const { history } = this.props
    // const supportsHistory = 'pushState' in window.history
    // if (supportsHistory) {
    //   history.pushState(null, '/not-found')
    // } else {
    //   window.location = '/dashboard'
    // }
  }

  render () {
    const { slug } = this.props.match.params
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='/'>Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/user">User <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Link</Link>
              </li>
            </ul>
          </div>
        </nav>
        <h1>{slug} that changes based on route</h1>
        <Link className='some-link' to='/about/'>Static Page</Link>
        <PostList /> 
      </div>
    )
  }
}

export default DynamicRouteComp