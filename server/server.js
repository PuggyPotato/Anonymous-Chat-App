const express  = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors")


const server = http.createServer(app);
const io  = new Server(server, {cors:{
    origin:"https://puggypotato.github.io/"
}})


io.on("connection", (socket) =>{
    console.log("A user connected!")
    socket.on("newMessage", (message) =>{
        console.log(message)
        socket.emit("newMessage",message)
    })
})


server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});