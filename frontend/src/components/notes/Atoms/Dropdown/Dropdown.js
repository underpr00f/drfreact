import React from 'react'
import { 
  FormGroup, Label, Dropdown, 
  DropdownToggle, 
  DropdownMenu, DropdownItem, } from 'reactstrap';

// Checkbox is corporate
export const CustomDropdown = ({ 
  onToggle, onChangeValue,
  status, dropdownOpen
  }) => {

    return (
      <div>
        <FormGroup>
          <Label>Status</Label>
          <Dropdown className="form-group" isOpen={dropdownOpen} toggle={onToggle}>
            <DropdownToggle className="btn-block" caret>
              {status || ''}
            </DropdownToggle>
            <DropdownMenu className="btn-block">
              <DropdownItem onClick={onChangeValue}>Candidate</DropdownItem>
              <DropdownItem onClick={onChangeValue}>Processed</DropdownItem>
              <DropdownItem onClick={onChangeValue}>Converted</DropdownItem>
              <DropdownItem onClick={onChangeValue}>Rejected</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
      </div>
    )    
}