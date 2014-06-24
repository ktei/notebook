define(['require', 'jquery', 'knockout', 'markdown', 'bootbox'], function(require) {
  var $ = require('jquery');
  var ko = require('knockout');
  var bootbox = require('bootbox');

  var TabViewModel = function(tab) {
    var self = this;
    this.id = tab._id;
    this.name = tab.name;
    this.active = ko.observable(false);
    this.activate = function() {
      self.active(true);
    };
    this.deactivate = function() {
      self.active(false);
    };
  };

  return function(activeTabId) {
    var self = this;
    this.tabs = ko.observableArray();
    this.status = ko.observable('idle');
    this.items = ko.observableArray();
    this.activeTab = null;
    this._loadItems = function(items) {
      self.items.removeAll();
      ko.utils.arrayForEach(items, function(item) {
        self.items.push($.extend(item, {
            html: markdown.toHTML(item.content),
            edit: function() {
              window.location.href = '/tabs/' + self.activeTab.id + '/items/' + item._id;
            },
            trash: function() {
              bootbox.confirm('Are you sure to delete this?', function(result) {
                if (result) {
                  alert('deleting...');
                }
              });
            }
          })
        );
      });
    };
    this._fetchItems = function(tabId) {
      self.status('loading items');
      $.getJSON('/api/tabs/' + tabId + '/items', function(res) {
        if (res.success) {
          self._loadItems(res.data);
        } else {
          alert(res.message);
        }
      })
      .always(function() {
        self.status('idle');
      });
    };
    this.activate = function(tab) {
      if (!tab.isButton) {
        ko.utils.arrayForEach(self.tabs(), function(item) {
          item.deactivate();
        });
      }
      tab.activate();
      if (!tab.isButton) {
        self.activeTab = tab;
        self._fetchItems(tab.id);
      }
    };
    this.addItem = function() {
      if (self.activeTab) {
        window.location.href = '/tabs/' + self.activeTab.id + '/items/create';
      }
    };
    this._findTabById = function(id) {
      var tabs = self.tabs();
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id == id) {
          return tabs[i];
        }
      }
      return null;
    };
    this._createAddTabViewModel = function() {
      var tab = new TabViewModel({ id: -1, name: '+' });
      tab.activate = function() {
        $('#create-tab-modal').modal('show');
      };
      tab.isButton = true;
      return tab;
    };
    this._load = function(tabs) {
      self.tabs.removeAll();
      ko.utils.arrayForEach(tabs, function(item) {
        var tab = new TabViewModel(item);
        self.tabs.push(tab);
      });
      if (tabs.length == 0) {
        return;
      }
      self.tabs.push(self._createAddTabViewModel());
      if (activeTabId) {
        var foundTab = self._findTabById(activeTabId);
        if (foundTab) {
          self.activate(foundTab);
        }
      } else {
        self.activate(self.tabs()[0]);
      }
    };
    this.fetch = function() {
      self.status('loading');
      $.getJSON('/api/tabs', function(res) {
        if (res.success) {
          self._load(res.data);
        } else {
          alert(res.message);
        }
      })
      .fail(function() {

      })
      .always(function() {
        self.status('idle');
      })
    };
  };
});
