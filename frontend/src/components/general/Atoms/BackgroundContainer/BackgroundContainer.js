import React from 'react'
import './styles.scss'

export const BackgroundContainer = ({header}) => (
	<div className="main-wrapper">
	  <h2 className="main-wrapper__text">{header}</h2>
	  <img className="main-wrapper__image" src='/static/bundles/building.jpeg' alt="logo" />  
	</div>
);