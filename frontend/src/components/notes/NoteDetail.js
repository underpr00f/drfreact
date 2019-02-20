import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import * as detail from "../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Form, FormText, Container, Row,
  FormGroup, Label, Input, Button,
  Dropdown, DropdownToggle, 
  DropdownMenu, DropdownItem, Table } from 'reactstrap';
import { LoadScreen } from './LoadScreen/LoadScreen'
// import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faUsers, faUndoAlt, faSave,
      faCheckCircle, faHandHoldingUsd,
       } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import FileDrop from './FileDrop/FileDrop';
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class NoteDetail extends Component {

    constructor(props){
        super(props);
  
        this.state = {
          text: "",
          phone: "",
          status: "",
          email:"",
          linkedin_profile: "",
          website: "",
          correspondence: "",
          is_corporate: false,
          is_payed: false,
          id: null,
          loading: true,
          errors: {},
          hasError: false,
          dropdownOpen: false,
          detail: {},
          add_call: false,
          last_call: "", 
          documents: null,
          attached: false,      
        }
    }

    componentDidMount(){
      if (this.props.match){
        const {id} = this.props.match.params
        this.setState({
            id: id,
        })
        this.props.fetchDetailNote(id)        
      }
      
    }
    componentWillReceiveProps(nextProps) {
      const detailed = nextProps.detail

      if (Object.keys(detailed).length) {
        this.setState({
          text: detailed.text,
          phone: detailed.phone,
          status: detailed.status,
          is_corporate: detailed.is_corporate,
          is_payed: detailed.is_payed,
          email: detailed.email,
          linkedin_profile: detailed.linkedin_profile,
          website: detailed.website,
          correspondence: detailed.correspondence,
          last_call: moment(detailed.last_call, moment.defaultFormat).toDate(),
          documents: detailed.documents,
          hasError: detailed.hasError,
          loading: detailed.loading,
        }) 
      } 
      // else {
      //   this.setState({
      //     hasError: true
      //   })
      // }
       
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
    changeDate = (date) => {
      this.setState({last_call: date})
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
    getData = (documents) => {
      this.setState({
        documents: documents[0],
        attached: true,
      })
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
    onAddCallClick = () => {
      this.setState({
        add_call: true,
        last_call: moment(new Date(), moment.defaultFormat).toDate(),
      });
    }

    onResetCallClick = () => {
      this.setState({
        add_call: false,
        last_call: "",
      });
    }
    submitNote = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
          this.props.updateDetailNote(this.state.id, this.state.text, 
            this.state.phone, this.state.status, this.state.is_corporate, 
            this.state.is_payed, this.state.email, this.state.linkedin_profile, 
            this.state.website, this.state.correspondence, this.state.last_call,
            this.state.documents, this.state.attached,)
        }

    }

    renderNote() {
        // const { loading } = this.state
        const { detail } = this.props;
        const { is_staff } = this.props;
        const { errors } = this.state;
        const { hasError } = this.state;
        // console.log(loading)
        // console.log(hasError)
        if (!detail.detail && !hasError) {
          return (
                <Container fluid>
                  <Row>
                    <Form onSubmit={this.submitNote} className="form col col-lg-4 mt-2 p-2">
                      
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
                      <Label>Correspondence</Label>
                      <Input
                        className="form-group"
                        name="correspondence"
                        type='textarea'
                        value={this.state.correspondence || ''}
                        placeholder="Enter your correspondence..."
                        onChange={this.handleChange}
                        />
                        {errors.correspondence ? <FormText color="danger">{errors.correspondence}</FormText>: ""}
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
                    <FormGroup>
                      <Label>Last Call {this.state.add_call ? <Button className="btn" onClick={this.onResetCallClick}>Reset</Button>: ""}</Label>
                      {moment(this.state.last_call).isValid() ?
                      <div>
                        <DatePicker     
                          selected={moment(this.state.last_call, moment.defaultFormat).toDate()}
                          onChange={this.changeDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="d MMMM yyyy HH:mm"
                          timeCaption="time"
                        />
                      </div>
                      :                     
                        <Button className="btn btn-block" onClick={this.onAddCallClick}>Add Last Call</Button>
                      }
                    </FormGroup>
                    <div>Documents:
                    {detail.documents ? " ("+detail.documents.split("/").slice(-1)[0]+")" : ""}
                    </div>
                    <FileDrop onSelectDrop={this.getData} documents={this.state.documents} detail={`${detail.documents}`}/>
                    <Button color="info" size="lg" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>
                  </Form>
                  <div className="col col-lg-8">
                    <h3>Detailed Preview</h3>
                    <Table striped>
                      <tbody>
                        <tr>
                          <th>Investor</th>
                          <td>{detail.is_corporate ? "Corporate" : "Individual" }</td>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <td>{detail.text}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>{detail.phone}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{detail.status}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{detail.email}</td>
                        </tr>
                        <tr>
                          <th>Linkedin</th>
                          <td className="table-correspondence__data"><a href={`${detail.linkedin_profile}`} >{detail.linkedin_profile}</a></td>
                        </tr>
                        <tr>
                          <th>Website</th>
                          <td className="table-correspondence__data"><a href={`${detail.website}`} >{detail.website}</a></td>
                        </tr>
                        <tr>
                          <th>Correspondence</th>
                          <td className="table-correspondence__data">{detail.correspondence}</td>
                        </tr>
                        <tr>
                          <th>Payment</th>
                          <td>{detail.is_payed ? "Payed" : "New" }</td>
                        </tr>
                        <tr>
                          <th>Calls</th>
                          <td>{detail.last_call ? moment(detail.last_call).format("D MMM YYYY HH:mm") : ""}</td>
                        </tr>
                        <tr>
                          <th>Documents</th>
                          <td>{detail.documents ? <a href={`${detail.documents}`} >{detail.documents.split("/").slice(-1)[0]}</a> : ""}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
              </Row>
            </Container>              
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
        const {loading} = this.state
        return(
            <div>
              <div className="mt-2 mb-2">
                <Link to={"/investors"} onClick={this.forceUpdate}><Button><FontAwesomeIcon icon={faUndoAlt} color="white"/> Return</Button></Link>
              </div>
              {loading ?<LoadScreen />:this.renderNote()}

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
      updateDetailNote: (id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence, last_call, documents, attached) => {
          dispatch(detail.updateDetailNote(id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence, last_call, documents, attached));
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);