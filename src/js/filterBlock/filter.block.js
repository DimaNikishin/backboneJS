import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';

const filterTemplate = require('./filter.block.template.hbs');


const filterView = Marionette.View.extend({
  template: Handlebars.compile(filterTemplate),

  ui: {
    filter: 'span'
  },

  events: {
    'click @ui.filter': 'filterApplied'
  },

  modelEvents: {
    'change : roles': 'setAcitveFilter'
  },

  filterApplied(event){
    this.triggerMethod("filter:collection",$(event.currentTarget).data('key'),$(event.currentTarget).data('index'));
  },

  setAcitveFilter(){
    this.ui.filter.removeClass('active');
    this.model.get('roles').forEach((role,index)=>{
      if(role.active){
        $(this.ui.filter[index]).addClass('active');
      }
    })
  }

});


export default filterView;