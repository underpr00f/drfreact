import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

export const ShowPass = ({ choice, showHide }) => (
    <span
      onClick={showHide} className="password-show">  
      {choice === 'input' ?      	
      	<FontAwesomeIcon 
      	  icon={faEyeSlash} 
      	  color="secondary"
      	/>
      :
        <FontAwesomeIcon 
      	  icon={faEye} 
      	  color="secondary"
      	/>
      }
    </span>
);