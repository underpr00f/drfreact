import React from 'react'

import * as Inputs from '../../Atoms/AddInputs/AddInputs'
import { CheckboxIsCorp } from '../../Atoms/Checkboxes/CheckboxIsCorp'
import { CheckboxIsPayed } from '../../Atoms/Checkboxes/CheckboxIsPayed'
import { CustomDropdown } from '../../Atoms/Dropdown/Dropdown'
import { DatePickLastCall } from '../../Atoms/DatePick/DatePickLastCall'
import FileDrop from '../../Atoms/FileDrop/FileDrop'

export const InputFormNoteDetail = ({ 
      onInputChange, 
      handleCheckboxIsPayBtnClick,
      handleCheckboxIsCorpBtnClick,
      onChangeValue, onToggle,
      handleChangeDate, handleResetCallClick,
      handleAddCallClick, onSelectDrop,
      text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      status, dropdownOpen, is_payed,
      is_staff, add_call, last_call,
      documents, detail,
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
        <CheckboxIsPayed 
          handleCheckboxIsPayBtnClick={handleCheckboxIsPayBtnClick} 
          status={status} 
          is_staff={is_staff} 
          is_payed={is_payed}
        />                
        <CheckboxIsCorp 
          handleCheckboxIsCorpBtnClick={handleCheckboxIsCorpBtnClick} 
          is_corporate={is_corporate} 
        />          
        <CustomDropdown 
          onChangeValue={onChangeValue} 
          onToggle={onToggle} 
          status={status} 
          dropdownOpen={dropdownOpen} 
        />      
        <DatePickLastCall 
          handleChangeDate={handleChangeDate} 
          handleResetCallClick={handleResetCallClick} 
          handleAddCallClick={handleAddCallClick} 
          add_call={add_call} 
          last_call={last_call} 
        />      
        <FileDrop 
          onSelectDrop={onSelectDrop} 
          documents={documents}
          detail={detail}
        />
      </div>
    )
}