import React, { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import PostInline from './PostInline'
// import PostCreate from './PostCreate'
// import PostForm from './PostForm'
import { connect } from 'react-redux'

import store from "../store";
import { getUserToken } from "../utils/authUtils";

class Posts extends Component {

  constructor(props){
      super(props)
      this.togglePostListClass = this.togglePostListClass.bind(this)
      this.handleNewPost = this.handleNewPost.bind(this)
      this.loadMorePosts =this.loadMorePosts.bind(this)
      this.state = {
          posts: [],
          postsListClass: "card",
          next: null,
          previous: null,
          author: false,
          count: 0,
          authenticated: false, //adding redux-props
      }
  }

  loadMorePosts(){
      const {next} = this.state 
      if (next !== null || next !== undefined) {
           this.loadPosts(next)
      }
     
  }
    
  loadPosts(nextEndpoint){
      let endpoint = '/api/posts/' 
      if (nextEndpoint !== undefined) {
          endpoint = nextEndpoint
      }
      let thisComp = this
      let lookupOptions = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const csrfToken = cookie.load('csrftoken')
      const token = getUserToken(store.getState());
      console.log('token', token);
      console.log('csrftoken', csrfToken);

      if (csrfToken !== undefined) {
          lookupOptions['credentials'] = 'include'
          lookupOptions['headers']['X-CSRFToken'] = csrfToken
       } 

      fetch(endpoint, lookupOptions)
      .then(function(response){
          return response.json()
      }).then(function(responseData){
          console.log(responseData)
          // let currentPosts = thisComp.state.posts
          // let newPosts = currentPosts.concat(responseData.results)
          // console.log(currentPosts)
           thisComp.setState({
                  posts: thisComp.state.posts.concat(responseData.results),
                  next: responseData.next,
                  previous: responseData.previous,
                  author: responseData.author,
                  count: responseData.count,
                  authenticated: thisComp.props.state.auth.authenticated //adding redux-props
              })
      }).catch(function(error){
          console.log("error", error)
      })
  }

  handleNewPost(postItemData){
      // console.log(postItemData)
      let currentPosts = this.state.posts
      currentPosts.unshift(postItemData) // unshift
      this.setState({
          posts: currentPosts
      })
  }

  

  togglePostListClass(event){
      event.preventDefault()
      let currentListClass = this.state.postsListClass
      if (currentListClass === ""){
          this.setState({
              postsListClass: "card",
          })
      } else {
          this.setState({
              postsListClass: "",
          })
      }
      
  }

  componentDidMount(){
      this.setState({
          posts: [],
          postsListClass: "card",
          next: null,
          previous: null,
          author: false,
          count: 0,
          authenticated: false,
      })
      this.loadPosts()
  }
  // {author === true ? <Link className='mr-2' maintainScrollPosition={false} to={{
  //           pathname: `/posts/create/`,
  //           state: { fromDashboard: false }
  //         }}>Create Post</Link> : ""}
  
  // <button onClick={this.togglePostListClass}>Toggle Class</button>
  // {posts.length > 0 ? posts.map((postItem, index)=>{
  //     return (
  //             <PostInline post={postItem} elClass={postsListClass} />
  //     )
  // }) : <p>No Posts Found</p>}
  // {next !== null ? <button onClick={this.loadMorePosts}>Load more</button> : ''}
  render() {
      const {posts} = this.state
      const {postsListClass} = this.state
      const {author} = this.state
      const {next} = this.state 
      // const {auth} = this.props.state.auth.authenticated
      const {authenticated} = this.state //adding redux-props
      // const csrfToken = cookie.load('csrftoken')
    return (
      <div>
        {authenticated === true ?
          <Link className='mr-2' to={{
            pathname: `/react/posts/create/`,
            state: { fromDashboard: false }
          }}>Create Post</Link>
        : ''}
          <button onClick={this.togglePostListClass}>Toggle Class</button>
          {posts.length > 0 ? posts.map((postItem, index)=>{
            return (
              <PostInline post={postItem} key={`post-list-key ${index}`} elClass={postsListClass} />
            )
          }) : <p>No Posts Found</p>}
        {next !== null ? <button onClick={this.loadMorePosts}>Load more</button> : ''}

      </div>
    );
  }
}

// export default Posts;


const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(Posts);
// {(csrfToken !== 'undefined' && csrfToken !== null) ?
// <div className='my-5'>
//   <PostForm newPostItemCreated={this.handleNewPost} />
// </div>
// : ''}