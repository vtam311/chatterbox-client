// get messages from parse server
var message = {
  'username': 'glass',
  'text': 'glasses',
  'roomname': 'hr27'
};



var app = {};

$(document).ready(function(){
  app.init();

});


app.init = function(){
  setInterval(function(){
    app.clearMessages();
    app.fetch();
  }, 5000);
};


app.send = function(message){

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) { // check later, is 'data' the server response?
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: displayMessages,
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

};

var displayMessages = function(data) {
  var results = data.results;
  var $messages = $("#chats");
  for(var i = results.length-1; i >= 0 ; i--) {
    var username = results[i].username;
    var message = results[i].text;
    if(message !== undefined && username !== undefined) {
      var display = username + ": " + message;
      $messages.append("<div>" + display + "</div>");
    }
  }
};

app.clearMessages = function() {
  $('#chats').html("");
};

app.addMessage = function(message) {
  var $messages = $('#chats');
  $messages.append("<div>" + message.username +
    ": " + message.text + "</div>");
};

app.addRoom = function(room) {
  $("#roomSelect").append("<div>" + room + "</div>");
};
