import React, { Component } from 'react'
import { Table } from 'reactstrap';
import PropTypes from "prop-types";

import { ReturnButton } from '../../Atoms/Buttons/Buttons'

export class UserDetailTable extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const userdetail = this.props;   
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
            );
        }
        return null;    
  }
}