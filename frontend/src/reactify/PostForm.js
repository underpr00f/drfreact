import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import moment from 'moment'
// import { Redirect } from 'react-router-dom'

import store from "../store";
import { getUserToken } from "../utils/authUtils";


class PostForm extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDraftChange = this.handleDraftChange.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.postTitleRef = React.createRef()
        this.postContentRef = React.createRef()
        this.deletePost= this.deletePost.bind(this)
        this.state = {
            draft: false,
            title: null,
            slug: null,
            content: null,
            publish: moment(new Date()).format('YYYY-MM-DD'),
            errors: {}
        }
    }

    updatePost(data){
      const {post} = this.props
      const endpoint = `/api/posts/${post.slug}/` 
      const csrfToken = cookie.load('csrftoken')
      const token = getUserToken(store.getState());
      console.log('token', token);
      console.log('csrftoken', csrfToken);
      let thisComp = this
      if (csrfToken !== undefined) {
          let lookupOptions = {
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken,
                  'Authorization': 'Token ' + token
              },
              body: JSON.stringify(data),
              credentials: 'include'
          }

          fetch(endpoint, lookupOptions)
          .then(function(response){
              return response.json()
          }).then(function(responseData){
              console.log(responseData)
              if (thisComp.props.newPostItemUpdated){
                  thisComp.props.newPostItemUpdated(responseData)
              }
              thisComp.clearForm()
          }).catch(function(error){
              console.log("error", error)
              alert("An error occured, please try again later.")
          })
      } 
      
  	} 
    createPost(data){
      const endpoint = '/api/posts/' 
      const csrfToken = cookie.load('csrftoken')
      let thisComp = this
      console.log('csrf', csrfToken)
      if (csrfToken !== undefined) {
          let lookupOptions = {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
              },
              body: JSON.stringify(data),
              credentials: 'include'
          }

          fetch(endpoint, lookupOptions)
          .then(function(response){              
              return response.json()
          }).then(function(responseData){
              console.log(responseData)
              if (thisComp.props.newPostItemCreated){
                  thisComp.props.newPostItemCreated(responseData)
              }
              thisComp.clearForm()
              thisComp.defaultState()
          }).catch(function(error){
              console.log("error", error)
              alert("An error occured, please try again later.")
          })
      } 
      
    }
    deletePost(event) {
      event.preventDefault();
      const {post} = this.props
      const endpoint = `/api/posts/${post.slug}/` 
      const csrfToken = cookie.load('csrftoken')
      console.log(post)
      return fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include'
        }).then(function(response){
          return response
        }).then(data => {
          if(data.status === 204){
            // this.UpdateRoute();
            console.log('Successfully Delete');
          }   
        }).catch(function(error){
            console.log("error", error)
            alert("An error occured, please try again later.")
        })
    };

  	clearForm(event){
      if (event){
        event.preventDefault()
      }
      this.postCreateForm.reset()
      
    } 
    clearFormRefs(){
      this.postTitleRef.current=''
      this.postContentRef.current=''
    }  	
	handleSubmit(event){      
	    event.preventDefault()
	    let data = this.state
      const {post} = this.props
      if (post !== undefined) {
        this.updatePost(data)
      } else {
        this.createPost(data)
      }
	    
      console.log({post})
	}
	handleInputChange(event){
        event.preventDefault()
        let key = event.target.name
        let value = event.target.value

        if (key === 'title'){
            if (value.length > 120){
                alert("This title is too long")
            }
        }
        this.setState({
            [key]: value

        })
    }
  //fix doubleclick checkbox
  handleDraftChange(event){
    this.setState({
      draft: !this.state.draft
    })
  }
  defaultState(){
    this.setState({
        draft: false,
        title: null,
        content: null,
        slug: null,
        publish: moment(new Date()).format('YYYY-MM-DD'),
    })   
  }
  componentDidMount(){
    const {post} = this.props
    // this.loginCheck()
    if (post !== undefined) {
      this.setState({
          draft: post.draft,
          title: post.title,
          content: post.content,
          slug: post.slug,
          publish: moment(post.publish).format('YYYY-MM-DD'),
      })
    } else {
      this.defaultState()
    }
    // this.postTitleRef.current.focus()
  }
	render(){
		const {publish} = this.state
    const {title} = this.state
    const {content} = this.state
    const {slug} = this.state
    const cancelClass = this.props.post !== undefined ? "d-none" : ""
    const deleteClass = this.props.post === undefined ? "d-none" : ""
		return (
		  <div>
		    <form onSubmit={this.handleSubmit} ref={(el)=> this.postCreateForm = el}>
		        <div className="form-group">
					<label htmlFor='blogTitle'>Title</label>
					<input 
					  type='text' 
					  id='blogTitle' 
					  name='title' 
					  className='form-control' 
					  placeholder='Blog post title'
            value={title || ''}            
					  ref={this.postTitleRef} 
					  onChange={this.handleInputChange} 
					  required='required' />
				</div>
				<div className="form-group">
					<label htmlFor='content'>Content</label>
					<textarea 
					  id='content' 
					  name='content' 
					  className='form-control' 
					  placeholder='Post content'
            value={content || ''}
					  ref={this.postContentRef} 
					  onChange={this.handleInputChange} 
					  required='required' />
				</div>
				<div className='form-group'>
                    <label htmlFor='slug'>Slug</label>
                    <input 
                      type='text' 
                      id='slug' 
                      name='slug' 
                      className='form-control'
                      placeholder='Type Slug'
                      value={slug || ''}  
                      onChange={this.handleInputChange} 
                      required='required'/>
                </div>
		        <div className="form-group">
					<label htmlFor='draft'>
						<input 
						  type='checkbox' 
						  id='draft' 
						  name='draft' 
						  className='mr-2' 
						  onChange={this.handleDraftChange} 
						  checked={this.state.draft}
						  />
					Draft</label>
                <button onClick={(event)=>{event.preventDefault();this.handleDraftChange()}}>Toggle Draft</button>
				</div>
				<div className="form-group">
					<label htmlFor='publish'>Publish Date</label>
					<input 
					  type='date' 
					  id='publish' 
					  name='publish' 
					  className='form-control' 
					  onChange={this.handleInputChange} 
					  required='required'
					  value={publish}
					   />
				</div>
				<button type='submit' className='btn btn-primary '>Save</button>
				<button className={`btn btn-secondary ${cancelClass}`} onClick={this.clearForm}>Clear</button>
        <button className={`btn btn-danger' ${deleteClass}`} onClick={this.deletePost}>Delete</button>

		    </form>
		  </div>
		)
	}

}

export default PostForm
