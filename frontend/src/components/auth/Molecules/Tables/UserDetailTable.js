import React from 'react'
import { Table } from 'reactstrap';

import { ReturnButton } from '../../../general/Atoms/Buttons/Buttons'
export const UserDetailTable = (userdetail) => {
  if (userdetail) {
    return (
      <div className="mx-2 mt-2 text-center">
        <Table striped className="table-userprofile">
          <thead>
            <tr>
              <th>Profile {userdetail.username}</th>
              <td>
                <ReturnButton />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Avatar:</th>
              <td>
                <div className="avatar"
                    style={{ backgroundImage: `url(${userdetail.avatar})` }}>
                </div>
              </td>
            </tr>
            <tr>
              <th>First Name:</th>
              <td>{userdetail.first_name}</td>
            </tr>                    
            <tr>
              <th>Last Name:</th>
              <td>{userdetail.last_name}</td>
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
