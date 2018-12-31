import React, { Component } from 'react'

import * as notes from "../learn/notes";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, FormText, 
  FormGroup, Label, Input, Button,
  Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faMale, faUsers, faSave, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons'  
// library.add(faFacebookF); 
class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      phone: "",
      status: 'Candidate',
      email: "",
      linkedin_profile: "",
      website: "",
      is_corporate: false, 
      updateNoteId: null,
      updateNoteIndex: null,
      dropdownOpen: false,
      errors: {},
      notes: [
          {
            count: null,
            next: null,
            previous: null,
            noteitems: []
          },
        ]
      }
     
  }
  // // FETCH DATA AFTER PROPS
  // componentWillMount() {
  //     this.props.fetchNotes(); // Fetch data and set state
  // }

  // componentWillReceiveProps(nextProps) {
  //     const { notes } = nextProps;
  //     if(!notes) {
  //         this.props.fetchCategory(id); // Fetch data and set state
  //     }
  // }
  // // END FETCH DATA AFTER PROPS
  componentDidMount () {
    this.props.fetchNotes()
  }

  resetForm = () => {
    this.setState({text: "", phone: '', email:'', errors: {}, updateNoteId: null, status: 'Candidate', is_corporate: false, linkedin_profile: "", website: "", });
  }

  selectForEdit = (index, id) => {
      let note = this.props.notes[index].noteitems[id];
      this.setState({text: note.text, phone: note.phone, status: note.status, is_corporate: note.is_corporate, email: note.email, linkedin_profile: note.linkedin_profile, website: note.website, updateNoteId: id, updateNoteIndex: index});
  }

  selectForDelete = (index, id) => {
    this.props.deleteNote(index, id)
  }
  componentWillReceiveProps(nextProps) {
    //если длина массива меньше чем предыдущая длина (один элемент удален)
    // то пересчитываем эндпоинт для фетча (вычитаем из последнего символа next
    // число "1" чтобы получить текущий фетч), если в нексте на конце "1", то обрезаем
    // до знака "?"
    let nextForDelete = null;

    if(this.props.notes[0].noteitems.length > nextProps.notes[0].noteitems.length) {
      nextForDelete = this.props.notes[0].next
      console.log('nextForDeleteBefore', nextForDelete)
      if (nextForDelete) {
        let lastChar = parseInt(nextForDelete.slice(-1), 10)
        console.log(lastChar)
        if ((lastChar-1) >= 2) {
          nextForDelete = nextForDelete.slice(0, -1)+(lastChar-1);
        } else {
          nextForDelete = nextForDelete.split('?')[0]
        }
      }
      console.log('nextForDelete', nextForDelete)
      this.props.fetchNotes(nextForDelete);
    }
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
  loadMorePosts = () => {
      const {next} = this.props.notes[this.props.notes.length - 1] 
      console.log('next', next)
      if (next !== null || next !== undefined) {
          this.props.fetchNotes(next)              
      }     
  }
  onCheckboxBtnClick = () => {
    this.setState({
      is_corporate: !this.state.is_corporate,
    });
  }
  submitNote = (e) => {
      e.preventDefault();

      if(this.handleValidation()){
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text, this.state.phone, this.state.status, this.state.is_corporate, this.state.email, this.state.linkedin_profile, this.state.website)
              .then(this.resetForm)            
              .catch(function (error) {
                 console.log("error", error);
               });
        } else {
            this.props.updateNote(this.state.updateNoteIndex, this.state.updateNoteId, this.state.text, this.state.phone, this.state.status, this.state.is_corporate, this.state.email, this.state.linkedin_profile, this.state.website)
              .then(this.resetForm)              
              .catch(function (error) {
                 console.log("error", error);
               });
        }
      }
  }

  render () {
    const { notes } = this.props
    const { errors } = this.state;
    const { next } = this.props.notes[this.props.notes.length - 1]; 
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
                <Label>Individual <FontAwesomeIcon icon={faMale} color="black"/> / Corporate <FontAwesomeIcon icon={faUsers} color="black"/></Label>
                <Button className="btn btn-block" onClick={this.onCheckboxBtnClick} active={this.state.is_corporate}>{this.state.is_corporate ? 'Corporate' : 'Individual'}</Button>
            </FormGroup>
            <FormGroup>
            <Label>Status</Label>
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
            </FormGroup>
            <Button className="mr-1" onClick={this.resetForm}>Reset</Button>
            <Button className="mr-1" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>
            <Link to={"/messages/add"}><Button color="info"><FontAwesomeIcon icon={faPlusSquare} color="white"/></Button></Link>
        </Form>
        <h3>Notes</h3>
        <Table className="text-center" striped>
          <thead>
            <tr>
              <th>#</th>
              <th><FontAwesomeIcon icon={faMale} color="black"/> / <FontAwesomeIcon icon={faUsers} color="black"/></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>  
               
          {notes !== undefined ? notes.map((post, index)=>{
            return ( 
                <tbody key={index}>
                    {post.noteitems !== undefined && post.noteitems.length > 0 ? post.noteitems.map((note, id) => {
                      return (                                    
                          <tr key={id}>
                              <th scope="row">{id+1}</th>
                              <td>{note.is_corporate ? <FontAwesomeIcon icon={faUsers} color="black"/> : <FontAwesomeIcon icon={faMale} color="black"/>}</td>
                              <td>
                                <Link to={{pathname:`/messages/${note.id}`,
                                      state: {fromDashboard: false}
                                      }}>{note.text}</Link>
                              </td>
                              <td>{note.phone}</td>
                              <td>{note.status}</td>
                              <td>
                                <Button className="mr-1" color="info" onClick={() => this.selectForEdit(index, id)}><FontAwesomeIcon icon={faEdit} color="white"/></Button>
                                <Button onClick={() => this.selectForDelete(index, id)}><FontAwesomeIcon icon={faTrash} color="white"/></Button>
                              </td>
                          </tr>                                        
                        )
                      }
                    ) : null}
                </tbody>
              )
            }) : null}
        </Table>
        {next !== null ? <Button onClick={this.loadMorePosts}>Load more</Button> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => {

    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: (next) => {
            dispatch(notes.fetchNotes(next));
        },
        addNote: (text, phone, status, is_corporate, email, linkedin_profile, website) => {
            return dispatch(notes.addNote(text, phone, status, is_corporate, email, linkedin_profile, website));
        },
        updateNote: (index, id, text, phone, status, is_corporate, email, linkedin_profile, website) => {
            return dispatch(notes.updateNote(index, id, text, phone, status, is_corporate, email, linkedin_profile, website));
        },
        deleteNote: (index, id) => {
            dispatch(notes.deleteNote(index, id));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InputForm);