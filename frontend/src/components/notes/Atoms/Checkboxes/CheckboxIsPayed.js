import React from 'react'
import { Button, 
  FormGroup, Label, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd, faCheckCircle, 
       } from '@fortawesome/free-solid-svg-icons'

// Checkbox is corporate
export const CheckboxIsPayed = ({ 
  handleCheckboxIsPayBtnClick,
  status, is_staff, is_payed
  }) => {
    return (
      <div>
        {status !== "Candidate" && is_staff ?
          <FormGroup>
              <Label>New <FontAwesomeIcon icon={faHandHoldingUsd} color={!is_payed ? "black": "grey"}/> / Payed <FontAwesomeIcon icon={faCheckCircle} color={is_payed ? "black": "grey"}/></Label>
              <Button className="btn btn-block" onClick={handleCheckboxIsPayBtnClick} active={is_payed}>{is_payed ? 'Change to New' : 'Change to Payed'}</Button>
          </FormGroup>
          : null} 
      </div>
    )    
}