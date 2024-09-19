const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
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



http.listen(3000, () => 
    console.log("listening on http://localhost:3000")
)
