const express = require("express");
const http = require("http");
const app = express(); 
const { Server } = require('socket.io');


const server = http.createServer(app);

app.use(express.static("./public"));


const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected' , socket.id);

    socket.on("chat message" , (msg) => {
        console.log("message recieved",msg);
        io.emit("chat message",msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

app.get("/" , (req , res) => {
    return res.sendFile("./public/index.html")
})

server.listen(9000 , () => console.log("server started at port no:9000"));