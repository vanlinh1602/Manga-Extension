import ReactDOM from 'react-dom';
import React = require('react');
import Popup from './popup';

// This is a home page extension

ReactDOM.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>,
	document.getElementById('root')
);
