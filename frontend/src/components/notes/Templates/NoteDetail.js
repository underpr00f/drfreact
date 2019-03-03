import React, {Component} from 'react'
import { Link } from "react-router-dom";
import * as detail from "../../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Form, Container, Row,
  Button, } from 'reactstrap';

import moment from "moment";

import { LoadScreen } from '../Molecules/LoadScreen/LoadScreen'
import { InputFormNoteDetail } from '../Molecules/Forms/InputFormNoteDetail'
import { DetailPreviewTable } from '../Molecules/Tables/DetailPreviewTable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faSave,
       } from '@fortawesome/free-solid-svg-icons'

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
      console.log("getData!")
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
    // Force update page to /investors
    refreshPage = () => {
      window.location.href = '/investors';
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
        const { detail, is_staff } = this.props;
        const { text, phone, email, 
          linkedin_profile, website,
          correspondence, is_corporate,
          status, dropdownOpen, is_payed,
          add_call, last_call, documents,
          errors, hasError } = this.state;

        if (!detail.detail && !hasError) {
          return (
                <Container fluid>
                  <Row>
                    <Form onSubmit={this.submitNote} className="form col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-2 p-2">
                      <InputFormNoteDetail 
                        onInputChange={this.handleChange}
                        handleCheckboxIsCorpBtnClick={this.onCheckboxIsCorpBtnClick}
                        handleCheckboxIsPayBtnClick={this.onCheckboxIsPayBtnClick} 
                        onToggle={this.toggle} 
                        onChangeValue={this.changeValue}
                        handleChangeDate={this.changeDate}
                        handleResetCallClick={this.onResetCallClick}
                        handleAddCallClick={this.onAddCallClick}
                        onSelectDrop={this.getData}

                        text={text} 
                        phone={phone}
                        email={email}
                        linkedin_profile={linkedin_profile}
                        website={website}
                        correspondence={correspondence}
                        is_corporate={is_corporate}
                        status={status}
                        is_staff={is_staff}
                        is_payed={is_payed}
                        dropdownOpen={dropdownOpen}
                        add_call={add_call}
                        last_call={last_call}
                        documents={documents}
                        detail={`${detail.documents}`}

                        errors={errors} 
                      />                

                    <Button color="info" className="rounded-0" size="lg" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>
                    <Link to="/investors" onClick={this.refreshPage} ><Button className="rounded-0" size="lg"><FontAwesomeIcon icon={faUndoAlt} color="white"/> Cancel</Button></Link>
                  </Form>

                  <DetailPreviewTable 
                    {...detail}
                  />
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