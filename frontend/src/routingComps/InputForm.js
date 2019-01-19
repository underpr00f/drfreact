import React, { Component } from 'react'

import * as notes from "../learn/notes";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, FormText,  
  FormGroup, Label, Input, Button,
  Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem, Table, CustomInput,
  Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faMale, 
  faUsers, faSave, faPlusSquare, 
  faSearch, faExchangeAlt, faLongArrowAltDown,
  faCheckCircle, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'


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
      is_payed: false,
      searchtext: "",
      updateNoteId: null,
      updateNoteIndex: null,
      dropdownOpen: false,
      is_ordering_name: false,
      modal: false,
      is_staff: false,
      order: [],
      errors: {},
      notes: [
          {
            count: null,
            next: null,
            previous: null,
            noteitems: []
          },
        ],
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
    this.setState({text: "", phone: '', email:'', errors: {}, updateNoteId: null, status: 'Candidate', is_corporate: false, is_payed: false, linkedin_profile: "", website: "", });
  }
  addNew = () => {
    this.setState({text: "", phone: '', email:'', errors: {}, 
      updateNoteId: null, status: 'Candidate', is_corporate: false, 
      is_payed: false, linkedin_profile: "", website: "", 
      modal: true, });
  }
  resetSearch = () => {
    this.setState({ searchtext: "" });
  }
  resetSort = () => {
    this.setState({order: []}, function () {
        this.handleOrderNotes();
    });
  }  
  selectForEdit = (index, id) => {
      let note = this.props.notes[index].noteitems[id];
      this.setState({text: note.text, phone: note.phone, 
        status: note.status, is_payed: note.is_payed, 
        is_corporate: note.is_corporate, email: note.email, 
        linkedin_profile: note.linkedin_profile, 
        website: note.website, updateNoteId: id, 
        updateNoteIndex: index, modal: true, });
  }

  selectForDelete = (index, id) => {
    this.props.deleteNote(index, id)
  }
  componentWillReceiveProps(nextProps) {
    // если длина массива меньше чем предыдущая длина (один элемент удален)
    // то пересчитываем эндпоинт для фетча (вычитаем из последнего символа next
    // число "1" чтобы получить текущий фетч), если в нексте на конце "1", то обрезаем
    // до знака "?"
    let nextForDelete = null;
    // this.setState({is_staff: nextProps.auth.user.is_staff,}) 
    if(this.props.notes[0].noteitems.length > nextProps.notes[0].noteitems.length && this.state.searchtext === "" && this.state.is_ordering_name === "") {
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
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
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
  loadMorePosts = () => {
      const {next} = this.props.notes[this.props.notes.length - 1] 
      console.log('next', next)
      if (next !== null || next !== undefined) {
          this.props.fetchNotes(next)              
      }     
  }
  searchNotes = () => {
      const {searchtext} = this.state
      if (searchtext !== null || searchtext !== undefined) {
          this.props.searchNotes(searchtext) 
          this.setState({
            is_ordering_name: false,
            order: [],
          });             
      }     
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
  onBtnClickOrderingName = (ordername) => {
    // Create a new array based on current state:
    let order = [...this.state.order];
    let newordername = "-"+ordername
    // Add or remove item to it
    if (order.includes(ordername)){
      let index = order.indexOf(ordername)
      if (index !== -1) {
        order.splice(index, 1);
      }
      order.push(newordername);
    } else if (order.includes(newordername)) {
      let index = order.indexOf(newordername)
      if (index !== -1) {
        order.splice(index, 1);
      }
      order.push(ordername);
    } else {
      order.push(ordername);
    }
    
    // Set state
    this.setState({is_ordering_name: !this.state.is_ordering_name, order}, function () {
        this.handleOrderNotes();
    });
  }
  handleOrderNotes = () => {
    // Array to string with ','
    let mapped = this.state.order.map((item)=>(item)).join(",");

    if (this.state.order.length) {      
      this.props.orderNotes(mapped)              
    } else {
      this.setState({order: []});
      this.props.orderNotes("")   
    }    
  }
  submitNote = (e) => {
      e.preventDefault();
      if(this.handleValidation()){
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text, this.state.phone, this.state.status, this.state.is_corporate, this.state.is_payed, this.state.email, this.state.linkedin_profile, this.state.website)
              .then(this.resetForm)
              .then(this.toggleModal)            
              .catch(function (error) {
                 console.log("error", error);
               });
        } else {
            this.props.updateNote(this.state.updateNoteIndex, this.state.updateNoteId, this.state.text, this.state.phone, this.state.status, this.state.is_corporate, this.state.is_payed, this.state.email, this.state.linkedin_profile, this.state.website)
              .then(this.resetForm)
              .then(this.toggleModal)              
              .catch(function (error) {
                 console.log("error", error);
               });
        }
      }
  }
  renderModal() {
      if (this.state.modal) {
        const { errors } = this.state;
        const { is_staff } = this.props;
        return (
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <Form onSubmit={this.submitNote}>            

              <ModalHeader toggle={this.toggleModal}>{this.state.updateNoteId === null ? "New Investor" : "Edit Investor"}</ModalHeader>
              <ModalBody>                    
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
                {this.state.updateNoteId !== null ?
                <FormGroup>
                <Label>Status</Label>
                  <Dropdown className="form-group" isOpen={this.state.dropdownOpen} toggle={this.toggle}>              
                    <DropdownToggle className="btn-block" caret>
                      {this.state.status}
                    </DropdownToggle>
                    <DropdownMenu className="btn-block">
                      <DropdownItem onClick={this.changeValue}>Candidate</DropdownItem>
                      <DropdownItem onClick={this.changeValue}>Processed</DropdownItem>
                      <DropdownItem onClick={this.changeValue}>Converted</DropdownItem>
                      <DropdownItem onClick={this.changeValue}>Rejected</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                : null}
                {this.state.updateNoteId !== null && this.state.status !=="Candidate" && is_staff ?
                <FormGroup>
                    <Label>New <FontAwesomeIcon icon={faHandHoldingUsd} color={!this.state.is_payed ? "black": "grey"}/> / Payed <FontAwesomeIcon icon={faCheckCircle} color={this.state.is_payed ? "black": "grey"}/></Label>
                    <Button className="btn btn-block" onClick={this.onCheckboxIsPayBtnClick} active={this.state.is_payed}>{this.state.is_payed ? 'Change to New' : 'Change to Payed'}</Button>
                </FormGroup>
                : null}                            
              </ModalBody>
              <ModalFooter> 
                <FormGroup row>                   
                <Button className="rounded-0" color="info" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>              
                {this.state.updateNoteId === null ? <Button className="rounded-0" onClick={this.resetForm}>Reset</Button> : null}
                <Button className="rounded-0" onClick={this.toggleModal}>Cancel</Button>
                </FormGroup>
              </ModalFooter>
            </Form>
          </Modal>            
        );
      }
    }
  render () {
    const { notes } = this.props
    const { errors } = this.state;
    const { next } = this.props.notes[this.props.notes.length - 1];
    const { order } = this.state;
    
    return (
      <div>
        <div className="centering mt-2"> 
          <div className="centering-left"> 
            <Link to={"/messages/add"}><Button className="rounded-0" color="info"><FontAwesomeIcon icon={faPlusSquare} color="white"/> Add New</Button></Link>
          </div>
          <div className="centering-center"> 
            {this.renderModal()}
            <FormGroup row>
              <Button className="rounded-0" color="info" onClick={this.addNew}>Add New</Button>
              <CustomInput inline
                id="searchtext"
                type="text" 
                name="searchtext"
                value={this.state.searchtext || ''}
                placeholder="Search by Name..."
                onChange={this.handleChange}
                
                />
                {errors.searchtext ? <FormText color="danger">{errors.searchtext}</FormText>: ""}
              <Button className="rounded-0" onClick={this.searchNotes}><FontAwesomeIcon icon={faSearch} color="white"/></Button>
              {this.state.searchtext !== "" ? <Button outline className="rounded-0" onClick={this.resetSearch}>Clear</Button> : ""}          
            </FormGroup>
          </div>
          <div className="centering-right"> 
          </div>
        </div>          
        <div className="centering"> 
          <div className="centering-left"></div>
          <h3 className="centering-center">Leads</h3>
          <div className="centering-right centering-right__tablepreffix">
            {order.length > 0 ? <Button color="info" onClick={this.resetSort}>Clear Sort</Button> : <Button outline color="info" disabled>Clear Sort</Button>}
          </div>
        </div>
        <Table className="table text-center" striped>
          <thead>
            <tr>
              <th>#</th>
              <th><FontAwesomeIcon icon={faMale} color="black"/> / <FontAwesomeIcon icon={faUsers} color="black"/></th>
              <th>Name <Button color="link" onClick={() => this.onBtnClickOrderingName("text")}>
                {order.includes("text") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                :order.includes("-text") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button></th>
              <th>Phone</th>
              <th>Status <Button color="link" onClick={() => this.onBtnClickOrderingName("status")}>
                {order.includes("status") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                :order.includes("-status") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button></th>
              <th>Payment</th>
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
                              <td>{note.is_payed ? <FontAwesomeIcon icon={faCheckCircle} color="black"/> : <FontAwesomeIcon icon={faHandHoldingUsd} color="black"/>}</td>
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
        addNote: (text, phone, status, is_corporate, is_payed, email, linkedin_profile, website) => {
            return dispatch(notes.addNote(text, phone, status, is_corporate, is_payed, email, linkedin_profile, website));
        },
        updateNote: (index, id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website) => {
            return dispatch(notes.updateNote(index, id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website));
        },
        deleteNote: (index, id) => {
            dispatch(notes.deleteNote(index, id));
        },
        searchNotes: (searchtext) => {
            dispatch(notes.searchNotes(searchtext));
        },
        orderNotes: (order) => {
            dispatch(notes.orderNotes(order));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InputForm);