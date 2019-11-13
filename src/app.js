import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SinglePage from './pages/singlepage';
import PostView from './pages/postpage';

const App = () => <Router>
<div>
<Route path='/:id' component={SinglePage}></Route>
<Route exact path='/' component={PostView}></Route>
</div>
</Router>;

export default App
