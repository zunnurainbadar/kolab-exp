var express = require('express');
var connections = [];
var users = [];
// Create our app
var app = express();

app.use(function(req,res,next)
{
if(req.headers['x-forwarded-proto']=== 'https')
{
  res.redirect('http://' + req.hostname + req.url);

} else {
next();

}
});


app.use(express.static('public'));

const PORT = process.env.PORT || 3000;


var server = app.listen(PORT);
io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){

    socket.once('disconnect',function(){
        for(var i=0;i<users.length;i++){
            if(users[i].id == this.id){
                users.splice(i, 1);
            }
        }
        connections.splice(connections.indexOf(socket),1);
        socket.disconnect();
    console.log('DisConnected: %s sockets Connected', connections.length);
    io.emit('disconnect',users);
    });
    socket.on('messageAdded',function(payload){
        var newMessage = {
            timeStamp:payload.timeStamp,
            text:payload.text,
            user: payload.user
        }

        io.emit('messageAdded', newMessage);
    });

     socket.on('userJoined',function(payload){
        var newUser = {
            id:this.id,
            name:payload.name
        }
        users.push(newUser);
        io.emit('userJoined', users);
        console.log('User Joined:'+payload.name);
    });

    connections.push(socket);
    console.log('Connected: %s sockets Connected', connections.length);
});
console.log('server is running on ' +PORT);
