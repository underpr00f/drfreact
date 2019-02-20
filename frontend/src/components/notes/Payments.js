import React, {Component} from 'react'
import * as lead from "../../actions/paymentsActions";
import {connect} from 'react-redux';
import { LoadScreen } from './LoadScreen/LoadScreen'
import { Table } from 'reactstrap';

class Payments extends Component {
    constructor(props) {
      super(props);
      this.state = {         
        loading: true,
        errors: {},
        lead: {},
      };
    }

    componentDidMount(){
      if (this.props.match){
        this.props.fetchPaymentsLead()
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
                  {lead.leads.length > 0 ? lead.leads.map((item,id) => (
                    <tr key={id}>
                        <th scope="row">{id+1}</th>
                        <td>{item.owner}</td>
                        <td>{item.total}</td>
                        <td>{item.processed}</td>
                        <td>{item.converted}</td>
                        <td>{item.rejected}</td>
                        <td>{item.price}</td>
                    </tr>
                  )) : <tr><td colspan="7">Table is empty. Add your investors</td></tr>}
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