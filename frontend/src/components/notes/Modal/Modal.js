import React, { Component } from 'react'
import {   
  FormGroup, Button, Modal, 
  ModalHeader, ModalBody, 
  ModalFooter, } from 'reactstrap';
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export class ModalDelete extends Component {
  render() {
    const { modaldelete, text, index, id, toggle} = this.props;

    return (
      <div>
        <Modal isOpen={modaldelete} toggle={toggle}>
            <ModalHeader color="info">Are you sure?</ModalHeader>           
            <ModalBody>Delete <b>{text}</b> Investor?</ModalBody>
            <ModalFooter> 
              <FormGroup row>                   
              <Button className="rounded-0" color="info" onClick={() => this.props.onSelectForDelete(index, id)}><FontAwesomeIcon icon={faTrash} color="white"/></Button>              
              <Button className="rounded-0" onClick={toggle}>Cancel</Button>
              </FormGroup>
            </ModalFooter>
        </Modal> 
      </div>
    )
    
  }
}
// renderModalDelete() {
//     if (this.state.modaldelete) {
//       return (
//         <div>
//         <Modal isOpen={this.state.modaldelete} toggle={this.toggleModalDelete}>           
//             <ModalBody>Delete <b>{this.state.text}</b> Investor?</ModalBody>
//             <ModalFooter> 
//               <FormGroup row>                   
//               <Button className="rounded-0" color="info" onClick={() => this.selectForDelete(this.state.index, this.state.id)}><FontAwesomeIcon icon={faTrash} color="white"/></Button>              
//               <Button className="rounded-0" onClick={this.toggleModalDelete}>Cancel</Button>
//               </FormGroup>
//             </ModalFooter>
//         </Modal> 
//         </div>           
//       );
//     }
// }
