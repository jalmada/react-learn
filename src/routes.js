"use strict";

var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var Redirect = ReactRouter.Redirect;

var App = require('./components/app');
var Home = require('./components/homepage');
var About = require('./components/about/aboutpage');
var Authors = require('./components/authors/authorPage');
var NotFoundPage = require('./components/404');

function question(nextState, replace, callback){
  if (!confirm("Si o no?")) {
    replace({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    });
  }
  callback();
}

function question2(prevState){
  if(!confirm("Wanna Leave?"))
  {
    return false;
  }
}

var Routes = React.createClass({
  render: function(){
    return(<Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute  component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About} onLeave={question2}/>
        <Route path="/authors" component={Authors} onEnter={question}/>
        <Redirect from="/about-us" to='/about'/>
        <Redirect from="/about-us/*" to='/about'/>
        <Route path="*" component={NotFoundPage}  />
      </Route>
  </Router>)
  }
});

module.exports = Routes;
