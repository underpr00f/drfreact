import React, {Component} from 'react';

import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
	Row, Col, Card, CardBody, CardTitle, CardText, 
} from "reactstrap";

// import { Link } from 'react-router-dom'

class MessageDetail extends Component {
	constructor (props) {
		super(props)
		this.state = {
			messageItem: null
		}
	}

	componentDidMount() {
		const {post} = this.props
		this.setState({
			messageItem: post
		})
	}
	setPostStateOnProps() {
		const {post} = this.props
		this.setState({
			messageItem: post
		})
	}
	componentDidUpdate(prevProps, prevState, snapshop) {
		if (this.props !== prevProps) {			
			this.setPostStateOnProps()
		}

	}
	render () {
		const {messageItem} = this.state
		return (
			<div>
				{messageItem !== null 
				?<Row className="ContentItem">
					<Col xs="12" md="6">
						<Card>
							<CardBody>
								<CardTitle>
									{messageItem.created_at}
								</CardTitle>
								<CardText>
									{messageItem.text}
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
				:""}
			</div>

		)
	}
}
export default MessageDetail
