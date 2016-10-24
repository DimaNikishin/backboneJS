import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';

const addPersonTemplate = require('./add.person.template.hbs');


const addPersonView = Marionette.View.extend({
  template: Handlebars.compile(addPersonTemplate),

  ui: {
    name: '.name-input',
    roles: '.person-roles',
    submit: 'form'
  },

  events: {
    'submit @ui.submit': 'addPerson'
  },

  createPersonObj(){

    let personObject = {roles:[]};
    personObject.name = this.ui.name.val();
    Array.from(this.ui.roles).forEach(roles =>{
      personObject.roles.push({key:$(roles).data('role'), value:$(roles).is(":checked")});
    });

    return personObject;
  },

  addPerson(event) {
    event.preventDefault();

    this.collection.add(this.createPersonObj());

    this.model.get('roles').forEach((role,index)=>{
      if(role.active && !$(this.ui.roles[index]).prop('checked')){
        this.triggerMethod('remove:filter');
      }
    })
  },

  onSetAcitve(){
    this.ui.roles.prop('checked', false);
    this.model.get('roles').forEach((role,index)=>{
      if(role.active){
        $(this.ui.roles[index]).prop('checked', true);
      }
    })
  }
});


export default addPersonView;
