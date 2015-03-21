require('lib/view_helper');

// Base class for all views
module.exports = Backbone.View.extend({

  data: {},

  initialize: function () {
    this.render = _.bind(this.render, this);
    this.render();
  },

  template: function () {

  },

  serialize: function () {
    return this.data;
  },

  beforeRender: function () {

  },

  render: function () {
    this.beforeRender();
    this.$el.html(this.template(this.serialize()));
    this.afterRender();
    return this;
  },

  afterRender: function () {

  }

});
