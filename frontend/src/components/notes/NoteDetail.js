import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import * as detail from "../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Form, FormText, 
  FormGroup, Label, Input, Button,
  Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faUsers, faUndoAlt, faSave,
      faCheckCircle, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

class NoteDetail extends Component {
    constructor(props){
        super(props)       
        this.state = {
          text: "",
          phone: "",
          status: "",
          email:"",
          linkedin_profile: "",
          website: "",
          is_corporate: false,
          is_payed: false,
          id: null,
          doneLoading: false,
          errors: {},
          dropdownOpen: false,
          detail: {},          
        }
    }

    componentDidMount(){
      if (this.props.match){
        const {id} = this.props.match.params
        this.setState({
            id: id,
            doneLoading: false,
        })
        this.props.fetchDetailNote(id)
      }
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        text: nextProps.detail.text,
        phone: nextProps.detail.phone,
        status: nextProps.detail.status,
        is_corporate: nextProps.detail.is_corporate,
        is_payed: nextProps.detail.is_payed,
        email: nextProps.detail.email,
        linkedin_profile: nextProps.detail.linkedin_profile,
        website: nextProps.detail.website,
      })
    }    
    toggle = () => {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
    handleChange = (e) => {
      e.preventDefault();
      let key = e.target.name
      let value = e.target.value
      this.setState({
          [key]: value,
          errors: {}
      })
    }
    changeValue = (e) => {
      this.setState({status: e.currentTarget.textContent})
    }
    handleValidation = () => {
      let fields = this.state;
      let errors = {};
      let formIsValid = true;

      //Name
      if(fields["text"].trim() === ""){
         formIsValid = false;
         errors["text"] = "Cannot be empty";
      } else {
        if(typeof fields["text"] !== "undefined"){
           if(!fields["text"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["text"] = "Name must be only letters";
           } else if (fields["text"].length > 7) {
              formIsValid = false;
              errors["text"] = "Your name is too long";
           }        
        }
      }

      //Phone
      if(fields["phone"].trim() === ""){
         formIsValid = false;
         errors["phone"] = "Phone cannot be empty";
      } else {
        if(typeof fields["phone"] !== "undefined"){
          if(!fields["phone"].match(/^[0-9\-\\+]{9,15}$/)){
            formIsValid = false;
            errors["phone"] = "Not phone number";
          }      
        }
      }
      // Email
      if(fields["email"].trim() === ""){
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      } else {
        if(typeof fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
          }
        }
      }
      // Linkedin profile
      if(fields["linkedin_profile"].trim() === ""){
        formIsValid = false;
        errors["linkedin_profile"] = "Cannot be empty";
      } else {
        if(typeof fields["linkedin_profile"] !== "undefined"){
          let re=/^((https?|ftp|smtp):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-_#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
          if (!re.test(fields["linkedin_profile"])) {
            formIsValid = false;
            errors["linkedin_profile"] = "Not Linkedin URL";
          }
        }
      }
      // Website
      if(fields["website"].trim() === ""){
      } else {
        if(typeof fields["website"] !== "undefined"){
          let re=/^((https?|ftp|smtp):\/\/)+(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?$/;
          if (!re.test(fields["website"])) {
            formIsValid = false;
            errors["website"] = "URL is not valid";
          }
        }
      }
      this.setState({errors: errors}); 
      return formIsValid;
    }
    onCheckboxIsCorpBtnClick = () => {
      this.setState({
        is_corporate: !this.state.is_corporate,
      });
    }
    onCheckboxIsPayBtnClick = () => {
      this.setState({
        is_payed: !this.state.is_payed,
      });
    }
    submitNote = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
          this.props.updateDetailNote(this.state.id, this.state.text, this.state.phone, this.state.status, this.state.is_corporate, this.state.is_payed, this.state.email, this.state.linkedin_profile, this.state.website)
        }

    }

    renderNote() {
        if (!this.props.detail.detail) {
          // const {doneLoading} = this.state
          const { detail } = this.props;
          const { is_staff } = this.props;
          const { errors } = this.state;
          return (
                <div>
                <Form onSubmit={this.submitNote} className="form col col-sm-4 mt-2 p-2">
                  
                  <FormGroup>
                    <Label>Name <span className="text-danger">*</span></Label>
                    <Input
                      name="text"
                      value={this.state.text || ''}
                      placeholder="Enter name..."
                      onChange={this.handleChange}
                      required />
                      {errors.text ? <FormText color="danger">{errors.text}</FormText>: ""}
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone <span className="text-danger">*</span></Label>
                    <Input
                      className="form-group"
                      name="phone"
                      type='tel'
                      value={this.state.phone || ''}
                      placeholder="Enter phone..."
                      onChange={this.handleChange}
                      />
                      {errors.phone ? <FormText color="danger">{errors.phone}</FormText>: ""}
                  </FormGroup>
                  <FormGroup>
                    <Label>Email <span className="text-danger">*</span></Label>
                    <Input
                      className="form-group"
                      name="email"
                      type='text'
                      value={this.state.email || ''}
                      placeholder="Enter email..."
                      onChange={this.handleChange}
                      />
                      {errors.email ? <FormText color="danger">{errors.email}</FormText>: ""}
                  </FormGroup> 
                  <FormGroup>
                    <Label>Linkedin <span className="text-danger">*</span></Label>
                    <Input
                      className="form-group"
                      name="linkedin_profile"
                      type='text'
                      value={this.state.linkedin_profile || ''}
                      placeholder="Enter Linkedin profile..."
                      onChange={this.handleChange}
                      />
                      {errors.linkedin_profile ? <FormText color="danger">{errors.linkedin_profile}</FormText>: ""}
                  </FormGroup> 
                  <FormGroup>
                  <Label>Website</Label>
                  <Input
                    className="form-group"
                    name="website"
                    type='text'
                    value={this.state.website || ''}
                    placeholder="Enter your website..."
                    onChange={this.handleChange}
                    />
                    {errors.website ? <FormText color="danger">{errors.website}</FormText>: ""}
                </FormGroup>   
                <FormGroup>
                    <Label>Individual <FontAwesomeIcon icon={faMale} color={!this.state.is_corporate ? "black": "grey"}/> / Corporate <FontAwesomeIcon icon={faUsers} color={this.state.is_corporate ? "black": "grey"}/></Label>
                    <Button className="btn btn-block" onClick={this.onCheckboxIsCorpBtnClick} active={this.state.is_corporate}>{this.state.is_corporate ? 'Change to Individual' : 'Change to Corporate'}</Button>
                </FormGroup>   
                <FormGroup>
                  <Label>Status</Label>
                  <Dropdown className="form-group" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle className="btn-block" caret>
                      {this.state.status || ''}
                    </DropdownToggle>
                    <DropdownMenu className="btn-block">
                      <DropdownItem onClick={this.changeValue}>Candidate</DropdownItem>
                      <DropdownItem onClick={this.changeValue}>Processed</DropdownItem>
                      <DropdownItem onClick={this.changeValue}>Converted</DropdownItem>
                      <DropdownItem onClick={this.changeValue}>Rejected</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                {this.state.status !== "Candidate" && is_staff ?
                <FormGroup>
                    <Label>New <FontAwesomeIcon icon={faHandHoldingUsd} color={!this.state.is_payed ? "black": "grey"}/> / Payed <FontAwesomeIcon icon={faCheckCircle} color={this.state.is_payed ? "black": "grey"}/></Label>
                    <Button className="btn btn-block" onClick={this.onCheckboxIsPayBtnClick} active={this.state.is_payed}>{this.state.is_payed ? 'Change to New' : 'Change to Payed'}</Button>
                </FormGroup>
                : null}
                <Button color="info" size="lg" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>
              </Form>
              <h3>Detailed View</h3>
              <Table striped className="text-center">
                <thead>
                  <tr>
                    <td><FontAwesomeIcon icon={faMale} color="black"/> / <FontAwesomeIcon icon={faUsers} color="black"/></td>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Status</td>
                    <td>Email</td>
                    <td>Linkedin</td>
                    <td>Website</td>
                    <td>Payment</td>
                  </tr>
                </thead>
                <tbody>
                  <tr> 
                    <td>{detail.is_corporate ? <FontAwesomeIcon icon={faUsers} color="black"/> : <FontAwesomeIcon icon={faMale} color="black"/>}</td>
                    <td>{detail.text}</td>
                    <td>{detail.phone}</td>
                    <td>{detail.status}</td>
                    <td>{detail.email}</td>
                    <td>{detail.linkedin_profile}</td>
                    <td>{detail.website}</td>
                    <td>{detail.is_payed ? <FontAwesomeIcon icon={faCheckCircle} color="black"/> : <FontAwesomeIcon icon={faHandHoldingUsd} color="black"/>}</td>
                  </tr>
                </tbody>
              </Table>
            </div>              
          );

        } else {
            return (
              <div>
                <h1>404 error. Message Not Found</h1>
              </div>
            );
        }
    }
    render () {
        return(
            <div>
                <div className="mt-2 mb-2">
                  <Link to={"/messages"} onClick={this.forceUpdate}><Button><FontAwesomeIcon icon={faUndoAlt} color="white"/></Button></Link>
                </div>
              {this.renderNote()}
          </div>               
        )
    }
}

const mapStateToProps = state => {
    return {
      detail: state.detail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchDetailNote: (id) => {
          dispatch(detail.fetchDetailNote(id));
      },
      updateDetailNote: (id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website) => {
          dispatch(detail.updateDetailNote(id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website));
      }
    }
}

// export default NoteDetail;
export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);