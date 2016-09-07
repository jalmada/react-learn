"use strict";
var divStyle = {height:'20px', width:'20px'};
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link to="home" className="navbar-brand">
            <img src="images/pluralsight-logo.png" style={divStyle} />
          </Link>
          <ul className="nav navbar-nav">
            <li><Link to="home">Home</Link></li>
            <li><Link to="authors">Authors</Link></li>
            <li><Link to="about">About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
