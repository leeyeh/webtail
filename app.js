
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 24601);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var log = require('./routes/log')(io);

app.get('/', routes.index);
app.get('/:key', log.show);
app.post('/:key', log.add);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
