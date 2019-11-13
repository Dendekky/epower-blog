import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SinglePage from './pages/singlepage';
import PostView from './pages/postpage';
import Footer from './pages/footer';

const App = () => <Router>
<div>
<Route path='/:slug' component={SinglePage}></Route>
<Route exact path='/' component={PostView}></Route>
</div>
<Footer />
</Router>;

export default App
