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
        <Button color="info" outline className="rounded-0 button-icon" role="button"
          onClick={this.context.router.history.goBack}>
          <FontAwesomeIcon icon={faUndoAlt} color="secondary"/>
        </Button>   
        )    
  }
}

export const SaveButton = () => (
    <Button color="info" className="rounded-0" type="submit">
      <FontAwesomeIcon icon={faSave} color="secondary"/>
    </Button>
);

export const ClearButton = props => (
    <Button outline className="rounded-0" type="button"
      onClick={props.onClear}
    >
      Clear
    </Button>
);

