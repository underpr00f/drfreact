import React from 'react'
import { Button, 
  FormGroup, Label, } from 'reactstrap';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'

// Checkbox is corporate
export const DatePickLastCall = ({ 
  handleChangeDate, handleAddCallClick,
  handleResetCallClick,
  last_call
  }) => {


  const onChangeDate = (date) => {
    if (date) {
      handleChangeDate(moment(date, moment.defaultFormat).toDate());
    } else {
      handleChangeDate(null);
    }
    
  }

    const is_valid_date = moment(last_call).isValid()

    return ( 
      <div>
        <FormGroup>
          <Label>Last Call {is_valid_date ? <Button className="btn" onClick={handleResetCallClick}>Reset</Button>: ""}</Label>
          {is_valid_date ?
          <div>
            <DatePicker     
              selected={is_valid_date && moment(last_call, moment.defaultFormat).toDate()}
              onChange={onChangeDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="d MMMM yyyy HH:mm"
              timeCaption="time"
            />
          </div>
          :                     
            <Button className="btn btn-block" onClick={handleAddCallClick}>Add Last Call</Button>
          }
        </FormGroup>
      </div>
    )    
}