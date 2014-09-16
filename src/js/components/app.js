/** @jsx React.DOM */

var React = require('react/addons');
var AppActions = require('../actions/app-actions');
var AppStore   = require('../stores/app-store');
var ListItemComments = require('../components/listItemComments');

var TodoListInput = React.createClass({
  formSubmit: function() {
    var value = this.refs.userInput.getDOMNode().value.trim();
    if (value) {
      AppActions.addItem(value);
      this.refs.userInput.getDOMNode().value = "";
    }
    return false;
  },

  undo: function() {
    AppActions.undo();
    return false;
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <input ref="userInput" type="text" placeholder="thing to do" />
          <input type="submit" value="add" />
          <button onClick={this.undo} >undo</button>
        </form>
      </div>
    );
    /* jshint ignore:end */
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      listItems: AppStore.getItems().listItems
    };
  },

  componentWillMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(AppStore.getItems());
  },

  toggleFavorite: function(id) {
    var item = this.getItem(id);
    item.favorite = !item.favorite;
    this.setState({listItems: this.state.listItems});
    AppActions.toggleFavorite(id);
  },

  viewItem: function(id) {
    AppActions.viewItem(id);
  },

  getItem: function(idx) {
    return this.state.listItems.filter(function(item, i) {
      if (idx == i) return item;
    })[0];
  },

  createItem: function(item, idx) {
    var itemFav = React.addons.classSet({
      "icon-favorite": true,
      "hide": !item.favorite
    });
    var itemNotFav = React.addons.classSet({
      "icon-favorite": true,
      "hide": item.favorite
    });
    /* jshint ignore:start */
    return (
      <li key={idx} onClick={this.viewItem.bind(null, idx)}>
        {item.title}
        <span onClick={this.toggleFavorite.bind(null, idx)}
              className={itemFav}>
          &#9733;
        </span>
        <span onClick={this.toggleFavorite.bind(null, idx)}
              className={itemNotFav}>
          &#9734;
        </span>
      </li>
    );
    /* jshint ignore:end */
  },

  favoriteCount: function(items) {
    return items.reduce(function(acc, curr) {
      if (curr.favorite) {
        return acc + 1;
      }
      return acc;
    }, 0);
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <TodoListInput />
        <ul>{this.state.listItems.map(this.createItem)}</ul>
        <div>{this.favoriteCount(this.state.listItems)} items favorited</div>
      </div>
    );
    /* jshint ignore:end */
  }
});

var App = React.createClass({
  render: function() {
    /* jshint ignore:start */
    return (
      <div className="container">
        <div className="column-30">
          <h1>Todo</h1>
          <div className="list">
            <ul className="list-element-container">
              <TodoList listItems={AppStore.getItems().listItems} />
            </ul>
          </div>
        </div>
        <div className="comments column-70">
          <h1>Comments</h1>
          <ListItemComments />
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = App;
