import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, 
  faUsers, faExchangeAlt, faLongArrowAltDown,
  faTimes } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export const OrderingHeaderTable = ({ 
    onOrderNotes, searchingProp, mountedProp
  }) => {

  const [stateOrder, setStateOrder] = useState([]);
  const [isOrderingName, setIsOrderingName] = useState(false);
  const [searching, setSearching] = useState(false);
  const [mounted, setMounted] = useState(mountedProp);

  const onBtnClickOrderingName = (ordername) => {
    // Create a new array based on current state:
    let order = [...stateOrder];
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
    setStateOrder(order);
    setIsOrderingName(is_ordering_name);
    setSearching(false)
    setMounted(false)
  }

  //search prop cancel ordering
  useEffect(() => {
    if (searchingProp) {
      setSearching(searchingProp)
      setStateOrder([]);
      setIsOrderingName(false); 
    }
  }, [searchingProp]);
  
  //fix bug with doubling ordering after props.orderNotes("") 
  // in componentDidMount in Notes.js
  useEffect(() => {
    if (mountedProp) {
      setMounted(mountedProp)
    }
  }, [mountedProp]); 

  //ordering move to parent, with clear parent`s search state
  useEffect(() => {
    if (!searching && !mounted) {
      onOrderNotes({order: stateOrder, 
        is_ordering_name: isOrderingName, 
        searchtext: "",
        searching: false,
        mounted: false,
      })
    } 
  }, [stateOrder, isOrderingName, searching, mounted]);
  return (
        <thead>
          <tr>
            <th className="table-num__title">#</th>
            <th className="table-investor__title"><FontAwesomeIcon icon={faMale} color="black"/> / <FontAwesomeIcon icon={faUsers} color="black"/></th>
            <th>
              <div className="table-investor__ordering">
                <span>Name </span>
                <div className="table-investor__ordering--control">
                  <Button color="link" onClick={() => onBtnClickOrderingName("text")}>
                    {stateOrder.includes("text") && !searching ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                    :stateOrder.includes("-text") && !searching ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                    :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}
                  </Button>
                  {stateOrder.includes("text") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("Ctext")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :stateOrder.includes("-text") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("C-text")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :""}
                </div>
              </div>
            </th>
            <th>
              <div className="table-investor__ordering">                  
                <span>Dev </span>
                <div className="table-investor__ordering--control">
                  <Button color="link" onClick={() => onBtnClickOrderingName("owner")}>
                  {stateOrder.includes("owner") && !searching ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                  :stateOrder.includes("-owner") && !searching ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                  :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                  {stateOrder.includes("owner") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("Cowner")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :stateOrder.includes("-owner") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("C-owner")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :""}
                </div>
              </div>
            </th>
            <th className="table-phone__title">Phone</th>
            <th>
              <div className="table-investor__ordering">                  
                <span>Status </span>
                <div className="table-investor__ordering--control">
                  <Button color="link" onClick={() => onBtnClickOrderingName("status")}>
                  {stateOrder.includes("status") && !searching ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                  :stateOrder.includes("-status") && !searching ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                  :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                  {stateOrder.includes("status") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("Cstatus")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :stateOrder.includes("-status") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("C-status")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :""}
                </div>
              </div>
            </th>
            <th>
              <div className="table-investor__ordering ">                  
                <span className="table-investor__ordering--payment">Payment </span>
                <div className="table-investor__ordering--control">
                  <Button color="link" onClick={() => onBtnClickOrderingName("is_payed")}>
                  {stateOrder.includes("is_payed") && !searching ? <FontAwesomeIcon icon={faLongArrowAltDown} color="black"/>
                  :stateOrder.includes("-is_payed") && !searching ? <FontAwesomeIcon rotation={180} icon={faLongArrowAltDown} color="black"/>
                  :<FontAwesomeIcon rotation={90} icon={faExchangeAlt} color="grey"/>}</Button>
                  {stateOrder.includes("is_payed") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("Cis_payed")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :stateOrder.includes("-is_payed") && !searching ? <Button color="link" className="btn-sort__clear" onClick={() => onBtnClickOrderingName("C-is_payed")}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                  :""}
                </div>
              </div>
            </th>
            <th>Manage</th>
          </tr>
        </thead>
  )
}