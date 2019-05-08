import React from 'react'

import * as Inputs from '../../Atoms/AddInputs/AddInputs'
import { CheckboxIsCorp } from '../../Atoms/Checkboxes/CheckboxIsCorp'
import { CheckboxIsPayed } from '../../Atoms/Checkboxes/CheckboxIsPayed'
import { CustomDropdown } from '../../Atoms/Dropdown/Dropdown'

export const InputFormNoteQuickAdd = ({ 
      onInputChange, handleCheckboxIsCorpBtnClick,
      onChangeValue, onToggle, handleCheckboxIsPayBtnClick,
      text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      is_staff, is_payed, dropdownOpen,
      status, updateNoteId,
      errors,  }) => {

    return (
      <div>
        <Inputs.InputName 
          onInputChange={onInputChange} 
          text={text} 
          errors={errors} 
        />
        <Inputs.InputPhone 
          onInputChange={onInputChange} 
          phone={phone} 
          errors={errors} 
        />
        <Inputs.InputEmail 
          onInputChange={onInputChange} 
          email={email} 
          errors={errors} 
        />      
        <Inputs.InputLinkedin 
          onInputChange={onInputChange} 
          linkedin_profile={linkedin_profile} 
          errors={errors} 
        />
        <Inputs.InputWebsite 
          onInputChange={onInputChange} 
          website={website} 
          errors={errors} 
        />      
        <Inputs.InputCorrespondence 
          onInputChange={onInputChange} 
          correspondence={correspondence} 
          errors={errors} 
        />      
        
        <CheckboxIsCorp 
          handleCheckboxIsCorpBtnClick={handleCheckboxIsCorpBtnClick} 
          is_corporate={is_corporate} 
        />
        {updateNoteId !== null ?
        <CustomDropdown 
          onChangeValue={onChangeValue} 
          onToggle={onToggle} 
          status={status} 
          dropdownOpen={dropdownOpen} 
        />:null}
        {updateNoteId !== null && status!=="Candidate" && is_staff ?
          <CheckboxIsPayed 
            handleCheckboxIsPayBtnClick={handleCheckboxIsPayBtnClick} 
            status={status} 
            is_staff={is_staff} 
            is_payed={is_payed}
          />
        : null}      
         
      </div>
    )
}