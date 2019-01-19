import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
// import { Link } from 'react-router-dom'
import * as lead from "../../actions/paymentsActions";
import {connect} from 'react-redux';
// import { Form, FormText, 
//   FormGroup, Label, Input, Button,
//   Dropdown, DropdownToggle, 
//   DropdownMenu, DropdownItem, Table } from 'reactstrap';
import { Table } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMale, faUsers, faSave } from '@fortawesome/free-solid-svg-icons'

class Payments extends Component {
    constructor(props){
        super(props)       
        this.state = {
          doneLoading: false,
          errors: {},
          lead: {},          
        }
    }

    componentDidMount(){
      if (this.props.match){
        this.setState({
            doneLoading: false,
        })
        this.props.fetchPaymentsLead()
      }
    }
   
    renderNote() {
        if (this.props.lead) {
          // const {doneLoading} = this.state
          const { lead } = this.props;
          // const { errors } = this.state;

          return (
            <div>
              <h3>Leads View</h3>
              <Table className="table text-center" striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Developer</th>
                    <th>Total Leads</th>
                    <th>Processed</th>
                    <th>Converted</th>
                    <th>Rejected</th>
                    <th>Next Payment</th>
                  </tr>
                </thead>  
                <tbody>
                  {lead.length > 0 ? lead.map((item,id) => (
                    <tr key={id}>
                        <th scope="row">{id+1}</th>
                        <td>{item.owner}</td>
                        <td>{item.total}</td>
                        <td>{item.processed}</td>
                        <td>{item.converted}</td>
                        <td>{item.rejected}</td>
                        <td>{item.price}</td>
                    </tr>
                  )) : null}
                </tbody>                     

              </Table>
            </div>              
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
        return(
            <div>
              {this.renderNote()}
          </div>               
        )
    }
}

const mapStateToProps = state => {
    return {
      lead: state.lead,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchPaymentsLead: () => {
          dispatch(lead.fetchPaymentsLead());
      },
      // updateDetailNote: (id, text, phone, status, is_corporate, email, linkedin_profile, website) => {
      //     dispatch(detail.updateDetailNote(id, text, phone, status, is_corporate, email, linkedin_profile, website));
      // }
    }
}

// export default NoteDetail;
export default connect(mapStateToProps, mapDispatchToProps)(Payments);