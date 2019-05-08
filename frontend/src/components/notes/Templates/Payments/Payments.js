import React, {Component} from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';

import * as lead from "../../../../actions/paymentsActions";
import { LoadScreen } from '../../../general/Organisms/LoadScreen/LoadScreen'
import { paymentsUtil } from '../../../../utils/paymentsUtils'
import './styles.scss'

class Payments extends Component {
    state = {         
        loading: true,
        errors: {},
        lead: {},
      };

    componentDidMount(){
      if (this.props.match){
        this.props.fetchPaymentsLead()
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.lead !== prevProps.lead) {
        if (this.props.lead) {
          const leads = paymentsUtil(this.props.lead.leads)
          this.setState({leads: leads}); 
        }
      }
    }   
    renderPayments() {
      const { lead } = this.props;
        if (lead.leads) {
          return (
            <div>
              <h3>Leads View</h3>
              <Table className="table text-center" striped>
                <thead>
                  <tr>
                    <th className="table-num__title table-payments">#</th>
                    <th className="table-payments">Developer</th>
                    <th className="table-payments">Total Leads</th>
                    <th className="table-payments">Processed</th>
                    <th className="table-payments">Converted</th>
                    <th className="table-payments">Rejected</th>
                    <th className="table-payments">Next Payment</th>
                  </tr>
                </thead>  
                <tbody>
                  {lead.leads.length > 0 ? lead.leads.map((item,id) => (
                    <tr key={id}>
                        <th scope="row" className="table-num__text">{id+1}</th>
                        <td>
                          <Link className="info-link" to={{pathname:`/profile/${item.id}`,
                              state: {fromDashboard: false, prevLink: window.location.pathname}
                              }}>{item.owner}</Link>
                        </td>
                        <td>{item.total}</td>
                        <td>{item.processed}</td>
                        <td>{item.converted}</td>
                        <td>{item.rejected}</td>
                        <td>{item.price}</td>
                    </tr>
                  )) : <tr><td colSpan="7">Table is empty. Add your investors</td></tr>}
                </tbody>                     
              </Table>
            </div>              
          );
        }
    }
    render () {
      const { loading } = this.props
      return(
          <div>
            { loading ? <LoadScreen /> : this.renderPayments() }
        </div>               
      )
    }
}

const mapStateToProps = state => {
    return {
      lead: state.lead,
      loading: state.lead.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchPaymentsLead: () => {
          dispatch(lead.fetchPaymentsLead());
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);