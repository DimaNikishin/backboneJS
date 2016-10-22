import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';
import UsersTable from '../collections/usersTable/user.collection.view.js'

const userTableTemplate = require('./user.table.template.hbs');

function setupSortOpt(sortedBy, sortObj){
  if(sortedBy === sortObj.prevSort){
    sortObj.decrease = !sortObj.decrease;
  }else{
    sortObj.decrease = false;
    sortObj.prevSort = sortedBy;
  }
}

function returnCorrectFunc(index,sortObj){
  if(index !== undefined){
    if(!sortObj.decrease){
      return sortFunctions.decreasePropSort.bind(null, index);
    }else{
      return sortFunctions.increasePropSort.bind(null, index);
    }
  }else{
    if(!sortObj.decrease){
      return sortFunctions.decreaseNameSort;
    }else{
      return sortFunctions.increaseNameSort;
    }
  }
}

const sortFunctions = {
  decreaseNameSort(modelA,modelB){
    if (modelA.get('name') > modelB.get('name')){
      return 1;
    }else if (modelB.get('name') > modelA.get('name')){
      return -1;
    }else{
      return 0;
    }
  },
  increaseNameSort(modelA,modelB){
    if (modelA.get('name') > modelB.get('name')){
      return -1;
    }else if (modelB.get('name') > modelA.get('name')){
      return 1;
    }else{
      return 0;
    }
  },
  decreasePropSort(index,modelA,modelB){
    if (modelA.get('roles')[index].value > modelB.get('roles')[index].value){
      return -1;
    }else if (modelB.get('roles')[index].value > modelA.get('roles')[index].value){
      return 1;
    }else{
      return 0;
    }
  },
  increasePropSort(index,modelA,modelB){
    if (modelA.get('roles')[index].value > modelB.get('roles')[index].value){
      return 1;
    }else if (modelB.get('roles')[index].value > modelA.get('roles')[index].value){
      return -1;
    }else{
      return 0;
    }
  }
};

const sortWith = (function(){
  let sortObj = {
    prevSort: '',
    decrease: false
  };

  return function(sortedBy,index){
    setupSortOpt(sortedBy,sortObj);
    return returnCorrectFunc.call(null,index,sortObj);
  };

})();


const userTableView = Marionette.View.extend({
  template: Handlebars.compile(userTableTemplate),

  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },

  ui: {
    tableHeader: '.sort'
  },

  events: {
    'click @ui.tableHeader': 'applySort'
  },

  childViewEvents: {
    'update:collection': 'update'
  },

  applySort(event){

    this.collection.comparator = sortWith($(event.target).data('attr'),$(event.target).data('index'));
    this.collection.sort();
  },

  update(){
    this.triggerMethod("update:collection");
  },

  onRender() {
    this.showChildView('body', new UsersTable({
      collection: this.collection
    }));
  }
});


export default userTableView;