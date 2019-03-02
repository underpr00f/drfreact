import React, { Component } from 'react'
import { Button, 
  FormGroup, Label, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd, faCheckCircle, 
       } from '@fortawesome/free-solid-svg-icons'

// Checkbox is corporate
export class CheckboxIsPayed extends Component {
  render() {
    const { status, is_staff, is_payed } = this.props;
    return (
      <div>
        {status !== "Candidate" && is_staff ?
          <FormGroup>
              <Label>New <FontAwesomeIcon icon={faHandHoldingUsd} color={!is_payed ? "black": "grey"}/> / Payed <FontAwesomeIcon icon={faCheckCircle} color={is_payed ? "black": "grey"}/></Label>
              <Button className="btn btn-block" onClick={this.props.handleCheckboxIsPayBtnClick} active={is_payed}>{is_payed ? 'Change to New' : 'Change to Payed'}</Button>
          </FormGroup>
          : null} 
      </div>
    )    
  }
}