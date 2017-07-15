var app = {};

app.init = function() {
  $('.username').on('click', app.handleUsernameClick);
  $('#send .submit').submit(app.handleSubmit);
};

app.send = function(message) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function(link) {
  $.ajax({
    url: link, 
    type: 'GET',
    success: function () {
      console.log('chatterbox: Message received');
    },
    error: function () {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  $('#chats').append('<p> <span class ="username">' + 
JSON.stringify(message['username']) + '</span> <span class = "message">' + 
JSON.stringify(message['text']) + '</span> <span class = "roomname">' + 
JSON.stringify(message['roomname']) + '</span> </p>');
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<p>' + JSON.stringify(roomName) + '</p>');
};

app.handleUsernameClick = function() {
};

app.handleSubmit = function() {

};








