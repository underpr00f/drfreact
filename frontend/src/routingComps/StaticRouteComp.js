
import React, { Component } from 'react'
import PostList from '../posts/PostList';
import { Link } from 'react-router-dom'

class StaticRouteComp extends Component {
  render () {
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
      	<div className='text-center'>	
      		<Link className='some-link' to='/posts/dynamic/'>Dynamic Page</Link>
        </div>
        <PostList />                
      </div>
    )
  }
}
export default StaticRouteComp
