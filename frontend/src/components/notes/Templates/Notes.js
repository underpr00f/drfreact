import React, { Component } from 'react'

import * as notes from "../../../actions/notesActions";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, FormText,  
  FormGroup, Button,
  Table, CustomInput,
  Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { LoadScreen } from '../Molecules/LoadScreen/LoadScreen'
import { ModalDelete } from '../Organisms/Modal/Modal'

import { InputFormNoteQuickAdd } from '../Molecules/Forms/InputFormNoteQuickAdd'
import { handleValidation } from '../../../utils/helpers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faMale, 
  faUsers, faSave, faPlusSquare, 
  faSearch, faExchangeAlt, faLongArrowAltDown,
  faCheckCircle, faHandHoldingUsd, faTimes } from '@fortawesome/free-solid-svg-icons'


class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      phone: "",
      status: 'Candidate',
      email: "",
      linkedin_profile: "",
      website: "",
      correspondence: "",
      is_corporate: false,
      is_payed: false,
      searchtext: "",
      updateNoteId: null,
      updateNoteIndex: null,
      dropdownOpen: false,
      is_ordering_name: false,
      modal: false,
      modaldelete: false,
      is_staff: false,
      loading: true,
      nextafterdelete: "",
      deleted: false,
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

  // // END FETCH DATA AFTER PROPS
  componentDidMount () {
    this.props.fetchNotes()
  }

  resetForm = () => {
    this.setState({text: "", phone: '', email:'', errors: {}, 
      updateNoteId: null, status: 'Candidate', is_corporate: false, 
      is_payed: false, linkedin_profile: "", website: "",
      correspondence: "", });
  }
  addNew = () => {
    this.setState({text: "", phone: '', email:'', errors: {}, 
      updateNoteId: null, status: 'Candidate', is_corporate: false, 
      is_payed: false, linkedin_profile: "", website: "", 
      modal: true, correspondence: "", });
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
      website: note.website, correspondence:note.correspondence,
      updateNoteId: id, updateNoteIndex: index, modal: true, });
  }

  selectForDelete = (index, id) => {
    this.props.deleteNote(index, id)
    this.setState({
      modaldelete: false,
    })     
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.notes[0].loading,
    }) 
    // если длина массива меньше чем предыдущая длина (один элемент удален)
    // то пересчитываем эндпоинт для фетча (вычитаем из последнего символа next
    // число "1" чтобы получить текущий фетч), если в нексте на конце "1", то обрезаем
    // до знака "?"
    let nextForDelete = "";
    if(nextProps.notes[0].deleted && nextProps.notes[0].next) {
      nextForDelete = nextProps.notes[0].next
      console.log(nextForDelete)
      let lastChar = parseInt(nextForDelete.slice(-1), 10)
      if ((lastChar-1) >= 2) {
        nextForDelete = nextForDelete.slice(0, -1)+(lastChar-1);
        console.log(nextForDelete)
      }
      
      //add flag nextafterdelete to correctly fetch
      this.setState({nextafterdelete: nextForDelete,
        deleted: false})
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
  toggleModalDelete = (index, id) => {
    let text = ""
    if (id !== undefined) {
      text = this.props.notes[index].noteitems[id].text
    }
    this.setState(prevState => ({
      modaldelete: !prevState.modaldelete,
      index: index,
      id: id,
      text: text
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
  loadMorePosts = () => {
    const {next} = this.props.notes[this.props.notes.length - 1]
    // Check if investor is after delete to correct fetch 
    if (this.state.nextafterdelete) {
      this.props.fetchNotes(this.state.nextafterdelete)
      //clear flag nextafterdelete
      this.setState({nextafterdelete: ""})
    } else {
      if (next !== null || next !== undefined) {
        this.props.fetchNotes(next)              
      }
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
    let is_ordering_name = false

    // if ordername starts from "C"-character - clear that order!
    if (ordername.charAt(0) === "C"){
      let index = order.indexOf(ordername.slice(1, ordername.length))
      // Clear ordername (remove from array)
      if (index !== -1) {
        order.splice(index, 1);
      }
    } else {
      // Add or remove item to it
      if (order.includes(ordername)){
        let index = order.indexOf(ordername)
        if (index !== -1) {          
          order.splice(index, 1);
          order.splice(index, 0, newordername);         
        }
      } else if (order.includes(newordername)) {
        let index = order.indexOf(newordername)
        if (index !== -1) {
          order.splice(index, 1);
          order.splice(index, 0, ordername);
        }
      } else {
        order.push(ordername);

      }
    }
    if (order.length > 0) {
      is_ordering_name = true
    } 

    // FIX BUG with "owner" negative ordering
    if (order.includes("-owner")&&order.length===1) {
      // adding "-id" field to multiply filter
      // if has only "-owner" field
      order.push("-id");
    } else {
      // remove "-id" in all other variants
      let index = order.indexOf("-id")
      if (index !== -1) {        
        order.splice(index, 1);
      }      
    }

    // Set state
    this.setState({is_ordering_name: is_ordering_name, searchtext: "", order}, function () {
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
      // check validation from helper file
      const validation_errors = handleValidation(this.state)
      // check validation_errors dictionary is empty or has any errors
      if (Object.keys(validation_errors).length === 0) {
        // Check what do you want add or edit?
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text, this.state.phone, this.state.status, 
              this.state.is_corporate, this.state.is_payed, this.state.email, 
              this.state.linkedin_profile, this.state.website, this.state.correspondence,)
              .then(this.resetForm)
              .then(this.toggleModal)            
              .catch(function (error) {
                 console.log("error", error);
               });
        } else {
            this.props.updateNote(this.state.updateNoteIndex, this.state.updateNoteId, 
              this.state.text, this.state.phone, this.state.status, this.state.is_corporate, 
              this.state.is_payed, this.state.email, this.state.linkedin_profile, 
              this.state.website, this.state.correspondence)
              .then(this.resetForm)
              .then(this.toggleModal)              
              .catch(function (error) {
                 console.log("error", error);
               });
        }
      } else {
        this.setState({errors: validation_errors}); 
      }
  }
  renderModal() {
      const { modal, 
        text, phone, email, linkedin_profile,
        website, correspondence, is_corporate,
        status, is_payed, dropdownOpen,
        updateNoteId,
        errors } = this.state;
      const { is_staff } = this.props;
      
      if (this.state.modal) {
        return (
          <Modal isOpen={modal} toggle={this.toggleModal}>
            <Form onSubmit={this.submitNote}>            

              <ModalHeader toggle={this.toggleModal}>{updateNoteId === null ? "New Investor" : "Edit Investor"}</ModalHeader>
              <ModalBody>                    
                <InputFormNoteQuickAdd
                  onInputChange={this.handleChange}
                  handleCheckboxIsCorpBtnClick={this.onCheckboxIsCorpBtnClick}
                  handleCheckboxIsPayBtnClick={this.onCheckboxIsPayBtnClick} 
                  onToggle={this.toggle} 
                  onChangeValue={this.changeValue}

                  text={text} 
                  phone={phone}
                  email={email}
                  linkedin_profile={linkedin_profile}
                  website={website}
                  correspondence={correspondence}
                  is_corporate={is_corporate}
                  is_staff={is_staff}
                  status={status}
                  is_payed={is_payed}
                  dropdownOpen={dropdownOpen}
                  updateNoteId={updateNoteId}

                  errors={errors} 
                />                              
              </ModalBody>
              <ModalFooter> 
                <FormGroup row>                   
                <Button className="rounded-0" color="info" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>              
                {updateNoteId === null ? <Button className="rounded-0" outline onClick={this.resetForm}>Clear</Button> : null}
                <Button className="rounded-0" onClick={this.toggleModal}>Cancel</Button>
                </FormGroup>
              </ModalFooter>
            </Form>
          </Modal>            
        );
      }
    }

  renderNotes () {
    const { notes } = this.props
    const { errors, modal, searchtext, order, modaldelete, index, id, text } = this.state;
    const { next } = this.props.notes[this.props.notes.length - 1];

    return (
      <div>
        <div className="centering mt-2"> 
          <div className="centering-left"> 
            <Link to={"/investors/add"}><Button className="rounded-0 btn-add" color="info"><FontAwesomeIcon icon={faPlusSquare} color="white"/> Add New</Button></Link>
          </div>
          <div className="centering-center">
          {modal ? this.renderModal() : null}
          {modaldelete ? 
            <ModalDelete 
              modaldelete={modaldelete} index={index} 
              id={id} text={text}
              toggle={this.toggleModalDelete}
              onSelectForDelete={this.selectForDelete}
            /> 
          : null}
            <FormGroup row>
              <Button className="rounded-0" color="info" onClick={this.addNew}><FontAwesomeIcon icon={faPlusSquare} color="white"/><span className="btn-quick__text"> Quick Add</span></Button>
              <CustomInput inline
                id="searchtext"
                type="text" 
                name="searchtext"
                value={searchtext || ''}
                placeholder="Search by Name..."
                onChange={this.handleChange}
                
                />
                {errors.searchtext ? <FormText color="danger">{errors.searchtext}</FormText>: ""}
              <Button className="rounded-0" onClick={this.searchNotes}><FontAwesomeIcon icon={faSearch} color="white"/></Button>
              {searchtext !== "" ? <Button outline className="rounded-0" onClick={this.resetSearch}>Clear</Button> : ""}          
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
              <th className="table-num__title">#</th>
              <th className="table-investor__title"><FontAwesomeIcon icon={faMale} color="black"/> / <FontAwesomeIcon icon={faUsers} color="black"/></th>
              <th>Name <Button color="link" onClick={() => this.onBtnClickOrderingName("text")}>
                {order.includes("text") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                :order.includes("-text") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                {order.includes("text") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Ctext")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :order.includes("-text") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-text")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :""}
              </th>
              <th>Dev <Button color="link" onClick={() => this.onBtnClickOrderingName("owner")}>
                {order.includes("owner") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                :order.includes("-owner") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                {order.includes("owner") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Cowner")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :order.includes("-owner") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-owner")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :""}
              </th>
              <th className="table-phone__title">Phone</th>
              <th>Status <Button color="link" onClick={() => this.onBtnClickOrderingName("status")}>
                {order.includes("status") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                :order.includes("-status") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                {order.includes("status") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Cstatus")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :order.includes("-status") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-status")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :""}
              </th>
              <th>Payment <Button color="link" onClick={() => this.onBtnClickOrderingName("is_payed")}>
                {order.includes("is_payed") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                :order.includes("-is_payed") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                {order.includes("is_payed") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Cis_payed")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :order.includes("-is_payed") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-is_payed")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                :""}
              </th>
              <th>Manage</th>
            </tr>
          </thead>  
               
          {notes !== undefined ? notes.map((post, index)=>{
            return ( 
                <tbody key={index}>
                    {post.noteitems !== undefined && post.noteitems.length > 0 ? post.noteitems.map((note, id) => {
                      return (                                    
                          <tr key={id}>
                              <th scope="row" className="table-num__text">{id+1}</th>
                              <td className="table-investor__text">{note.is_corporate ? <FontAwesomeIcon icon={faUsers} color="black"/> : <FontAwesomeIcon icon={faMale} color="black"/>}</td>
                              <td>
                                <Link className="info-link" to={{pathname:`/investors/${note.id}`,
                                      state: {fromDashboard: false}
                                      }}>{note.text}</Link>
                              </td>
                              <td>{note.owner_username}</td>
                              <td className="table-phone__text">{note.phone}</td>
                              <td>{note.status}</td>
                              <td>{note.is_payed ? <FontAwesomeIcon icon={faCheckCircle} color="black"/> : <FontAwesomeIcon icon={faHandHoldingUsd} color="black"/>}</td>
                              <td>
                                <Button className="rounded-0" color="info" title="edit investor" onClick={() => this.selectForEdit(index, id)}><FontAwesomeIcon icon={faEdit} color="white"/></Button>
                                <Button className="rounded-0" onClick={() => this.toggleModalDelete(index, id)} title="delete investor"><FontAwesomeIcon icon={faTrash} color="white"/></Button>
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
  render () {
    const { loading } = this.state
    return(
      <div>
        { loading ? <LoadScreen /> : this.renderNotes() }
      </div>      
    )
  }
}

const mapStateToProps = state => {
    return {
      notes: state.notes,
      deleted: state.deleted,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: (next) => {
            dispatch(notes.fetchNotes(next));
        },
        addNote: (text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence) => {
            return dispatch(notes.addNote(text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence));
        },
        updateNote: (index, id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence) => {
            return dispatch(notes.updateNote(index, id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence));
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


export default connect(mapStateToProps, mapDispatchToProps)(Notes);