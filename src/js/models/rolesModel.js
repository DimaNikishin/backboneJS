import Backbone from'backbone';


var Roles = Backbone.Model.extend({
  defaults: {
    total: 0,
    roles: [{key: "rich", title: "Rich", amount: 0}, {key: "genius", title: "Genius", amount: 0}, {key: "superpower", title: "Super power", amount: 0}]
  }
});


module.exports = Roles;