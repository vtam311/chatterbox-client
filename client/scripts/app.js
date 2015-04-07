
var me = {
  'username': 'glass',
  'text': 'glasses',
  'roomname': 'hr27'
};


var app = {};
app.friends = {};

$(document).ready(function(){

  //Create add friend functionality
  $(document).on('click', '.username', function(){
    var username = $(this).text();
    app.addFriend(username);

  });


  // on submit
  $(document).on('click', '.buttonSubmit', function(){
    var inputText = $(".inputText").val();
    console.log("input:" + inputText);
    me.username = me.username;
    me.text = inputText;
    me.roomname = me.roomname;
    app.addMessage();
  });


  app.init();

});


app.init = function(){
  app.fetch();

  // setInterval(function(){
  //   app.clearMessages();
  //   app.fetch();

  // }, 5000);
};


app.send = function(me){

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(me),
    contentType: 'application/json',
    success: function (data) { // check later, is 'data' the server response?
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    data: JSON.stringify(me),
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
      $messages.append(
        '<div><span class="username">' + username + "</span>: " + message + "</div>"
      );
    }
  }
};

app.clearMessages = function() {
  $('#chats').html("");
};

app.addMessage = function() {
  var $messages = $('#chats');
  $messages.append(
    '<div><span class="username">' + me.username + "</span>: " + me.text + "</div>"
  );
  app.send(me);

};

app.addRoom = function(room) {
  $("#roomSelect").append("<div>" + room + "</div>");
};

app.addFriend = function(friend){
  app.friends[friend] = true;
};
