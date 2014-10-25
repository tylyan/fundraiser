Events = new Meteor.Collection('events');
if (Meteor.isClient) {
  Template.current_events.helpers({
    'event': function(){
      var filter = Session.get('filter');
      console.log(filter);
      if (filter == "sponsor"){
        return Events.find({type: 'donor'});
      }else if (filter == "donor"){
        return Events.find({type: 'sponsor'});
      }else{
        return Events.find();
      }
    },

    'selectedClass': function(){
      var selectedEvent = Session.get('selectedEvent');
      var eventId = this._id;
      if (selectedEvent === eventId){
        return 'selected';
      }
    },

    'type': function(){
      var type = this.type;
      if (type == 'sponsor'){
        return 'sponsor';
      }else{
        return 'donor';
      }
    }
  });

  Template.current_events.events({
    'click li.event': function(){
        Session.set('selectedEvent', this._id);
        var selectedEvent = Session.get('selectedEvent');
        console.log(selectedEvent);
      }
  });

  Template.create_event.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.create_event.events({
    'submit': function (theEvent, theTemplate) {
      theEvent.preventDefault();
      var eventName = theTemplate.find("#event_name").value;
      var eventDescription = theTemplate.find("#event_description").value;
      var date = theTemplate.find("#date").value;
      var goal = theTemplate.find("#goal").value;
      var type;
      if (theTemplate.find("#type").checked){
        type = "sponsor";
      }else{
        type = "donor";
      }
      console.log(type);
      Events.insert({name: eventName, type: type, description: eventDescription, goal: goal, date: date, owner: Meteor.userId()});
      document.getElementById('create_event').setAttribute('class', 'invis');
      document.getElementById('event_name').value = "";
      document.getElementById('event_description').value = "";
      document.getElementById('date').value = "";
      document.getElementById('goal').value = "";
      return false;
    }
  });

  Template.control_panel.events({
    'click button#showAll': function(){
      console.log("Showing All");
      Session.set('filter', 'all');
    },

    'click button#Sponsor': function(){
      console.log("Showing donor events only");
      Session.set('filter', 'sponsor');
    },

    'click button#Donor': function(){
      console.log("Showing sponsor events only");
      Session.set('filter', 'donor');
    },

    'click button#togglecreate': function(){
      if (!Meteor.userId()){
        alert("Please log in to create an event");
        return;
      }
      var toggle = document.getElementById('create_event');
      if (toggle.hasAttribute('class')){
        toggle.removeAttribute('class');
      }else{
        toggle.setAttribute('class', 'invis');
      }
    }
  });

  Template.event_details.helpers({
    'name': function(){
      var selectedEvent = Session.get('selectedEvent');
      var currEvent = Events.find({_id: selectedEvent}).fetch();
      return currEvent[0].name;
    },
    'description': function(){
      var selectedEvent = Session.get('selectedEvent');
      var currEvent = Events.find({_id: selectedEvent}).fetch();
      return currEvent[0].description;
    },
    'goal': function(){
      var selectedEvent = Session.get('selectedEvent');
      var currEvent = Events.find({_id: selectedEvent}).fetch();
      return currEvent[0].goal;
    },
    'date': function(){
      var selectedEvent = Session.get('selectedEvent');
      var currEvent = Events.find({_id: selectedEvent}).fetch();
      return currEvent[0].date;
    },
    'owner': function(){
      var selectedEvent = Session.get('selectedEvent');
      var currEvent = Events.find({_id: selectedEvent}).fetch();
      var id = currEvent[0].owner;
      return Meteor.users.find({_id:id}).fetch()[0].emails[0].address;
    },
    'button': function(){
      var selectedEvent = Session.get('selectedEvent');
      var currEvent = Events.find({_id: selectedEvent}).fetch();
      var msg;
      if (currEvent[0].type == "sponsor"){
        msg = "Participate in this event!";
      }else{
        msg = "Sponsor this event!";
      }
      return msg;
    }
  });
  

  function partake(){
    console.log("hi");
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


