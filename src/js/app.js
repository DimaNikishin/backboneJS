import Marionette from 'backbone.marionette';
import Backbone from'backbone';
import MainLayout from './mainWrapp/main.layout.js';
import Roles from './models/rolesModel.js'

const usersRoles = [{key: "rich", title: "Rich"}, {key: "genius", title: "Genius"}, {key: "superpower", title: "Super power"},{key: "majestic", title: "majestic"}];
const initialRoles = {total: 0, roles: []};
const initialList = [];
initialRoles.roles = usersRoles.map((item, index) => {
  item.amount = 0;
  item.index = index;
  item.active = false;
  return item;
});


var app = new Marionette.Application({
  onStart: function() {
    var layout = new MainLayout({
      model: new Roles(initialRoles),
      collection: new Backbone.Collection(initialList)
    });
    layout.render();
  }
});

app.start(usersRoles);