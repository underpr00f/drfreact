import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
import { Link, Redirect } from 'react-router-dom'
import * as detail from "../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Form, FormText, 
  FormGroup, Label, Input, Button,
   } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faSave, faMale, faUsers } from '@fortawesome/free-solid-svg-icons'

class NewNote extends Component {
    constructor(props){
        super(props)       
        this.state = {
          text: "",
          phone: "",
          email: "",
          status: "Candidate",
          linkedin_profile: "",
          website: "",
          is_corporate: false,
          id: null,
          doneLoading: false,
          errors: {},        
          redirectToNewPage: false          
        }
    }

    componentDidMount(){
      if (this.props.match){
        // const {id} = this.props.match.params
        // this.setState({
        //     id: id,
        //     doneLoading: false,
        // })
        // this.props.fetchDetailNote(id)
      }
    }
    componentWillReceiveProps(nextProps) {
      if (this.state.redirectToNewPage) {  
        this.setState({
          id: nextProps.detail.id,
        })
      }
    }    

    resetForm = () => {
      this.setState({text: "", phone: '', email:'', errors: {}, status: 'Candidate', is_corporate: false, linkedin_profile: "", website: "",});
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
    onCheckboxBtnClick = () => {
      this.setState({
        is_corporate: !this.state.is_corporate,
      });
    }
    submitNote = (e) => {
      e.preventDefault();
      if(this.handleValidation()){
        this.props.addDetailNote(this.state.text, this.state.phone, this.state.status, this.state.is_corporate, this.state.email, this.state.linkedin_profile, this.state.website)
          .then(this.setState({ redirectToNewPage: true }))            
          .catch(function (error) {
             console.log("error", error);
           });
      }
    }

    render () {
        // const {doneLoading} = this.state
        const { errors } = this.state;
        // The part that makes the redirect happen
        if (this.state.redirectToNewPage && this.state.id) {
          // const { detail } = this.state;
          // console.log(this.state.id)
          return (
            <Redirect to={{pathname:`/messages/${this.state.id}`}} />
          )
        }
        return(
            <div>
              <div className="mt-2 mb-2">
                <Link className="mt-2 mb-2" to={"/messages"} onClick={this.forceUpdate}><Button><FontAwesomeIcon icon={faUndoAlt} color="white"/></Button></Link>
                <h3>Add New</h3>
              </div>
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
                    <Label>Individual <FontAwesomeIcon icon={faMale} color="black"/> / Corporate <FontAwesomeIcon icon={faUsers} color="black"/></Label>
                    <Button className="btn btn-block" onClick={this.onCheckboxBtnClick} active={this.state.is_corporate}>{this.state.is_corporate ? 'Corporate' : 'Individual'}</Button>
                </FormGroup>

                <Button color="info" onClick={this.resetForm}>Reset</Button>
                <Button type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>
            </Form>
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
        addDetailNote: (text, phone, status, is_corporate, email, linkedin_profile, website) => {
            return dispatch(detail.addDetailNote(text, phone, status, is_corporate, email, linkedin_profile, website));
        },
    }
}

// export default NewNote;
export default connect(mapStateToProps, mapDispatchToProps)(NewNote);