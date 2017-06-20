var express = require("express");
var path = require("path");
var http = require("http");
// Create our app
var app = express();

const mongoose = require("mongoose");
const jwt = require("express-jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require("./server/models/User.js");
var Friendships = require("./server/models/Friendships.js");
var rooms = require("./server/models/groupList.js");
// var server = require("http").Server(app);
// var io = require("socket.io")(server);

var server = require('http').Server(app);
var io = require('socket.io')(server);

let user_id_server;
var myuserid;
var expressSession = require("express-session");
var cookieParser = require("cookie-parser"); // the session is stored in a cookie, so we use this to parse it
var users, connections;
users = [];
connections = [];
const PORT = process.env.PORT || 3000;
server.listen(PORT);

//connect to mongoose
// session.startSession(req, res, callback);

mongoose.connect("mongodb://localhost/kola");

var db = mongoose.Connection;

// must use cookieParser before expressSession

//some other code
// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use(function(req, res, next) {
    if (req.headers["x-forwarded-proto"] === "https") {
        res.redirect("http://" + req.hostname + req.url);
    } else {
        next();
    }
});

const authCheck = jwt({
    secret: "AUTH0_CLIENT_SECRET",
    audience: "AUTH0_CLIENT_ID "
});

app.use(express.static("public"));
app.use(cookieParser());

app.use(
    expressSession({
        secret: "somesecrettokenhere",
        saveUninitialized: false,
        name: "mycookie",

        resave: false,
        cookie: {
            secure: false,
            maxAge: 6000000
        }
    })
);

app.get("/", function(req, res) {
    //Sets name=express
});

app.post("/api/user", function(req, res) {
    // console.log(req.body)
    var user = new User(req.body);
    user.obj = req.body;
    user_id_server = req.body.user_id;
    myuserid = req.body.user_id;
    // res.cookie('name', 'express').send('cookie set'); //Sets name=express
    res.cookie("name", "express");
    console.log("logging /"); //Sets name=express
    console.log(req.cookie);
    req.session.userId = req.body.user_id;

    user.uId = req.body.identities[0].user_id;
    User.find({ user_id: req.params.user_id }, function(err, docs) {
        if (docs.length) {
            // cb('Name exists already',null);
            console.log("abc");
        } else {
            user.save(function(err) {
                if (err) {
                    console.log("user exists");
                    //  return handleError(err);
                }
            });
        }
    });
});
app.post("/api/user/friendrequest", function(req, res) {
    // console.log(req.body)
    var friendship = new Friendships(req.body);
    console.log(req.body);

    Friendships.find({}, function(err, docs) {
        //         if (docs.length){
        // console.log('friendship exists');
        //         }else{
        friendship.save(function(err) {
            if (err) {
                console.log(err);
            }
        });
        //}
    });
});
//Routes
// app.get('/app', function(req, res) {
//     res.sendfile(__dirname + '/public/index.html');
// });
app.post("/api/user/myuserid", function(req, res) {
    console.log('myuserId is executed');
    var myuserid = req.body.id;
    console.log("myuserid server");
    console.log(myuserid);
});

app.post("/api/user/acceptrequestadd", function(req, res) {
    var status = req.body.status;
    console.log("status: ");
    console.log(status);
    console.log(req.body.id);

    Friendships.findOne({ other_id: req.body.id }, function(err, friendship) {
        if (!err) {
            if (!friendship) {
                friendship = new Friendships();
                friendship.status = status;
            }
            friendship.status = status;

            friendship.save(function(err) {
                if (!err) {
                    console.log("done");
                } else {
                    console.log("Error: could not save");
                }
            });
        }
    });

    // Friendships.findOneAndUpdate({other_id: req.body.id}, {$set:{status:"friend"}}, {upsert: true}, function(err, doc){
    //     if(err){
    //         console.log("Something wrong when updating data!");
    //     }

    //     console.log(doc);
    // });
});

app.get("/api/userall", function(req, res) {
    User.find({}, function(err, users) {
        var userMap = {};
        res.send(users);
    });
});
app.get("/api/user/friendrequest", function(req, res) {
    Friendships.find({}, function(err, friendship) {
        res.send(friendship);
    });
});

app.get("/api/user/acceptrequest", function(req, res) {
    Friendships.find({ status: "pending", other_id: myuserid }, function(
        err,
        friendship
    ) {
        res.send(friendship);
    });
});
// app.get("/api/user/friendlist", function(req, res) {
//   Friendships.find({ status: "friend", other_id: myuserid }, function(
//     err,
//     friendship
//   ) {
//     res.send(friendship);
//   });
// });

// app.get("/api/user/friendList", function(req, res) {
//     Friendships.find({ $or: [{ status: "friend", other_id: myuserid }, { status: "friend", user_id: myuserid }] }, function(
//         err,
//         friendship
//     ) {
//         res.send(friendship);
//     });
// });
app.get("/api/user/groupList", function(req, res) {
    rooms.find({}, function(
        err,
        rooms
    ) {
        res.send(rooms);
    });
});
// app.get("/api/user/friendlist", function(req, res) {
//   Friendships.find()
//           .or([
//               { $and: [{ status: "friend"}, {other_id: myuserid}] },
//               { $and: [{ status: "friend"}, {user_id: myuserid}] }

//           ]), function(err,   friendship ) 
//   {
//     res.send(JSON.stringify(friendship));

//   }
//   });

app.get("/api/userbyuId/:uId", function(req, res) {
    // get the user's verified from the url and find that user
    mongoose.model("User").find({ uId: req.params.uId }, function(err, User) {
        if (err) console.log(err);
        res.send(JSON.stringify(User));
    });
});

app.get("/api/user/:uId", function(req, res) {
    console.log(':uId is executed');
    // get the user's verified from the url and find that user
    console.log('This is req.params id ' + req.params.uId);
    mongoose.model("User").find({ user_id: req.params.uId }, function(err, User) {
        if (err) console.log(err);
        if (JSON.stringify(User)) {
            console.log('Does not founud');
        }
        res.send(JSON.stringify(User));
        console.log('THis is in uId ' + JSON.stringify(User));
    });
});
app.get("/api/user/:roomId", function(req, res) {
    // get the user's verified from the url and find that user
    console.log('This is req.params id in room' + req.params.roomId);
    rooms.find({ _id: req.params.roomId }, function(
        err,
        rooms
    ) {
        if (err) {
            console.log('There is an error');
        } else {
            console.log('These are rooms from database ' + rooms);
            res.send(rooms);
        }
    });
});

app.get("/api/user/:user_id", function(req, res) {
    // get the user's verified from the url and find that user
    console.log(': is executed');
    mongoose
        .model("User")
        .find({ user_id: req.params.user_id }, function(err, User) {
            if (err) console.log(err);
            res.send(JSON.stringify(User));
        });
});

app.get("/api/user", function(req, res) {
    console.log('no one is executed');
    mongoose.model("User").find(function(err, User) {
        res.send(JSON.stringify(User));
        // console.log('THis is in no one '+ JSON.stringify(User));
    });
});

app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

io.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(data) {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length)
    });

    socket.on("send message", function(data) {

        console.log('This is socket.usernmae ' + socket.username)
        console.log('This is your message to save ' + data.msg);
        console.log('This is room id in send message ' + data.roomId);
        rooms.update({ 'roomId': data.roomId }, {
                $push: {
                    conversation: {
                        from: socket.username,
                        message: data.msg
                    }
                }
            },
            function(err) {
                if (err) console.log('This is errro ' + err)
                else {
                    console.log('Successful...!')
                }
            })
        socket.emit('new message', { username: socket.username, msg: data, pic: socket.picture })
    });
    socket.on("add user", function(data) {
        console.log('This is data for add user ' + data);
        socket.username = data.userrealname;
        socket.picture = data.obj.picture;
        console.log("This is picture " + socket.picture);
        // users.push(socket.username);
        users.push({ id: socket.id, username: data, pic: data.picture });
    })
    socket.on('roomId', function(data) {
        console.log('THis is data coming from roomId ' + data);
        rooms.find({ roomId: data }, function(
            err,
            rooms
        ) {
            if (err) {
                console.log('There is an error');
            } else {
                console.log('These are rooms from database ' + rooms);
                console.log('This is for space');
                console.log('These are rooms.conversation from database ' + rooms[0].conversation);
                // console.log('This is for space');
                socket.emit('msgs', { msg: rooms[0].conversation });
                // res.send(rooms);
            }
        });
    })
    socket.on('sending', function(data) {
        console.log('THis is data coming from roomId ' + data);
        rooms.find({ roomId: data }, function(
            err,
            rooms
        ) {
            if (err) {
                console.log('There is an error');
            } else {
                console.log('These are rooms from database ' + rooms);
                console.log('This is for space');
                console.log('These are rooms.conversation from database ' + rooms[0].conversation);
                // console.log('This is for space');
                socket.emit('returnmsgs', { msg: rooms[0].conversation });
                // res.send(rooms);
            }
        });
    })

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }
});

// io.on('connection', function(socket) {
// })

// app.listen(PORT, function() {
//   console.log("Express server is up on port: " + PORT);
// });