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
    // call this function whenever the button add a room is clicked
    $('#roomSelect').append('<option>' + JSON.stringify(roomName) + '</option>');
  };

  app.handleUsernameClick = function() {
    // 
  };

  var formInput = $(function() {
    $('#send').on('submit', function(e) {
      e.preventDefault();
      var data = $('#send :input').serialize();
      console.log(data);
      return data;
    });
  });
  

  app.handleSubmit = function() {
    // find the message in the form 
    console.log(formInput);
    // $("form#send")
    // var message = document.getElementById("send");
    // console.log(message);
    // // find the username from the url
    // var username = window.location.search.slice(window.location.search.indexOf('=') + 1, window.location.search.length);
    // find the room from the choice option
    // call app.send() to send to server
    // call render message to show message on site
  };








