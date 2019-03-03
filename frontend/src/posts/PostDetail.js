import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import {
	Row, Col, Card, CardBody, CardTitle, CardText, CardImg
} from "reactstrap";

import { Link } from 'react-router-dom'

class PostDetail extends Component {
	constructor (props) {
		super(props)
		this.titleWasClicked = this.titleWasClicked.bind(this)
		this.toggleContent = this.toggleContent.bind(this)
		this.removeContent = this.removeContent.bind(this)
		this.state = {
			showContent: false,
			postItem: null
		}
	}
	titleWasClicked (event) {
		event.preventDefault()
		const {dataCallback} = this.props
		let newPostItem = this.props.post
		newPostItem['title'] = "This is new Title"
		
		this.setState({
			postItem: newPostItem
		})
		if (dataCallback !== undefined) {
			dataCallback(newPostItem)	
		}			
	}
	toggleContent (event) {
		event.preventDefault()	
		this.setState({
			showContent: !this.state.showContent
		})		
	}
	removeContent (event) {
		if (this.props.didHandleRemove) {
			this.props.didHandleRemove(this.props.post)
		}	
	}
	componentDidMount() {
		const {post} = this.props
		this.setState({
			postItem: post
		})
	}
	setPostStateOnProps() {
		const {post} = this.props
		this.setState({
			postItem: post
		})
	}
	componentDidUpdate(prevProps, prevState, snapshop) {
		if (this.props !== prevProps) {			
			this.setPostStateOnProps()
		}

	}
	render () {
		const {postItem} = this.state
		const {showContent} = this.state
		return (
			<div>
				{postItem !== null 
				?<Row className="ContentItem">
					<Col xs="12" md="6">
						<Card>
							<CardImg top width="100%" src={postItem.image}>
							</CardImg>
							<CardBody>
								<CardTitle onClick={this.titleWasClicked}>
									{postItem.title}
								</CardTitle>
								{showContent === true ? <CardText>
									{postItem.description}
								</CardText> : ""}
								<button className='btn btn-info' onClick={this.toggleContent}>Toggle Content Display</button>
								<button className='btn btn-success' onClick={this.removeContent}>Remove content</button>
								<Link className='btn btn-danger' to={'/posts/' + postItem.slug}>{postItem.title}</Link>
							</CardBody>
						</Card>
					</Col>
				</Row>
				:""}
			</div>

		)
	}
}
export default PostDetail
