import React, { Component } from 'react'
import { FormText,  
  FormGroup, Label, Input,  } from 'reactstrap';

// REQUIRED FIELDS
export class InputName extends Component {
  render() {
    const { text, errors } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Name <span className="text-danger">*</span></Label>
          <Input
            name="text"
            value={text || ''}
            placeholder="Enter name..."
            onChange={this.props.onInputChange}
            required />
            {errors.text ? <FormText color="danger">{errors.text}</FormText>: ""}
        </FormGroup>
      </div>
    )
    
  }
}
export class InputPhone extends Component {
  render() {
    const { phone, errors } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Phone <span className="text-danger">*</span></Label>
          <Input
            name="phone"
            value={phone || ''}
            placeholder="Enter phone..."
            onChange={this.props.onInputChange}
            required />
            {errors.phone ? <FormText color="danger">{errors.phone}</FormText>: ""}
        </FormGroup>
      </div>
    )
    
  }
}
export class InputEmail extends Component {
  render() {
    const { email, errors } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Email <span className="text-danger">*</span></Label>
          <Input
            name="email"
            value={email || ''}
            placeholder="Enter email..."
            onChange={this.props.onInputChange}
            required />
            {errors.email ? <FormText color="danger">{errors.email}</FormText>: ""}
        </FormGroup>
      </div>
    )    
  }
}
export class InputLinkedin extends Component {
  render() {
    const { linkedin_profile, errors } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Linkedin <span className="text-danger">*</span></Label>
          <Input
            name="linkedin_profile"
            value={linkedin_profile || ''}
            placeholder="Enter linkedin url..."
            onChange={this.props.onInputChange}
            required />
            {errors.linkedin_profile ? <FormText color="danger">{errors.linkedin_profile}</FormText>: ""}
        </FormGroup>
      </div>
    )    
  }
}
// NOT REQUIRED FIELDS
export class InputWebsite extends Component {
  render() {
    const { website, errors } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Website</Label>
          <Input
            name="website"
            value={website || ''}
            placeholder="Enter website url..."
            onChange={this.props.onInputChange}
            />
            {errors.website ? <FormText color="danger">{errors.website}</FormText>: ""}
        </FormGroup>
      </div>
    )    
  }
}
export class InputCorrespondence extends Component {
  render() {
    const { correspondence, errors } = this.props;
    return (
      <div>
        <FormGroup>
          <Label>Correspondence</Label>
          <Input
            name="correspondence"
            value={correspondence || ''}
            placeholder="Enter correspondence..."
            onChange={this.props.onInputChange}
            type='textarea'
            />
            {errors.correspondence ? <FormText color="danger">{errors.correspondence}</FormText>: ""}
        </FormGroup>
      </div>
    )    
  }
}