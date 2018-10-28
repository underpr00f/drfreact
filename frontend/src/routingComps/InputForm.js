import React, { Component } from 'react'

// import { Link } from 'react-router-dom'
// import Notes from '../learn/notes';
import * as notes from "../learn/notes";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { getUserProfile } from "../actions/authActions";
import { renderUser } from "../utils/noteUtils";
import { Container, Col, Form, FormFeedback, 
  FormGroup, Label, Input,
  Button, Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem } from 'reactstrap';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      phone: "",
      updateNoteId: null,
      dropdownOpen: false,
      status: 'Candidate',
      errors: {},
    }
  }
  static propTypes = {
      getUserProfile: PropTypes.func.isRequired,
      user: PropTypes.object
  };
  componentWillMount() {
    this.props.getUserProfile();
  }
  componentDidMount () {
    this.props.fetchNotes()
  }

  resetForm = () => {
    this.setState({text: "", phone: '', errors: {}, updateNoteId: null, status: 'Candidate',});
  }

  selectForEdit = (id) => {
      let note = this.props.notes[id];
      this.setState({text: note.text, phone: note.phone, status: note.status, updateNoteId: id});
  }
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
           } else if (fields["text"].length > 5) {
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

      // if(typeof fields["email"] !== "undefined"){
      //    let lastAtPos = fields["email"].lastIndexOf('@');
      //    let lastDotPos = fields["email"].lastIndexOf('.');

      //    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
      //       formIsValid = false;
      //       errors["email"] = "Email is not valid";
      //     }
      //  }
      this.setState({errors: errors}); 

      return formIsValid;
 }
  handleChange = (e) => {
    e.preventDefault();
    // this.form.validateFields(e.target);
    let key = e.target.name
    let value = e.target.value

    // if (key === 'title'){
    //     if (value.length > 120){
    //         alert("This title is too long")
    //     }
    // }
    this.setState({
        [key]: value,
        errors: {}
    })
    // this.setState({text: e.target.value})
  }

  changeValue = (e) => {
    this.setState({status: e.currentTarget.textContent})
  }
  submitNote = (e) => {
      e.preventDefault();
      if(this.handleValidation()){
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text, this.state.phone, this.state.status)
              .then(this.resetForm)
              .catch(function (error) {
                 console.log("error", error);
               });
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text, this.state.phone, this.state.status)
              .then(this.resetForm)              
              .catch(function (error) {
                 console.log("error", error);
               });;
        }
      }

  }

  // renderError() {
  //   if (Object.keys(errors).length) {
  //     return (
  //       <div>
  //         <div className="alert alert-danger">
  //           <div>{ errors['text'] }</div> 
  //           <div>{ errors['phone'] }</div>
  //         </div>
  //       </div>
  //       );
  //   }
  //   return null;
  // }

  render () {
    const { notes, user } = this.props
    const { errors } = this.state;
    if (errors.text) {
      console.log(errors.text)
    }
    if (errors.phone) {
      console.log(errors.phone)
    }
    
    return (
      <div>
        {renderUser(user)}
        <Form onSubmit={this.submitNote} className="form col col-sm-4 mt-5 p-2">
            
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="text"
                value={this.state.text || ''}
                placeholder="Enter name..."
                onChange={this.handleChange}
                required />
            </FormGroup>

            {errors.text ? <div>{errors.text}</div>: ""}

            <FormGroup>
              <Label>Phone</Label>
              <Input
                className="form-group"
                name="phone"
                type='tel'
                value={this.state.phone || ''}
                placeholder="Enter phone..."
                onChange={this.handleChange}
                />
            </FormGroup>
            {errors.phone ? <div>{errors.phone}</div>: ""}

            <Dropdown className="form-group" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.status}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.changeValue}>Candidate</DropdownItem>
                <DropdownItem onClick={this.changeValue}>Processed</DropdownItem>
                <DropdownItem onClick={this.changeValue}>Converted</DropdownItem>
                <DropdownItem onClick={this.changeValue}>Rejected</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <button onClick={this.resetForm}>Reset</button>
            <input type="submit" value="Save Note" />
        </Form>
        <h3>Notes</h3>
        <table>
            <tbody>
                {notes.map((note, id) => {
                  return (
                    <tr key={`note_${note.id}`}>
                        <td>{note.text}</td>
                        <td>{note.phone}</td>
                        <td>{note.status}</td>
                        <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                        <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
                    </tr>
                    )
                  }
                )}
            </tbody>
        </table>
      </div>
    )
  }
}


// <input
// className="form-group"
// name="url"
// value={this.state.usersite || ''}
// placeholder="Enter linkedin url..."
// onChange={this.handleChange}
// required />
// <input
// className="form-group"
// name="phone"
// type='email'
// value={this.state.useremail || ''}
// placeholder="Enter email..."
// onChange={this.handleChange}
// />
// export default InputForm
const mapStateToProps = state => {
    console.log(state);
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        addNote: (text, phone, status) => {
            return dispatch(notes.addNote(text, phone, status));
        },
        updateNote: (id, text, phone, status) => {
            return dispatch(notes.updateNote(id, text, phone, status));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        getUserProfile: () => {
            return dispatch(getUserProfile());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InputForm);