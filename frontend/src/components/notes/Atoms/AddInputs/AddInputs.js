import React from 'react'
import { FormText,  
  FormGroup, Label, Input,  } from 'reactstrap';

// REQUIRED FIELDS
export const InputName = ({ 
  onInputChange,
  text, errors
  }) => {

    return (
      <div>
        <FormGroup>
          <Label>Name <span className="text-danger">*</span></Label>
          <Input
            name="text"
            value={text || ''}
            placeholder="Enter name..."
            onChange={onInputChange}
            required />
            {errors.text ? <FormText color="danger">{errors.text}</FormText>: ""}
        </FormGroup>
      </div>
    )
}
export const InputPhone = ({ 
  onInputChange,
  phone, errors
  }) => {
    return (
      <div>
        <FormGroup>
          <Label>Phone <span className="text-danger">*</span></Label>
          <Input
            name="phone"
            value={phone || ''}
            placeholder="Enter phone..."
            onChange={onInputChange}
            required />
            {errors.phone ? <FormText color="danger">{errors.phone}</FormText>: ""}
        </FormGroup>
      </div>
    )
}
export const InputEmail = ({ 
  onInputChange,
  email, errors
  }) => {

    return (
      <div>
        <FormGroup>
          <Label>Email <span className="text-danger">*</span></Label>
          <Input
            name="email"
            value={email || ''}
            placeholder="Enter email..."
            onChange={onInputChange}
            required />
            {errors.email ? <FormText color="danger">{errors.email}</FormText>: ""}
        </FormGroup>
      </div>
    )    
}
export const InputLinkedin = ({ 
  onInputChange,
  linkedin_profile, errors
  }) => {

    return (
      <div>
        <FormGroup>
          <Label>Linkedin <span className="text-danger">*</span></Label>
          <Input
            name="linkedin_profile"
            value={linkedin_profile || ''}
            placeholder="Enter linkedin url..."
            onChange={onInputChange}
            required />
            {errors.linkedin_profile ? <FormText color="danger">{errors.linkedin_profile}</FormText>: ""}
        </FormGroup>
      </div>
    )    
}
// NOT REQUIRED FIELDS
export const InputWebsite = ({ 
  onInputChange,
  website, errors
  }) => {
    return (
      <div>
        <FormGroup>
          <Label>Website</Label>
          <Input
            name="website"
            value={website || ''}
            placeholder="Enter website url..."
            onChange={onInputChange}
            />
            {errors.website ? <FormText color="danger">{errors.website}</FormText>: ""}
        </FormGroup>
      </div>
    )    
}
export const InputCorrespondence = ({ 
  onInputChange,
  correspondence, errors
  }) => {
    return (
      <div>
        <FormGroup>
          <Label>Correspondence</Label>
          <Input
            name="correspondence"
            value={correspondence || ''}
            placeholder="Enter correspondence..."
            onChange={onInputChange}
            type='textarea'
            />
            {errors.correspondence ? <FormText color="danger">{errors.correspondence}</FormText>: ""}
        </FormGroup>
      </div>
    )    
}