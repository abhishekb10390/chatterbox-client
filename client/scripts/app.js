  var app = {};

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  var escapeHtml = function (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  };

  app.init = function() {
    $('.username').on('click', app.handleUsernameClick);
    var allMessages = app.fetch();
    setTimeout(function() { 
      cleanedMessages = allMessages.responseJSON.results;
      var rooms = [];
      $('#roomSelect option').each(function() {
        rooms.push($(this).val());
      });
      for (var i = 0; i < cleanedMessages.length; i++) {
        if (cleanedMessages[i]['roomname'] !== undefined && cleanedMessages[i]['username'] !== undefined && cleanedMessages[i]['text'] !== undefined){
          if (rooms.indexOf(cleanedMessages[i]['roomname']) === -1) {
            $('#roomSelect').append('<option value=' + escapeHtml(cleanedMessages[i]['roomname']) + '>' + escapeHtml(cleanedMessages[i]['roomname']) + '</option>');
            rooms.push(cleanedMessages[i]['roomname']);
          }
          app.renderMessage(cleanedMessages[i]);
        }
      }
    }, 1000);
  };

  $(function() {
    $('#roomSelect').on('change', function() {
      var currRoom = $('#roomSelect').find(':selected').text()
      app.renderRoom(currRoom);
    });
  });


  $(function() {
    $('#send').on('submit', function(e) {
      e.preventDefault();
      var data = $('#send input').val();
      app.handleSubmit(data);
    });
  });

  $(function() {
    $('#newroomform button').on('click', function(e) {
      e.preventDefault();
      var data = $('#newroomform input').val();
      app.addRoom(data);
    });
  });
  
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

  app.fetch = function() {
    return $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', 
      type: 'GET',
      data: 'order=-createdAt',
      dataType: 'JSON',
      contentType: 'json',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.renderMessage = function(message) {
    var name = escapeHtml(message.username);
    var mess = escapeHtml(message.text);
    var room = escapeHtml(message.roomname);
    $('#chats').append(`<p> <span class="username">
    ${name}</span> <span class="message">${mess}</span></p>`);
  };

  app.renderRoom = function(roomName) {
    app.clearMessages();
    var allMessages = app.fetch();
    setTimeout(function() { 
      for (var i = 0; i < cleanedMessages.length; i++) {
        if (cleanedMessages[i]['roomname'] !== undefined && cleanedMessages[i]['username'] !== undefined && cleanedMessages[i]['text'] !== undefined){
          if (cleanedMessages[i]['roomname'] === roomName) {
            app.renderMessage(cleanedMessages[i]);
          }
        }
      }
    }, 1500);
  };

  app.addRoom = function(roomName) {
    $('#roomSelect').append('<option>' + escapeHtml(roomName) + '</option>');
  };

  app.handleUsernameClick = function() {
    //
  };

  app.handleSubmit = function(message) {
    var messageObject = {};
    message = message.slice(message.indexOf('=') + 1, message.length);
    messageObject['text'] = message;
    messageObject['username'] = window.location.search.slice(window.location.search.indexOf('=') + 1, window.location.search.length);
    messageObject['roomname'] = $('#roomSelect').find(':selected').text();
    app.send(messageObject);
    $('#chats').prepend(`<p> <span class="username">
    ${messageObject['username']}</span> <span class="message">${messageObject['text']}</span></p>`);  };

  app.init();



