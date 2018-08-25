
import React, { Component } from 'react'
import PostList from '../posts/PostList';
import { Link } from 'react-router-dom'

class StaticRouteComp extends Component {
  render () {
    return (
      <div>
      	<div className='text-center'>	
      		<Link className='some-link' to='/posts/dynamic/'>Dynamic Page</Link>
        </div>
        <PostList />                
      </div>
    )
  }
}
export default StaticRouteComp
