import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import poll from '../reducers';

export default function configureStore (initialState) {
	const store = createStore(
		poll,
		initialState,
		applyMiddleware(thunkMiddleware) // lets us dispatch functions
	);
	return store;
}
