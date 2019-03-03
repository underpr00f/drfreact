import React, {Component} from 'react'

import { Link, Redirect } from 'react-router-dom'
import * as detail from "../../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Form, Button } from 'reactstrap';

import { InputFormNoteAdd } from '../Molecules/Forms/InputFormNoteAdd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faSave, } from '@fortawesome/free-solid-svg-icons'

class NoteNew extends Component {
    constructor(props){
        super(props)       
        this.state = {
          text: "",
          phone: "",
          email: "",
          status: "Candidate",
          linkedin_profile: "",
          website: "",
          correspondence: "",
          is_corporate: false,
          id: null,
          doneLoading: false,
          errors: {},        
          redirectToNewPage: false          
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
      this.setState({text: "", phone: '', email:'', errors: {}, status: 'Candidate', 
        is_corporate: false, linkedin_profile: "", website: "",
        correspondence: "",
      });
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
    // Force update page to /investors
    refreshPage = () => {
      window.location.href = '/investors';
    }
    submitNote = (e) => {
      e.preventDefault();
      if(this.handleValidation()){
        this.props.addDetailNote(this.state.text, this.state.phone, this.state.status, 
          this.state.is_corporate, this.state.email, this.state.linkedin_profile, 
          this.state.website, this.state.correspondence)
          .then(this.setState({ redirectToNewPage: true }))            
          .catch(function (error) {
             console.log("error", error);
           });
      }
    }

    render () {
        const { text, phone, email, 
          linkedin_profile, website,
          correspondence, is_corporate,
          errors } = this.state;
        // The part that makes the redirect happen
        if (this.state.redirectToNewPage && this.state.id) {
          return (
            <Redirect to={{pathname:`/investors/${this.state.id}`}} />
          )
        }
        return(
            <div>
              <div className="mt-2 mb-2">
                <h3>Add New</h3>
              </div>
              <Form onSubmit={this.submitNote} className="form col col-sm-4 mt-2 p-2">
                <InputFormNoteAdd
                  onInputChange={this.handleChange}
                  handleCheckboxIsCorpBtnClick={this.onCheckboxIsCorpBtnClick} 

                  text={text} 
                  phone={phone}
                  email={email}
                  linkedin_profile={linkedin_profile}
                  website={website}
                  correspondence={correspondence}
                  is_corporate={is_corporate}

                  errors={errors} 
                /> 
                <Button size="lg" className="rounded-0" color="info" type="submit"><FontAwesomeIcon icon={faSave} color="white"/></Button>
                <Button size="lg" className="rounded-0" outline onClick={this.resetForm}>Clear</Button>
                <Link to="/investors" onClick={this.refreshPage} ><Button className="rounded-0" size="lg"><FontAwesomeIcon icon={faUndoAlt} color="white"/> Cancel</Button></Link>

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
        addDetailNote: (text, phone, status, is_corporate, email, linkedin_profile, website, correspondence) => {
            return dispatch(detail.addDetailNote(text, phone, status, is_corporate, email, linkedin_profile, website, correspondence));
        },
    }
}

// export default NewNote;
export default connect(mapStateToProps, mapDispatchToProps)(NoteNew);