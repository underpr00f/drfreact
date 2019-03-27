import React, { Component } from 'react'

import PropTypes from "prop-types";
import { Button, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, } from '@fortawesome/free-solid-svg-icons'


export class ReturnButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    return (            
        <Button className="rounded-0" size="lg"
          onClick={this.context.router.history.goBack}><FontAwesomeIcon icon={faUndoAlt} color="white"/>
          {" "} Return
        </Button>    
        )    
  }
}