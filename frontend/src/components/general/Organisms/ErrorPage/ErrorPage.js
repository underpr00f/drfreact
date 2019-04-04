import React from 'react'
import { HomeButton } from '../../Atoms/Links/Links'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpaceShuttle } from '@fortawesome/free-solid-svg-icons'

export const ErrorPage = ({errors}) => (
    <div className="error-page">
      <div className="wrapper-error"> 
        <h1>Error!</h1>     
        {errors ?  
            <p>{errors}</p> 
          : 
            <p>Sorry, the page you are looking for doesn't exist.</p>
        }
        <h2>Return to <HomeButton /></h2>
      </div>  
      <div className="space">
        <div className="blackhole"></div>
        <FontAwesomeIcon rotation={180} className="ship" icon={faSpaceShuttle} color="info"/>
      </div>
    </div>
)