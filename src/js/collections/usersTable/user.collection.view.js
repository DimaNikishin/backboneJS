import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';

const userTemplate = require('./user.item.template.hbs');

var Users = Marionette.View.extend({
  tagName: 'tr',
  template: Handlebars.compile(userTemplate),

  ui: {
    checkbox: '.role-checkbox',
    deleteItem: '.delete-item'
  },

  events: {
    'click @ui.checkbox': 'updatedModel'
  },

  triggers: {
    'click @ui.deleteItem': 'delete:item'
  },

  createUpdatedModelObj(){
    let updatedModel = {roles:[]};
    Array.from(this.ui.checkbox).forEach(checkbox =>{
      updatedModel.roles.push({key:$(checkbox).val(), value:$(checkbox).is(":checked")});
    });
    return updatedModel;
  },

  updatedModel(){
    this.model.set(this.createUpdatedModelObj());
    this.triggerMethod("update:items");
  },

  onRender(){
    Array.from(this.ui.checkbox).forEach(checkbox =>{
      if($(checkbox).data('checked')){$(checkbox).prop('checked',true)}
    })
  }
});


var UsersTable = Marionette.CollectionView.extend({
  tagName: 'tbody',
  childView: Users,

  childViewEvents: {
    'update:items': 'itemUpdated',
    'delete:item': 'deleteItem'
  },

  itemUpdated(){
    this.triggerMethod("update:collection");
  },
  deleteItem(childView){
    this.collection.remove(childView.model);
  }
});


export default UsersTable;