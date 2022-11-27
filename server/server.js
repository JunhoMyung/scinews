const app = require("express")();
const http = require("http").createServer(app);
let io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
const connection = require("./router/connection");
app.use("/connection", connection);

const spawn = require('child_process').spawn;

io.on("connection", (socket) => {
  socket.on("request", (link) => {
    console.log("request")
    const result = spawn('python3', ['main.py', link]);

    result.stdout.on('data', (text) => {
      socket.emit("article", text.toString());
      console.log(text.toString())
    });

  }) 
});

http.listen(8080, () => {
  console.log(`listening on port 8080`);
});