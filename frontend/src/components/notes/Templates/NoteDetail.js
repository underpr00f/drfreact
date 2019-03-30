import React, {Component} from 'react'

import * as detail from "../../../actions/noteDetailActions";
import {connect} from 'react-redux';
import { Form, Container, Row,
     } from 'reactstrap';
import moment from "moment";

import { LoadScreen } from '../../general/Organisms/LoadScreen/LoadScreen'
import { ReturnButton, SaveButton } from '../../general/Atoms/Buttons/Buttons'
import { InputFormNoteDetail } from '../Molecules/Forms/InputFormNoteDetail'
import { DetailPreviewTable } from '../Molecules/Tables/DetailPreviewTable'
import { handleValidation } from '../../../utils/helpers'

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

    getData = (documents) => {
      // console.log("getData!")
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
      // check validation from helper file
      const validation_errors = handleValidation(this.state)
      // check validation_errors dictionary is empty or has any errors
      if (Object.keys(validation_errors).length === 0) {
        this.props.updateDetailNote(this.state.id, this.state.text, 
          this.state.phone, this.state.status, this.state.is_corporate, 
          this.state.is_payed, this.state.email, this.state.linkedin_profile, 
          this.state.website, this.state.correspondence, this.state.last_call,
          this.state.documents, this.state.attached,)
      } else {
        this.setState({errors: validation_errors}); 
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
                    <SaveButton />
                    <ReturnButton />
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
                <h1>404 error. Investor Not Found</h1>
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