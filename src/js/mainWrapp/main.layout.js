import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';
import addPersonView from '../addPersonBlock/add.person.js';
import sideContentView from '../sideContentBlock/side.content.js';
import userTableView from '../userTableBlock/user.table.js';
import filterView from '../filterBlock/filter.block.js';
import UsersTable from '../collections/usersTable/user.collection.view.js'

const mainLayoutTemplate = require('./main.layout.template.hbs');

const MainLayout = Marionette.View.extend({
  template: Handlebars.compile(mainLayoutTemplate),

  regions: {
    addPeson: '.add-person-block',
    sideContent: '.side-content',
    userTable: '.user-table',
    filter: '.filter-block'
  },

  el: "#container",

  collectionEvents: {
    add: 'itemAdded',
    update: 'itemAdded'
  },

  childViewEvents: {
    'update:collection': 'itemAdded',
    'filter:collection': 'setFilter',
    'remove:filter': 'removeFilter'
  },

  createStatisticObj(){
    let updatedModelObject = {roles:[]};
    updatedModelObject.total = this.collection.length;
    this.model.get('roles').forEach((role,index,array)=>{
      updatedModelObject.roles.push({key: role.key, title: role.title, amount: 0, index: index, active: role.active});
      this.collection.models.forEach(model=>{
        if( model.get('roles')[index].value){
          updatedModelObject.roles[index].amount +=1;
        }
      })
    });
    return updatedModelObject;
  },

  updateFilter(index){
    let updatedModelRolesObject = [];
    this.model.get('roles').forEach((role,i,array)=>{
      updatedModelRolesObject.push({key: role.key, title: role.title, amount: role.amount, index: i, active: false});
    });
    if(index !== undefined){
      updatedModelRolesObject[index].active = true;
    }
    this.model.set('roles', updatedModelRolesObject);
  },


  itemAdded(){
    this.model.set(this.createStatisticObj());
  },

  setFilter(filter,index){
    this.getChildView('userTable').getChildView('body').setFilter((child,i,array)=>{
      return child.get('roles')[index].value;
    });

    this.updateFilter(index);
    this.getChildView('addPeson').triggerMethod('set:acitve');
  },

  removeFilter(){
    this.getChildView('userTable').getChildView('body').removeFilter();
    this.updateFilter();
    this.getChildView('addPeson').triggerMethod('set:acitve');
  },

  onRender() {
    const addPerson = new addPersonView({model: this.model, collection:this.collection});
    const sideContent = new sideContentView({model: this.model});
    const userTable = new userTableView({model: this.model, collection:this.collection});
    const filter = new filterView({model: this.model});

    this.showChildView('addPeson', addPerson);
    this.showChildView('sideContent', sideContent);
    this.showChildView('userTable', userTable);
    this.showChildView('filter', filter);
  }
});


export default MainLayout;