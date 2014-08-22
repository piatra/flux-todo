/** @jsx React.DOM */
/* jshint esnext:true */

var TodoListInput = React.createClass({displayName: 'TodoListInput',
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
      React.DOM.form({onSubmit: this.formSubmit}, 
        React.DOM.input({ref: "userInput", type: "text", placeholder: "thing to do"}), 
        React.DOM.input({type: "submit", value: "add"}), 
        React.DOM.button({onClick: this.undo}, "undo")
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

  undo: function() {
    var states = this.state.prevState;
    var lastState = states.pop();

    var currentState = JSON.parse(lastState);
    var prevState    = states;

    console.log(currentState, prevState);
    this.setState({
      "listItems": currentState,
      "prevState": prevState
    });
  },

  _undo: function() {
    while(1) {
      var prevState = this.state.prevState;
      var state = JSON.parse(prevState.pop());

      if(!prevState.length) {
        // This is the initial app state, so unconditionally apply it
        // and push it back onto the history so we don't lose it
        this.setState({"listItems": state});
        prevState.push(JSON.stringify(state));
        this.setState({"prevState": prevState});
        break;
      }
      else if(JSON.stringify(this.state.currentState) !== JSON.stringify(state)) {
        // We found a state where the feed has changed, so apply it
        this.setState({"listItems": state});
        break;
      }
    }
  },

  render: function() {
    /* jshint ignore:start */
    var createItem = function(text) { return React.DOM.li(null, text); }
    return (
      React.DOM.div(null, 
        TodoListInput({fnAddItem: this.fnAddItem, fnUndo: this._undo}), 
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