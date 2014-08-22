/** @jsx React.DOM */
/* jshint esnext:true */

var TodoListInput = React.createClass({displayName: 'TodoListInput',
  formSubmit: function() {
    var value = this.refs.userInput.getDOMNode().value.trim();
    this.props.fnAddItem(value);
    this.refs.userInput.getDOMNode().value = "";
    return false;
  },

  render: function() {
    /* jshint ignore:start */
    return (
      React.DOM.form({onSubmit: this.formSubmit}, 
        React.DOM.input({ref: "userInput", type: "text", placeholder: "thing to do"}), 
        React.DOM.input({type: "submit", value: "add"}), 
        React.DOM.button(null, "undo")
      )
    );
    /* jshint ignore:end */
  }
});

var TodoList = React.createClass({displayName: 'TodoList',
  getInitialState: function() {
    return {
      listItems: [],
      prevState: []
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

  render: function() {
    console.log(this.state.listItems, this.state.prevState);
    /* jshint ignore:start */
    var createItem = (text) => React.DOM.li(null, text);
    return (
      React.DOM.div(null, 
        TodoListInput({fnAddItem: this.fnAddItem}), 
        React.DOM.ul(null, this.state.listItems.map(createItem))
      )
    );
    /* jshint ignore:end */
  }
});

var App = React.createClass({displayName: 'App',
  render: function() {
    /* jshint ignore:start */
    return (
      TodoList(null)
    );
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
React.renderComponent(
  App({listItems: []}),
  document.querySelector('.list')
);
/* jshint ignore:end */
