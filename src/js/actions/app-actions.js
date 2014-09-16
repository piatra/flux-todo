var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  viewItem: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.VIEW_ITEM,
      item: id
    });
  },
  saveComment: function(comment) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_COMMENT,
      comment: comment
    });
  },
  addItem: function(value) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      value: value
    });
  },
  toggleFavorite: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.TOGGLE_FAVORITE,
      item: id
    });
  },
  undo: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UNDO
    });
  }
};

module.exports = AppActions;
