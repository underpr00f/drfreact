import React from 'react'
import {   
  FormGroup, Button, Modal, 
  ModalHeader, ModalBody, 
  ModalFooter, } from 'reactstrap';
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const ModalDelete = ({ 
      onSelectForDelete,
      modaldelete, text, index, id, toggle   }) => {
    return (
      <div>
        <Modal isOpen={modaldelete} toggle={toggle}>
            <ModalHeader color="info">Are you sure?</ModalHeader>           
            <ModalBody>Delete <b>{text}</b> Investor?</ModalBody>
            <ModalFooter> 
              <FormGroup row>                   
              <Button className="rounded-0" color="info" onClick={() => onSelectForDelete(index, id)}><FontAwesomeIcon icon={faTrash} color="white"/></Button>              
              <Button className="rounded-0" onClick={toggle}>Cancel</Button>
              </FormGroup>
            </ModalFooter>
        </Modal> 
      </div>
    )
}
