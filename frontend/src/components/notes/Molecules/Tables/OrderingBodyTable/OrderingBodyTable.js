import React from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faUsers, faEdit, 
  faCheckCircle, faHandHoldingUsd, faTrash } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export const OrderingBodyTable = ({ 
      onSelectForEdit, onToggleModalDelete,
      post, index   }) => {


    return (
        <tbody key={index}>
          {post.noteitems !== undefined && post.noteitems.length > 0 ? post.noteitems.map((note, id) => {
            return (                                    
                <tr key={id}>
                    <th scope="row" className="table-num__text">{id+1}</th>
                    <td className="table-investor__text">{note.is_corporate ? <FontAwesomeIcon icon={faUsers} color="black"/> : <FontAwesomeIcon icon={faMale} color="black"/>}</td>
                    <td>
                      <Link className="info-link" to={{pathname:`/investors/${note.id}`,
                            state: {fromDashboard: false, prevLink: window.location.pathname}
                            }}>{note.text}</Link>
                    </td>
                    <td>
                      <Link className="info-link" to={{pathname:`/profile/${note.owner}`,
                            state: {fromDashboard: false, prevLink: window.location.pathname}
                            }}>{note.owner_username}</Link></td>
                    <td className="table-phone__text">{note.phone}</td>
                    <td>{note.status}</td>
                    <td>{note.is_payed ? <FontAwesomeIcon icon={faCheckCircle} color="black"/> : <FontAwesomeIcon icon={faHandHoldingUsd} color="black"/>}</td>
                    <td>
                      <Button className="rounded-0" color="info" title="edit" onClick={() => onSelectForEdit(index, id)}><FontAwesomeIcon icon={faEdit} /></Button>
                      <Button className="rounded-0" color="secondary" onClick={() => onToggleModalDelete(index, id)} title="delete"><FontAwesomeIcon icon={faTrash} /></Button>
                    </td>
                </tr>                                        
              )
            }
          ) : null}
        </tbody>
      )    
}
