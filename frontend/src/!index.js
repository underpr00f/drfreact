import React from 'react';
import ReactDOM from 'react-dom';
import DrfReact from './App'
// import ReactifyDjango from './Reactify'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


registerServiceWorker();
// let wrapper = document.getElementById('root')
// wrapper ? ReactDOM.render(<DrfReact />, wrapper) : null;

let myComponent = document.getElementById('root')
if (myComponent !== null){
    ReactDOM.render(<DrfReact />,myComponent);
}

// let myComponent2 = document.getElementById('reactify-django-ui')
// if (myComponent2 !== null){
//     ReactDOM.render(<ReactifyDjango />,myComponent2);
// }

// class DrfReact extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<PostList />
// 			</div>
// 		);
// 	}
// }

// ReactDOM.render(<DrfReact />, document.getElementById('root'));
// registerServiceWorker();
