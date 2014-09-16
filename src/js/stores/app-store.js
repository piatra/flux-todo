/* globals require, module, strict: true */
/* jshint -W097 */
"use strict";

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _items = [{
  title: "My todo item",
  favorite: true,
  comments: [
    {content: "this is very important has to be completed asap"}
  ],
  selected: false
}];

var _prevState = [];

/**
 * @param {string} value Text content of the new todo item
 * */
function _addItem(value) {
  _prevState.push(_items.slice(0));
  _items.push({title: value, favorite: false, comments: [], selected: false});
}

function _undo() {
  var prevState = _prevState.slice(0);

  _items = prevState.pop() || [];
  _prevState = prevState;
}

function _viewItem(id) {
  _getSelectedItem().selected = false;
  _items[id].selected = true;
}

function _getSelectedItem() {
  return _items.filter(function(item) {
    return item.selected;
  })[0] || _items[0];
}

function _saveItemComment(comment) {
  _getSelectedItem().comments.push({
    content: comment
  });
}

var AppStore = merge(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  /**
   * @returns {Object} comments
   * */
  getSelectedItemComments: function() {
    return {comments: _getSelectedItem().comments};
  },

  getItems: function() {
    return {listItems: _items};
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.value);
        break;
      case AppConstants.UNDO:
        _undo();
        break;
      case AppConstants.VIEW_ITEM:
        _viewItem(payload.action.item);
        break;
      case AppConstants.SAVE_COMMENT:
        _saveItemComment(payload.action.comment);
        break;
    }

    AppStore.emitChange();

    return true;
  })
});
module.exports = AppStore;
