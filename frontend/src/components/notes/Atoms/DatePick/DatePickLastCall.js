import React, { Component } from 'react'
import { Button, 
  FormGroup, Label, } from 'reactstrap';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'

// Checkbox is corporate
export class DatePickLastCall extends Component {
  constructor(props){
    super(props);

    this.state = {
      add_call: false,
      last_call: "",      
    }
  }
  handleChangeDate = (date) => {
    if (date) {
      this.props.handleChangeDate(moment(date, moment.defaultFormat).toDate());
    } else {
      this.props.handleChangeDate(null);
    }
    
  }

  render() {
    // const { last_call } = this.state;
    const { last_call } = this.props;
    const is_valid_date = moment(last_call).isValid()

    return ( 
      <div>
        <FormGroup>
          <Label>Last Call {is_valid_date ? <Button className="btn" onClick={this.props.handleResetCallClick}>Reset</Button>: ""}</Label>
          {is_valid_date ?
          <div>
            <DatePicker     
              selected={is_valid_date ? moment(last_call, moment.defaultFormat).toDate() : moment(this.state.last_call, moment.defaultFormat).toDate()}
              onChange={this.handleChangeDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="d MMMM yyyy HH:mm"
              timeCaption="time"
            />
          </div>
          :                     
            <Button className="btn btn-block" onClick={this.props.handleAddCallClick}>Add Last Call</Button>
          }
        </FormGroup>
      </div>
    )    
  }
}