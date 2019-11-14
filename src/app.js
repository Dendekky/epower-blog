import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SinglePage from './pages/singlepage';
import PostView from './pages/postpage';

const App = () => <Router>
<div>
<Route path='/:slug' component={SinglePage}></Route>
<Route exact path='/' component={PostView}></Route>
</div>
</Router>;

export default App
