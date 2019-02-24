import React, { Component } from 'react'
import { 
  FormGroup, Label, Dropdown, 
  DropdownToggle, 
  DropdownMenu, DropdownItem, } from 'reactstrap';

// Checkbox is corporate
export class CustomDropdown extends Component {
  render() {
    const { status, dropdownOpen } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Status</Label>
          <Dropdown className="form-group" isOpen={dropdownOpen} toggle={this.props.onToggle}>
            <DropdownToggle className="btn-block" caret>
              {status || ''}
            </DropdownToggle>
            <DropdownMenu className="btn-block">
              <DropdownItem onClick={this.props.onChangeValue}>Candidate</DropdownItem>
              <DropdownItem onClick={this.props.onChangeValue}>Processed</DropdownItem>
              <DropdownItem onClick={this.props.onChangeValue}>Converted</DropdownItem>
              <DropdownItem onClick={this.props.onChangeValue}>Rejected</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
      </div>
    )    
  }
}