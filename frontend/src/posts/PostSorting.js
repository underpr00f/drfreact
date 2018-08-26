import React, {Component} from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';

import PostDetail from './PostDetail'

class PostSorting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'items': []
		}
		this.toggleListReverse = this.toggleListReverse.bind(this)
	}
	toggleListReverse(event) {
		// console.log(currentPostList)
		this.setState({
			items: this.state.items.reverse()
		})
	}
	// handleDataCallback(postItem) {
	// 	let currentPostList = this.state.items
	// 	currentPostList.push(postItem)
	// 	this.updateBackend(currentPostList)
	// }
	// handlePostRemove(postItem) {
	// 	let currentPostList = this.state.items
	// 	currentPostList.pop(postItem)
	// 	this.updateBackend(currentPostList)
	// }
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
				
				<button className='btn btn-secondary' onClick={this.toggleListReverse}>Reverse</button>
				<div>{items.map((post,index) => {
					return (
						<PostDetail 
							post={post} 
							key={`post-list-key ${index}`}
							dataCallback={this.toggleListReverse} 
						/>
						)
					})
					}
				</div>
			</div>
		);
	}
}


export default PostList
