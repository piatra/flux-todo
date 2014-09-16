/** @jsx React.DOM */

var React = require('react/addons');
var App = require('./components/app');

React.renderComponent(
  /* jshint ignore:start */
  <App />,
  document.querySelector('#app')
  /* jshint ignore:end */
);
