"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorsList = require('./authorslist');

var Authors = React.createClass({
  getInitialState: function(){
    return{
      authors: []
    };
  },
  componentDidMount: function(){
    if(this.isMounted) {
      this.setState({authors: AuthorApi.getAllAuthors()});
    }
  },
  render: function(){
    return(
      <div>
        <h1>Authors</h1>
        <AuthorsList authors={this.state.authors} />
      </div>
    );
  }
});
module.exports = Authors;
