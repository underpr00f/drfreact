import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import PostDetail from './PostDetail'

class PostList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'items': [],
			isOldestFirst: true,
			isLoading: true,
		}
		this.handleDataCallback = this.handleDataCallback.bind(this)
		this.handlePostRemove = this.handlePostRemove.bind(this)
		this.toggleListReverse = this.toggleListReverse.bind(this)
		this.toggleSortId = this.toggleSortId.bind(this)
	}


	sortById () {
		const {items} = this.state
		let newPostList = items
		if (this.state.isOldestFirst) {
			newPostList = items.sort((a, b) => a.id < b.id)
		} else {
			newPostList = items.sort((a, b) => a.id > b.id)
		}
		this.setState({
			items: newPostList,
			isOldestFirst: !this.state.isOldestFirst
		})
	}
	toggleSortId(event) {
		this.sortById()
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
		// setTimeout(() => this.setState({ isLoading: false }), 2500); // simulates an async action, and hides the spinner
		fetch('http://underproof2017.pythonanywhere.com/api/item/')
		  .then(results => results.json())
		  .then(results => this.setState({'items':results, isLoading: false}));
	}
	render() {
		const {items, isLoading} = this.state
		if (isLoading) {
			return <p>Loading ...</p>;
		}
		return (
			<div>
				<h1>HI!</h1>
				<button className='btn btn-secondary mx-auto d-block' onClick={this.toggleListReverse}>Reverse</button>
				<button className='btn btn-info mx-auto d-block' onClick={this.toggleSortId}>SortId</button>
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
