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

  render() {
    const { className, input: { onChange }, meta: { error, touched }, label, classNameLabel, name, cbFunction } = this.props;
    console.log(this.props.input.value)
	let drop_class = "dropzone-field dropzone-field__default avatar"
    return (
      <div className={`${className}` + (error && touched ? ' has-error ' : '')}>
        {label && <p className={classNameLabel || ''}>{label}</p>}
        <Dropzone
          onDrop={(f) => {
            cbFunction(f);
            return onChange(f[0]);
          }}
          name={name}
          maxSize={imageMaxSize}
        >
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className={`${drop_class}`} 
                  style={{ backgroundImage: `url(${this.props.input.value})` }}>
                    <input {...getInputProps()} />
                </div>
            )}
        </Dropzone>
        {error && touched ? error : ''}
      </div>
    );
  }
}
export default props => <Field {...props} component={ImageDrop} />;