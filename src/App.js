import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './views/Main';
import Regional from './views/Regional';
import Gender from './views/Gender';
import Age from './views/Age';
import Total from './views/Total';
import './App.css';

const Routing = () => (
	<Switch>
		<Route exact path='/' component={Main} />
		<Route path='/전체' component={Total} />
		<Route path='/지역별' component={Regional} />
		<Route path='/성별' component={Gender} />
		<Route path='/연령별' component={Age} />
	</Switch>
);

class App extends Component {
	render () {
		return (
			<div className='App'>
				<Routing />
			</div>
		);
	}
}

export default App;
