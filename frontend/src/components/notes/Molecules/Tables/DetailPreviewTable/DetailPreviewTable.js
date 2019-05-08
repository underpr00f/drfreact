import React from 'react'
import { Table } from 'reactstrap';

import { EditButton } from '../../../../general/Atoms/Buttons/Buttons'
import { HomeButton } from '../../../../general/Atoms/Links/Links'

import moment from "moment";
import './styles.scss'

export const DetailPreviewTable = ({ 
      onEdit, handleCheckboxIsCorpBtnClick,
      text, phone, email,  
      linkedin_profile, website, 
      correspondence, is_corporate,
      status, is_payed,
      last_call, documents,   }) => {

    return (
            <div className="mt-2 table-detail"> 
                <Table className="userprofile-header">
                  <tbody>
                    <tr>
                      <th>
                        <h2>Investor <b>{text}</b></h2>
                      </th>
                      <td>
                        <HomeButton />
                        <EditButton
                          onEdit={onEdit} 
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>             
                <Table striped>
                  <tbody>
                    <tr>
                      <th>Phone</th>
                      <td>{phone}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td className="table-correspondence__data">{email}</td>
                    </tr>
                    <tr>
                      <th>Linkedin</th>
                      <td className="table-correspondence__data">
                        <a className="table-correspondence__url" 
                        href={`${linkedin_profile}`} 
                        target="_blank" rel="noopener noreferrer">
                          {linkedin_profile}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td className="table-correspondence__data">
                        <a className="table-correspondence__url" 
                          href={`${website}`} 
                          target="_blank" rel="noopener noreferrer">
                            {website}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>Correspondence</th>
                      <td className="table-correspondence__data">{correspondence}</td>
                    </tr>
                    <tr>
                      <th>Investor</th>
                      <td>{is_corporate ? "Corporate" : "Individual" }</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{status}</td>
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