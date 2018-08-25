import React, {Component} from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';

import PostDetail from './PostDetail'

class PostList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'items': []
		}
		this.handleDataCallback = this.handleDataCallback.bind(this)
		this.handlePostRemove = this.handlePostRemove.bind(this)
		this.toggleListReverse = this.toggleListReverse.bind(this)
	}

	toggleListReverse(event) {
		const {items} = this.state
		let newPostList = items.reverse()
		this.setState({
			items: newPostList
		})
	}
	updateBackend(currentPostList) {
		console.log(currentPostList)
		this.setState({
			postItem: currentPostList
		})
	}
	handleDataCallback(postItem) {
		let currentPostList = this.state.items
		currentPostList.push(postItem)
		this.updateBackend(currentPostList)
	}
	handlePostRemove(postItem) {
		let currentPostList = this.state.items
		currentPostList.pop(postItem)
		this.updateBackend(currentPostList)
	}
	componentDidMount() {
		this.getItems();
	}
	getItems() {
		fetch('http://127.0.0.1:8000/api/item/')
		  .then(results => results.json())
		  .then(results => this.setState({'items':results, isLoading: true}));
	}
	render() {
		const {items} = this.state
		return (
			<div>
				<h1>HI!</h1>
				<button className='btn btn-secondary mx-auto d-block' onClick={this.toggleListReverse}>Reverse</button>
				<div>{items.map((post,index) => {
					return (
						<PostDetail 
							post={post} 
							key={`post-list-key ${index}`}
							dataCallback={this.handleDataCallback} 
							didHandleRemove={this.handlePostRemove} />
						)
					})
					}
				</div>
			</div>
		);
	}
}


export default PostList
