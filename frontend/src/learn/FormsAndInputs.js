import React, { Component } from 'react'
import MessageDetail from './MessageDetail'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../actions/authActions";

class FormsAndInputs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullName: '',
      'messages': [],
    }
    this.inputFullNameRef = React.createRef()
  }

  static propTypes = {
      getUserProfile: PropTypes.func.isRequired,
      user: PropTypes.object
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    const conf = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'text': data.fullName}),
    }
    console.log("FinalData", data.fullName)
    fetch('http://127.0.0.1:8000/api/messages/', conf)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            this.getItems(); //апдейт сообщений
          });
        } else {
          console.log(conf);
        }
      });

    // .then(results => results.json())
    // .then(results => console.log(conf));
  }
  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleFocus = (event) =>{
    this.inputFullNameRef.current.focus()
  }
  handleClear = (event) =>{
    this.inputFullNameRef.current.value = ""
    this.setState({
      'fullName': ""
    })

  }
  componentWillMount() {
    this.props.getUserProfile();
  }
  componentDidMount() {
    this.inputFullNameRef.current.focus()
  }
  getItems() {
    // setTimeout(() => this.setState({ isLoading: false }), 2500); // simulates an async action, and hides the spinner
    fetch('http://127.0.0.1:8000/api/messages/')
      .then(results => results.json())
      .then(results => this.setState({'messages':results, isLoading: false}));
  }
  renderUser() {
      const user = this.props.user;
      if (user) {
          return (
              <div className="mx-2">
                  <h4>username: {user.username}</h4>
                  <h4>First Name: {user.first_name}</h4>
                  <h4>Last Name: {user.last_name}</h4>
                  <h4>email: {user.email}</h4>
                  <h4>Website: {user.website}</h4>
                  <hr />
                  <h4>About Myself:</h4>
                  <p>{user.about}</p>

              </div>
          );
      }
      return null;
  }
  render () {
    const {fullName, messages} = this.state
    return (
      <div className="text-center">
        <h1>InputForm!</h1>
        {this.renderUser()}
        <p>Full name is: {fullName}</p>
        <form onSubmit={this.handleSubmit}>
          <p><input ref={this.inputFullNameRef} type="text" placeholder="Your name" value={fullName} name="fullName" onChange={this.handleInputChange} /></p>
          <p><button>Send</button></p>
          <p><button onClick={this.handleFocus}>Focus</button></p>
          <p><button onClick={this.handleClear}>Clear</button></p>
        </form>        
        <div>{messages.map((post,index) => {
        return (
          <MessageDetail 
            post={post} 
            key={`post-list-key ${index}`}
           />
          )
        })
        }
        </div>
      </div>


    )
  }
}

// export default FormsAndInputs
function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getUserProfile } )(FormsAndInputs);