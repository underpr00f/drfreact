import React, { Component } from 'react'

import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, FormText,  
  FormGroup, Button,
  Table, CustomInput,
  Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, 
  faSearch, faSave, faTimes,  } from '@fortawesome/free-solid-svg-icons'

import * as notes from "../../../../actions/notesActions";
import { LoadScreen, LoadObject } from '../../../general/Organisms/LoadScreen/LoadScreen'
import { ModalDelete } from '../../Organisms/Modal/Modal'
import { InputFormNoteQuickAdd } from '../../Molecules/Forms/InputFormNoteQuickAdd'
import { OrderingHeaderTable } from '../../Molecules/Tables/OrderingHeaderTable/OrderingHeaderTable'
import { OrderingBodyTable } from '../../Molecules/Tables/OrderingBodyTable/OrderingBodyTable'
import { handleValidation } from '../../../../utils/helpers'
import './styles.scss'

class Notes extends Component {
  state = {
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
    mounted: false,
    is_staff: false,
    loading: true,
    fetching: true,
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

  // // END FETCH DATA AFTER PROPS
  componentDidMount () {
    // Check if was ordering
    if (!(Array.isArray(this.props.notes[0].noteitems) && this.props.notes[0].noteitems.length)) {
      // array exists and is not empty
      this.props.fetchNotes()
    } else {
      // fix bug with doubling requests 
      // (add flag "mounted" in child OrderingHeaderTable.js)
      this.setState({
        mounted: true
      }, () => {this.props.orderNotes("")});
    }

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
    if (this.state.searching) {
        this.props.searchNotes("") 
        this.setState({
          is_ordering_name: false,
          order: [],
          searching: false
        });             
    }    
    this.setState({ searchtext: "" });
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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.notes !== prevProps.notes) {
      this.setState({
        loading: this.props.notes[0].loading,
        fetching: this.props.notes[0].fetching,
      }) 
      // если длина массива меньше чем предыдущая длина (один элемент удален)
      // то пересчитываем эндпоинт для фетча (вычитаем из последнего символа next
      // число "1" чтобы получить текущий фетч), если в нексте на конце "1", то обрезаем
      // до знака "?"
      let nextForDelete = "";
      if(this.props.notes[0].deleted && this.props.notes[0].next) {
        nextForDelete = this.props.notes[0].next
        // console.log(nextForDelete)
        let lastChar = parseInt(nextForDelete.slice(-1), 10)
        if ((lastChar-1) >= 2) {
          nextForDelete = nextForDelete.slice(0, -1)+(lastChar-1);
          // console.log(nextForDelete)
        }
        
        //add flag nextafterdelete to correctly fetch
        this.setState({nextafterdelete: nextForDelete,
          deleted: false})
      }

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
    this.setState({
      fetching: true,
    });
    // Check if investor is after delete to correct fetch 
    if (this.state.nextafterdelete) {
      this.props.fetchNotes(this.state.nextafterdelete)
      //clear flag nextafterdelete
      this.setState({nextafterdelete: ""})
    } else {
      if (next !== null || next !== undefined) {
        // checking with timeout function
        // setTimeout( () => {this.props.fetchNotes(next)}, 5000 )
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
            searching: true,
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

  onOrderNotes = (dataFromCallback) => {
    // Array to string with ','
    if (dataFromCallback && dataFromCallback.order.length) {
      let mapped = dataFromCallback.order.map((item)=>(item)).join(",");
      this.setState({...dataFromCallback});      
      this.props.orderNotes(mapped)              
    } else {
      this.props.orderNotes("");
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
    const { errors, modal, searchtext, 
      modaldelete, index, id, mounted, 
      text, fetching, searching } = this.state;
    const { next } = this.props.notes[this.props.notes.length - 1];

    return (
      <div>
        <div className="centering notes-header mt-2"> 
          <div className="centering-left"> 
            <Button className="rounded-0" color="info" onClick={this.addNew}><FontAwesomeIcon icon={faPlusSquare} color="white"/><span className="btn-quick__text"> Quick Add</span></Button>
          </div>
          <div className="centering-center">
          {modal ? this.renderModal() : null}
          {modaldelete ? 
            <ModalDelete 
              modaldelete={modaldelete} 
              index={index} 
              id={id} 
              text={text}
              toggle={this.toggleModalDelete}
              onSelectForDelete={this.selectForDelete}
            /> 
          : null}
            <FormGroup row>
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
              {searchtext !== "" ? 
                <Button outline className="rounded-0 btn-sort__clear" onClick={this.resetSearch}>
                  <FontAwesomeIcon rotation={90} icon={faTimes}/>
                </Button> 
              : null}          
            </FormGroup>
          </div>
          <div className="centering-right"> 
            <Link to={"/investors/add"}><Button className="rounded-0 btn-add" color="info">Add New</Button></Link>
          </div>
        </div>          
        <div className="centering"> 
          <div className="centering-left"></div>
          <h3 className="centering-center">Leads</h3>
          <div className="centering-right centering-right__tablepreffix">
          </div>
        </div>
        <Table className="table text-center table-investors" striped>
          <OrderingHeaderTable
            onOrderNotes={this.onOrderNotes}
            searchingProp={searching}
            mountedProp={mounted} 
          />
          {notes !== undefined ? notes.map((post, index)=>{
            return (
              <OrderingBodyTable
                  post={post}
                  key={`${index}`}
                  index={index}

                  onSelectForEdit={this.selectForEdit}
                  onToggleModalDelete={this.toggleModalDelete}
                />
              )
          })
        :null}   
        </Table>
        <div className="text-center">
          {next !== null && !fetching ? 
            <Button className="rounded-0" onClick={this.loadMorePosts}>Load more</Button> 
          : ''}
          {fetching && <LoadObject objectclass="loadnotes" />}
        </div>
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