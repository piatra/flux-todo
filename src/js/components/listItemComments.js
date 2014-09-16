/** @jsx React.DOM */

/* globals require, module */
/* jshint -W097 */

"use strict";
var React = require('react/addons');
var AppActions = require('../actions/app-actions');
var AppStore   = require('../stores/app-store');

var ListItemComments = React.createClass({

  getInitialState: function() {
    return AppStore.getSelectedItemComments();
  },

  componentWillMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(AppStore.getSelectedItemComments());
  },

  renderCommentMarkup: function(comment) {
    /* jshint ignore:start */
    /* jshint ignore:end */
  },

  _submitForm: function() {
    var textareaDOMNode = this.refs.textarea.getDOMNode();
    AppActions.saveComment(textareaDOMNode.value);
    textareaDOMNode.value = "";
    return false;
  },

  render: function() {
    /* jshint ignore:start */
    var comments = this.state.comments.map(function(comment) {
      return <li>{comment.content}</li>;
    })
    return (
      <ul>
        {comments}
        <form onSubmit={this._submitForm}>
          <textarea ref="textarea" rows="20" cols="60"></textarea>
          <button type="submit">save</button>
        </form>
      </ul>
    );
    /* jshint ignore:end */
  }
});

module.exports = ListItemComments;
