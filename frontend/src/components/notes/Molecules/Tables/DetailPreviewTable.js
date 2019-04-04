import React, { Component } from 'react'
import { Table } from 'reactstrap';

import moment from "moment";

export class DetailPreviewTable extends Component {
  render() {
    const { text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      status, is_payed,
      last_call, documents, 
    } = this.props;

    return (
            <div className="col col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 table-detail">
              <h3>Detailed Preview</h3>
                <Table striped>
                  <tbody>
                    <tr>
                      <th>Investor</th>
                      <td>{is_corporate ? "Corporate" : "Individual" }</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{text}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{phone}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{status}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td className="table-correspondence__data">{email}</td>
                    </tr>
                    <tr>
                      <th>Linkedin</th>
                      <td className="table-correspondence__data"><a className="table-correspondence__url" href={`${linkedin_profile}`} >{linkedin_profile}</a></td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td className="table-correspondence__data"><a className="table-correspondence__url" href={`${website}`} >{website}</a></td>
                    </tr>
                    <tr>
                      <th>Correspondence</th>
                      <td className="table-correspondence__data">{correspondence}</td>
                    </tr>
                    <tr>
                      <th>Payment</th>
                      <td>{is_payed ? "Payed" : "New" }</td>
                    </tr>
                    <tr>
                      <th>Calls</th>
                      <td>{last_call ? moment(last_call).format("D MMM YYYY HH:mm") : ""}</td>
                    </tr>
                    <tr>
                      <th>Documents</th>
                      <td>{documents ? <a className="table-correspondence__url" href={`${documents}`} >{documents.split("/").slice(-1)[0]}</a> : ""}</td>
                    </tr>
                  </tbody>
                </Table>
            </div>
    )
    
  }
}