import React from 'react'

import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSave, faEdit } from '@fortawesome/free-solid-svg-icons'

export const ReturnButton = ({history}) => {
  return (               
      <Button color="info" outline className="rounded-0 button-icon" role="button"
        onClick={history.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} color="secondary"/>
      </Button>   
      )    
};

export const SaveButton = () => (
    <Button color="info" className="rounded-0" type="submit">
      <FontAwesomeIcon icon={faSave} color="secondary"/>
    </Button>
);

export const ClearButton = ({onClear}) => (
    <Button outline className="rounded-0" type="button"
      onClick={onClear}
    >
      Clear
    </Button>
);

export const EditButton = ({onEdit}) => (
    <Button color="info" outline className="rounded-0 button-icon" type="button"
      onClick={onEdit}
    >
      <FontAwesomeIcon icon={faEdit} color="secondary"/>
    </Button>
);