import React from 'react'
import { Table } from 'reactstrap';

import { ReturnButton } from '../../../general/Atoms/Buttons/Buttons'
import { HomeButton } from '../../../general/Atoms/Links/Links'
import './styles.scss'

export const UserDetailTable = (userdetail) => {
  if (userdetail) {
    return (
      <div className="mx-2 mt-2">
        <Table className="userprofile-header">
          <tbody>
            <tr>
              <th>
                <h2>{userdetail.first_name}{" "}{userdetail.last_name}</h2>
              </th>
              <td>
                <ReturnButton />
                <HomeButton />
              </td>
            </tr>
          </tbody>
        </Table>
        <Table className="table-userprofile">
          <thead>
            <tr>
              <td colSpan="2">
                <div className="avatar"
                    style={{ backgroundImage: `url(${userdetail.avatar})` }}>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Profile:</th>
              <td>
                {userdetail.username}
              </td>
            </tr>

            <tr>
              <th>Email:</th>
              <td>{userdetail.email}</td>
            </tr>
            <tr>
              <th>Website:</th>
              <td><a className="table-correspondence__url" href={`${userdetail.website}`} >{userdetail.website}</a></td>
            </tr>                    
            <tr>
              <th>About:</th>
              <td>{userdetail.about}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  } 
  return null


};
