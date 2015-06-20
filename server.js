var hapi = require('hapi')
  , Path = require('path');

var server = new hapi.Server();
server.connection({
  port: 8080
, host: 'localhost'
});

var io = require('socket.io')(server.listener);

server.route({
  path: '/{filename?}'
, method: 'GET'
, handler: function(req, reply){
    var filename = req.params.filename || 'index.html';
    reply.file(Path.join(__dirname, 'public', filename));
  }
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('sent', msg);
  });
});

server.start(function(){
  console.info('Server on');
});
