import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, 
  faUsers, faExchangeAlt, faLongArrowAltDown,
  faTimes } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export class OrderingHeaderTable extends Component {

  state = { order: [], is_ordering_name: false, searchtext: "" }

  onBtnClickOrderingName = (ordername) => {
    // Create a new array based on current state:
    let order = [...this.state.order];
    let newordername = "-"+ordername
    let is_ordering_name = false

    // if ordername starts from "C"-character - clear that order!
    if (ordername.charAt(0) === "C"){
      let index = order.indexOf(ordername.slice(1, ordername.length))
      // Clear ordername (remove from array)
      if (index !== -1) {
        order.splice(index, 1);
      }
    } else {
      // Add or remove item to it
      if (order.includes(ordername)){
        let index = order.indexOf(ordername)
        if (index !== -1) {          
          order.splice(index, 1);
          order.splice(index, 0, newordername);         
        }
      } else if (order.includes(newordername)) {
        let index = order.indexOf(newordername)
        if (index !== -1) {
          order.splice(index, 1);
          order.splice(index, 0, ordername);
        }
      } else {
        order.push(ordername);

      }
    }
    if (order.length > 0) {
      is_ordering_name = true
    } 

    // FIX BUG with "owner" negative ordering
    if (order.includes("-owner")&&order.length===1) {
      // adding "-id" field to multiply filter
      // if has only "-owner" field
      order.push("-id");
    } else {
      // remove "-id" in all other variants
      let index = order.indexOf("-id")
      if (index !== -1) {        
        order.splice(index, 1);
      }      
    }

    // Set state
    this.setState({is_ordering_name: is_ordering_name, searchtext: "", order}, function () {
        // console.log(this.state)
        this.props.onOrderNotes(this.state);
    });
  }

  render() {

    const {order} = this.state;

    return (
          <thead>
            <tr>
              <th className="table-num__title">#</th>
              <th className="table-investor__title"><FontAwesomeIcon icon={faMale} color="black"/> / <FontAwesomeIcon icon={faUsers} color="black"/></th>
              <th>
                <div className="table-investor__ordering">
                  <span>Name </span>
                  <div className="table-investor__ordering--control">
                    <Button color="link" onClick={() => this.onBtnClickOrderingName("text")}>
                    {order.includes("text") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                    :order.includes("-text") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                    :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                    {order.includes("text") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Ctext")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :order.includes("-text") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-text")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :""}
                  </div>
                </div>
              </th>
              <th>
                <div className="table-investor__ordering">                  
                  <span>Dev </span>
                  <div className="table-investor__ordering--control">
                    <Button color="link" onClick={() => this.onBtnClickOrderingName("owner")}>
                    {order.includes("owner") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                    :order.includes("-owner") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                    :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                    {order.includes("owner") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Cowner")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :order.includes("-owner") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-owner")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :""}
                  </div>
                </div>
              </th>
              <th className="table-phone__title">Phone</th>
              <th>
                <div className="table-investor__ordering">                  
                  <span>Status </span>
                  <div className="table-investor__ordering--control">
                    <Button color="link" onClick={() => this.onBtnClickOrderingName("status")}>
                    {order.includes("status") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                    :order.includes("-status") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                    :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                    {order.includes("status") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Cstatus")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :order.includes("-status") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-status")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :""}
                  </div>
                </div>
              </th>
              <th>
                <div className="table-investor__ordering ">                  
                  <span className="table-investor__ordering--payment">Payment </span>
                  <div className="table-investor__ordering--control">
                    <Button color="link" onClick={() => this.onBtnClickOrderingName("is_payed")}>
                    {order.includes("is_payed") ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                    :order.includes("-is_payed") ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                    :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                    {order.includes("is_payed") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("Cis_payed")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :order.includes("-is_payed") ? <Button color="link" className="btn-sort__clear" onClick={() => this.onBtnClickOrderingName("C-is_payed")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    :""}
                  </div>
                </div>
              </th>
              <th>Manage</th>
            </tr>
          </thead>
    )
    
  }
}