const io = require("socket.io")(process.env.PORT || 9000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  const lists = []
  io.on("connection", (socket) => {

    lists.push(socket.id)
    console.log("list",lists)
    //when ceonnect
    socket.on("client-send-mes", (data) => {
      console.log("client-send-mes", data)
      socket.join(data.conversation_id)
      io.emit("mes-from-server",data);
    });
    socket.on("join-room", (room) => {
      console.log("join-room", room)
      socket.join(room)
    })
    //send and get message
  
  
    //when disconnect
    socket.on("disconnect", () => {
      
      console.log("a user disconnected!");
    });
  });