import React, { Component } from 'react'
import PostList from '../posts/PostList';
import { Link } from 'react-router-dom'

class Landing extends Component {
  render () {
    return (

      	<div className='text-center'>	
      		<Link className='some-link' to='/posts/dynamic/'>Dynamic Page</Link>
        
        	<PostList />                
		</div>
    )
  }
}
export default Landing
