import React, { Component } from 'react'

import PropTypes from "prop-types";
import Button from 'reactstrap/lib/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faSave } from '@fortawesome/free-solid-svg-icons'


export class ReturnButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (               
        <Button className="rounded-0" size="lg" 
          onClick={this.context.router.history.goBack}><FontAwesomeIcon icon={faUndoAlt} color="white"/>
          {" "} Back
        </Button>   
        )    
  }
}


export const SaveButton = props => (
    <Button color="info" className="rounded-0" size="lg" type="submit">
      <FontAwesomeIcon icon={faSave} color="white"/>
    </Button>
);

export const ClearButton = props => (
    <Button outline className="rounded-0" size="lg" type="button"
      onClick={props.onClear}
    >
      Clear
    </Button>
);

