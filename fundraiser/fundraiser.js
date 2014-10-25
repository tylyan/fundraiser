Events = new Meteor.Collection('events');
if (Meteor.isClient) {

  Template.current_events.helpers({
    'event': function(){
      return Events.find();
    }
  });

  Template.form.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.form.events({
    'submit': function (theEvent, theTemplate) {
      theEvent.preventDefault();
      var eventName = theTemplate.find("#event_name").value;
      var eventDescription = theTemplate.find("#event_description").value;
      var goal = theTemplate.find("#goal").value;
      var type;
      if (theTemplate.find("#type").checked){
        type = "sponsor";
      }else{
        type = "donor";
      }
      console.log(type);
      Events.insert({name: eventName, type: type, description: eventDescription, goal: goal});
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
