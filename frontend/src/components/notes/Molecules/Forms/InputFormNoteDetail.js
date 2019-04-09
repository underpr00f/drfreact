import React, { Component } from 'react'

import * as Inputs from '../../Atoms/AddInputs/AddInputs'
import { CheckboxIsCorp } from '../../Atoms/Checkboxes/CheckboxIsCorp'
import { CheckboxIsPayed } from '../../Atoms/Checkboxes/CheckboxIsPayed'
import { CustomDropdown } from '../../Atoms/Dropdown/Dropdown'
import { DatePickLastCall } from '../../Atoms/DatePick/DatePickLastCall'
import FileDrop from '../../Atoms/FileDrop/FileDrop'

export class InputFormNoteDetail extends Component {
  render() {
    const { text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      status, dropdownOpen, is_payed,
      is_staff, add_call, last_call,
      documents, detail,
      errors, } = this.props;
      
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
        <CheckboxIsPayed 
          handleCheckboxIsPayBtnClick={this.props.handleCheckboxIsPayBtnClick} 
          status={status} 
          is_staff={is_staff} 
          is_payed={is_payed}
        />                
        <CheckboxIsCorp 
          handleCheckboxIsCorpBtnClick={this.props.handleCheckboxIsCorpBtnClick} 
          is_corporate={is_corporate} 
        />          
        <CustomDropdown 
          onChangeValue={this.props.onChangeValue} 
          onToggle={this.props.onToggle} 
          status={status} 
          dropdownOpen={dropdownOpen} 
        />      
        <DatePickLastCall 
          handleChangeDate={this.props.handleChangeDate} 
          handleResetCallClick={this.props.handleResetCallClick} 
          handleAddCallClick={this.props.handleAddCallClick} 
          add_call={add_call} 
          last_call={last_call} 
        />      
        <FileDrop 
          onSelectDrop={this.props.onSelectDrop} 
          documents={documents}
          detail={detail}
        />
      </div>
    )
    
  }
}