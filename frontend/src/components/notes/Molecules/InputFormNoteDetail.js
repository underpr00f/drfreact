import React, { Component } from 'react'

import * as Inputs from '../Atoms/AddInputs/AddInputs'
import { CheckboxIsCorp } from '../Atoms/CheckboxIsCorp/CheckboxIsCorp'
import { CustomDropdown } from '../Atoms/Dropdown/Dropdown'

export class InputFormNoteDetail extends Component {
  render() {
    const { text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      status, dropdownOpen,
      errors, } = this.props;
    // console.log(this.props)

    return (
      <div>
        <Inputs.InputName onInputChange={this.props.onInputChange} text={text} errors={errors} />
        <Inputs.InputPhone onInputChange={this.props.onInputChange} phone={phone} errors={errors} />
        <Inputs.InputEmail onInputChange={this.props.onInputChange} email={email} errors={errors} />      
        <Inputs.InputLinkedin onInputChange={this.props.onInputChange} linkedin_profile={linkedin_profile} errors={errors} />
        <Inputs.InputWebsite onInputChange={this.props.onInputChange} website={website} errors={errors} />      
        <Inputs.InputCorrespondence onInputChange={this.props.onInputChange} correspondence={correspondence} errors={errors} />      
        
        <CheckboxIsCorp handleCheckboxIsCorpBtnClick={this.props.handleCheckboxIsCorpBtnClick} is_corporate={is_corporate} />      
        <CustomDropdown onChangeValue={this.props.onChangeValue} onToggle={this.props.onToggle} status={status} dropdownOpen={dropdownOpen} />      
      
      </div>
    )
    
  }
}