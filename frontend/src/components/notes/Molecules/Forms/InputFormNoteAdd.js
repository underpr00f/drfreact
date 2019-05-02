import React from 'react'

import * as Inputs from '../../Atoms/AddInputs/AddInputs'
import { CheckboxIsCorp } from '../../Atoms/Checkboxes/CheckboxIsCorp'

export const InputFormNoteAdd = ({ onInputChange, handleCheckboxIsCorpBtnClick,
      text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
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

      </div>
    )
}