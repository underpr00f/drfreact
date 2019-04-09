import React, { Component } from 'react'

class Landing extends Component {
  
  render () {
    return (
		<div className="main-wrapper text-center">
		  <h2 className="main-wrapper__text">Lead Platform based on DRF+React+Redux</h2>
		  <img className="main-wrapper__image" src='/static/bundles/building.jpeg' alt="logo" />  
		</div>
    )
  }
}
export default Landing
