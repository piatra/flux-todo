/** @jsx React.DOM */
/* jshint esnext:true */

var TodoListInput = React.createClass({
  formSubmit: function() {
    var value = this.refs.userInput.getDOMNode().value.trim();
    this.props.fnAddItem(value);
    this.refs.userInput.getDOMNode().value = "";
    return false;
  },

  undo: function() {
    this.props.fnUndo();
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <input ref="userInput" type="text" placeholder="thing to do" />
          <input type="submit" value="add" />
        </form>
        <button onClick={this.undo} >undo</button>
      </div>
    );
    /* jshint ignore:end */
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      listItems: [],
      prevState: [],
      test: [1]
    };
  },

  fnAddItem: function(value) {
    var items = this.state.listItems;

    this._setPrevState(items);

    items.push({title: value});
    this.setState({listItems: items});
  },

  _setPrevState: function(state) {
    var prev = this.state.prevState;
    prev.push(JSON.stringify(state));
    this.setState({"prevState": prev});
  },

  undo: function() {
    var prevState = this.state.prevState.slice(0);
    var currentState = JSON.parse(prevState.pop());

    this.setState({
      listItems: currentState,
      prevState: prevState
    });
  },

  render: function() {
    /* jshint ignore:start */
    var createItem = function(text) { return <li>{text}</li>; }
    return (
      <div>
        <TodoListInput fnAddItem={this.fnAddItem} fnUndo={this.undo} />
        <ul>{this.state.listItems.map(createItem)}</ul>
      </div>
    );
    /* jshint ignore:end */
  }
});

var App = React.createClass({
  render: function() {
    /* jshint ignore:start */
    return (
      <TodoList />
    );
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
React.renderComponent(
  <App listItems={[]} />,
  document.querySelector('.list')
);
/* jshint ignore:end */
