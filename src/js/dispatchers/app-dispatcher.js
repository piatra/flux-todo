var merge = require('react/lib/merge');
var Dispatcher = require('./dispatcher.js');

var AppDispatcher = merge(Dispatcher.prototype, {
  handleViewAction: function(action) {
    console.log(action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
