const { Server } = require("socket.io");

const io = new Server(8080, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log('connection');
  socket.on("update item", (file,callback) => {
    console.log(file)
    callback({
      status: "ok",
      aaa:'1212',
      data:file,
    });
  });
});