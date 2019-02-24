import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

const imageMaxSize = 10000000; //bytes

class FileDrop extends Component {

	onDrop = (acceptedFiles, rejectedFiles) => {
		// console.log(acceptedFiles, rejectedFiles)
		this.props.onSelectDrop(acceptedFiles);
	}
	render () {
		return (
		  <div>
		    <Dropzone
	            onDrop={this.onDrop}		            
	            multiple={false}
	            maxSize={imageMaxSize}
	            >
	                {({getRootProps, getInputProps}) => (
	                    <div {...getRootProps()} className="dropzone-field">
	                        <input {...getInputProps()} />
	                       	<div>
	                       		<FontAwesomeIcon icon={faFileUpload} color="white"/>
								{this.props.documents ? 
									this.props.detail ? 
										this.props.documents === this.props.detail ?
											"  Replace Document"
										:  "  Save to Attach"
									: "  Save to Attach"
								: "  Add Document"}
							</div>
	                    </div>
	                )}
			</Dropzone>﻿
		  </div>
		  )
	}
}
export default FileDrop