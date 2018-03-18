/* eslint-disable no-unused-vars */
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import 'semantic-ui-css/semantic.min.css';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';


import Greeting from './Main/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import mainReducer from './Main/Reducers/App.reducer';
import rootEpic from './Main/Middleware/App.epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
	mainReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
);

ReactDOM.render(
	<Provider store={store}>
		<Greeting isLoggedIn={false} />
	</Provider>,
	document.getElementById('root')
);


registerServiceWorker();
