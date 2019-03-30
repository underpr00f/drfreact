import React, { Component } from 'react'

import PropTypes from "prop-types";
import Button from 'reactstrap/lib/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faSave } from '@fortawesome/free-solid-svg-icons'


export class ReturnButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  // Force update page if previous link was /investors or /payments for correctly fetch
  returnPage = () => {
    const { history } = this.context.router

    let locState = history.location.state
    if (locState) {
      if (locState.prevLink && 
        (locState.prevLink === "/investors" || locState.prevLink === "/payments")) {
          window.location.href = locState.prevLink;
      } else {
        history.push(locState.prevLink);
      }      
    } else {
      window.location.href = '/investors';
    }
  }
  render() {
    return (               
        <Button className="rounded-0" size="lg" 
          onClick={this.returnPage}><FontAwesomeIcon icon={faUndoAlt} color="white"/>
          {" "} Cancel
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

