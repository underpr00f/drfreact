import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';

import Form from 'reactstrap/lib/Form';

import * as detail from "../../../../actions/noteDetailActions";
import { InputFormNoteAdd } from '../../Molecules/Forms/InputFormNoteAdd'
import { ReturnButton, SaveButton, ClearButton } from '../../../general/Atoms/Buttons/Buttons'
import { handleValidation } from '../../../../utils/helpers'

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

    onCheckboxIsCorpBtnClick = () => {
      this.setState({
        is_corporate: !this.state.is_corporate,
      });
    }

    submitNote = (e) => {
      e.preventDefault();
      // check validation from helper file
      const validation_errors = handleValidation(this.state)
      // check validation_errors dictionary is empty or has any errors
      if (Object.keys(validation_errors).length === 0) {
        this.props.addDetailNote(this.state.text, this.state.phone, this.state.status, 
          this.state.is_corporate, this.state.email, this.state.linkedin_profile, 
          this.state.website, this.state.correspondence)
          .then(this.setState({ redirectToNewPage: true }))            
          .catch(function (error) {
             console.log("error", error);
           });
      } else {
        this.setState({errors: validation_errors}); 
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
                <div>
                  <SaveButton />
                  <ClearButton
                    onClear={this.resetForm} 
                  />
                  <ReturnButton />
                </div>
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