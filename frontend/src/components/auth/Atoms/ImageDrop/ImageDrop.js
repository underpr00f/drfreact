import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from "prop-types";
// import { Form } from 'elements';
import { Field } from 'redux-form';
import './styles.scss'

const imageMaxSize = 1000000; //bytes

class ImageDrop extends Component {
  static propTypes = {
    dropzone_options: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    input: PropTypes.object,
    className: PropTypes.string,
    // children: PropTypes.node,
	//    children: PropTypes.oneOfType([
	//      PropTypes.node,
	//   PropTypes.object,
	//   PropTypes.func,
	// ]),
    cbFunction: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    cbFunction: () => {},
  };
  state = { attached: false };
  handleDrop = (files) => {
	console.log("DROPPED!", files)
	this.setState({attached: true})
	// this.props.onSelectDrop(files);
  }
  render() {
    const { className, input: { onChange }, meta: { error, touched }, label, classNameLabel, name, cbFunction } = this.props;
    console.log(this.props.input.value)
	let drop_class = "dropimage-field dropimage-field__default avatar"
	let drop_text = ""

	if (this.props.input.value && this.state.attached) {
		drop_class = "dropimage-field dropimage-field__success";
		drop_text = "Press Save to Add";
	} else {
		drop_class = "dropimage-field dropimage-field__default avatar";
		// drop_text = "Add Document"
	} 
    return (
      <div className={`${className}` + (error && touched ? ' has-error ' : '')}>
        {label && <p className={classNameLabel || ''}>{label}</p>}
        <Dropzone
          onDrop={(f) => {
            cbFunction(f);
            this.handleDrop(f);
            return onChange(f[0]);
          }}
          name={name}
          maxSize={imageMaxSize}
        >
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className={`${drop_class}`} 
                  style={{ backgroundImage: `url(${this.props.input.value})`}}>
                    <input {...getInputProps()} />
                    <span className="dropimage-field__text">{`${drop_text}`}</span>
                </div>
            )}
        </Dropzone>
        {error && touched ? <div className="alert alert-danger p-1"><small>{error}</small></div> : ''}
      </div>
    );
  }
}
export default props => <Field {...props} component={ImageDrop} />;