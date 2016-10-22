import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';

const sideContentTemplate = require('./side.content.template.hbs');


const sideContentView = Marionette.View.extend({

  template: Handlebars.compile(sideContentTemplate),

  modelEvents: {
    change: 'renderStatistic'
  },

  ui: {
    filter: '.properties',
    removeFilter: '.total-statistic'
  },

  events: {
    'click @ui.filter': 'filterApplied'
  },

  triggers: {
    'click @ui.removeFilter': 'remove:filter'
  },

  filterApplied(event){
    event.preventDefault();
    this.triggerMethod("filter:collection",$(event.currentTarget).data('key'),$(event.currentTarget).data('index'));
  },

  renderStatistic(){
    this.render();
  }

});


export default sideContentView;