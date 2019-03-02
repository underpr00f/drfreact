import React, { Component } from 'react'

import * as Inputs from '../../Atoms/AddInputs/AddInputs'
import { CheckboxIsCorp } from '../../Atoms/Checkboxes/CheckboxIsCorp'
import { CheckboxIsPayed } from '../../Atoms/Checkboxes/CheckboxIsPayed'
import { CustomDropdown } from '../../Atoms/Dropdown/Dropdown'
// import { DatePickLastCall } from '../../Atoms/DatePick/DatePickLastCall'
// import FileDrop from '../../Atoms/FileDrop/FileDrop'

export class InputFormNoteQuickAdd extends Component {
  render() {
    const { text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      is_staff, is_payed, dropdownOpen,
      status, updateNoteId,
      errors, 
    } = this.props;

    return (
      <div>
        <Inputs.InputName 
          onInputChange={this.props.onInputChange} 
          text={text} 
          errors={errors} 
        />
        <Inputs.InputPhone 
          onInputChange={this.props.onInputChange} 
          phone={phone} 
          errors={errors} 
        />
        <Inputs.InputEmail 
          onInputChange={this.props.onInputChange} 
          email={email} 
          errors={errors} 
        />      
        <Inputs.InputLinkedin 
          onInputChange={this.props.onInputChange} 
          linkedin_profile={linkedin_profile} 
          errors={errors} 
        />
        <Inputs.InputWebsite 
          onInputChange={this.props.onInputChange} 
          website={website} 
          errors={errors} 
        />      
        <Inputs.InputCorrespondence 
          onInputChange={this.props.onInputChange} 
          correspondence={correspondence} 
          errors={errors} 
        />      
        
        <CheckboxIsCorp 
          handleCheckboxIsCorpBtnClick={this.props.handleCheckboxIsCorpBtnClick} 
          is_corporate={is_corporate} 
        />
        {updateNoteId !== null ?
        <CustomDropdown 
          onChangeValue={this.props.onChangeValue} 
          onToggle={this.props.onToggle} 
          status={status} 
          dropdownOpen={dropdownOpen} 
        />:null}
        {updateNoteId !== null && status!=="Candidate" && is_staff ?
          <CheckboxIsPayed 
            handleCheckboxIsPayBtnClick={this.props.handleCheckboxIsPayBtnClick} 
            status={status} 
            is_staff={is_staff} 
            is_payed={is_payed}
          />
        : null}      
         
      </div>
    )
    
  }
}