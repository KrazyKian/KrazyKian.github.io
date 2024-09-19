// const app = require("express")();
import express from 'express'
const app = express()
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

let count=1

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", function(socket) {
    console.log("socket connected");
    socket.on("message", (message)=>{
        console.log("recieved " + message);
        count++;
        io.emit("message", "the count is " + count);
    })
});



httpServer.listen(3000, () => 
    console.log("listening on http://localhost:3000")
)
