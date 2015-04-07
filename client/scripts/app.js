// get messages from parse server
var message = {
  'username': 'glass',
  'text': 'glasses',
  'roomname': 'hr27'
};

var app = {};

app.init = function(){
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
    url: 'https://api.parse.com/1/classes/chatterbox',
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
  var $messages = $(".messages");
  for(var i = results.length-1; i >= 0 ; i--) {
    var username = results[i].username;
    var message = results[i].text;
    if(message !== undefined && username !== undefined) {
      var display = username + ": " + message;
      $messages.append("<div>" + display + "</div>");
    }
  }
};
