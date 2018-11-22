import React, { Component } from 'react'

import * as notes from "../learn/notes";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, FormText, 
  FormGroup, Label, Input, Button,
  Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
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

  componentDidMount () {
    this.props.fetchNotes()
  }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.notes[0] === this.props.notes[0]){
  //     this.setState({
  //       notes: 
  //         []
  //     })
  //   }
  // }
  resetForm = () => {
    this.setState({text: "", phone: '', errors: {}, updateNoteId: null, status: 'Candidate',});
  }

  selectForEdit = (index, id) => {
      console.log("id", id, "index", index)
      let note = this.props.notes[index].noteitems[id];
      this.setState({text: note.text, phone: note.phone, status: note.status, updateNoteId: id, updateNoteIndex: index});
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
  loadMorePosts = () => {
      const {next} = this.props.notes[this.props.notes.length - 1] 
      console.log(next)
      if (next !== null || next !== undefined) {
          this.props.fetchNotes(next)
      }     
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
            this.props.updateNote(this.state.updateNoteIndex, this.state.updateNoteId, this.state.text, this.state.phone, this.state.status)
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
    const { notes } = this.props
    const { errors } = this.state;
    const { next } = this.state; 
    // const { notes } = this.state
    // console.log('constr', this.state)
    // {notes[0] && notes[0].noteitems ? console.log('state', notes[0].noteitems) : console.log('props', undefined)}
    return (
      <div>
        <Form onSubmit={this.submitNote} className="form col col-sm-4 mt-2 p-2">
            
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="text"
                value={this.state.text || ''}
                placeholder="Enter name..."
                onChange={this.handleChange}
                required />
                {errors.text ? <FormText color="danger">{errors.text}</FormText>: ""}
            </FormGroup>

            

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
                {errors.phone ? <FormText color="danger">{errors.phone}</FormText>: ""}
            </FormGroup>
            

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
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
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
// <tr key={`note_${note.id}`}>
// {notes[0] && notes[0].noteitems ?
// : ''}
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

    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: (next) => {
            dispatch(notes.fetchNotes(next));
        },
        addNote: (text, phone, status) => {
            return dispatch(notes.addNote(text, phone, status));
        },
        updateNote: (index, id, text, phone, status) => {
            return dispatch(notes.updateNote(index, id, text, phone, status));
        },
        deleteNote: (index, id) => {
            dispatch(notes.deleteNote(index, id));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InputForm);