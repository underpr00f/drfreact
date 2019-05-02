import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const imageMaxSize = 10000000; //bytes

class FileDrop extends Component {

	onDrop = (acceptedFiles, rejectedFiles) => {
		// console.log(acceptedFiles, rejectedFiles)
		this.props.onSelectDrop(acceptedFiles);
	}
	dropProperties = (documents, detail) => {
		let drop_class, drop_text
		if (documents) {
			if (detail) {
				if (documents === detail) {
				  drop_class = "dropzone-field dropzone-field__default"
				  drop_text = "  Replace Document"					
				} else {
				  drop_class = "dropzone-field dropzone-field__success";
			  	  drop_text = "  Save to Attach";
				}
			} else {
				drop_class = "dropzone-field dropzone-field__success";
				drop_text = "  Save to Attach";
			}
		} else {
			drop_class = "dropzone-field dropzone-field__default";
			drop_text = "  Add Document"
		} 
		return {drop_class: drop_class, drop_text: drop_text}
	}
	render () {
		
		const { documents, detail } = this.props;
		const drop_properties = this.dropProperties(documents, detail)

		return (
		  <div>Documents:
            <span className="document-title">{detail !== "null" ? " ("+detail.split("/").slice(-1)[0]+")" : ""}</span>
		    <Dropzone
	            onDrop={this.onDrop}		            
	            multiple={false}
	            maxSize={imageMaxSize}
	            >
	                {({getRootProps, getInputProps}) => (
	                    <div {...getRootProps()} className={`${drop_properties.drop_class}`}>
	                        <input {...getInputProps()} />
	                       	<div>
	                       		<FontAwesomeIcon icon={faFileUpload} color="white"/>
	                       			<span className="dropzone-field__text">{`${drop_properties.drop_text}`}</span>
							</div>
	                    </div>
	                )}
			</Dropzone>﻿
		  </div>
		  )
	}
}
export default FileDrop