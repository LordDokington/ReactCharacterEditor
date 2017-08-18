import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import CharacterView from './views/characterView/characterView';
import TimelineView from './views/timelineView/timelineView';
import PlacesView from './views/placesView/placesView';

import 'file-loader?name=[name].[ext]!./index.html';

const NotFound = () => (<h1>Your everyday-joe's 404 page not found notification</h1>);

// TODO: Site(CharacterView), etc.
const App = () => (
	<Router history={hashHistory} >	
		<Route path="/characters" component={ CharacterView }/>
		<Route path="/timeline" component={TimelineView}/>
		<Route path="/places" component={PlacesView}/>
		<Route path='*' component={NotFound} />		
	</Router>
);

ReactDOM.render(<App />, document.getElementById("main"));

