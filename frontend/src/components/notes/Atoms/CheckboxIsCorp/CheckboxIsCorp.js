import React, { Component } from 'react'
import { Button, 
  FormGroup, Label, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faUsers, 
       } from '@fortawesome/free-solid-svg-icons'

// Checkbox is corporate
export class CheckboxIsCorp extends Component {
  render() {
    const { is_corporate } = this.props;
    return (
      <div>
        <FormGroup>
            <Label>Individual <FontAwesomeIcon icon={faMale} color={!is_corporate ? "black": "grey"}/> / Corporate <FontAwesomeIcon icon={faUsers} color={is_corporate ? "black": "grey"}/></Label>
            <Button className="btn btn-block" onClick={this.props.handleCheckboxIsCorpBtnClick} active={is_corporate}>{is_corporate ? 'Change to Individual' : 'Change to Corporate'}</Button>
        </FormGroup>
      </div>
    )    
  }
}