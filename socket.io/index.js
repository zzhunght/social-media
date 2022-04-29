const io = require("socket.io")(process.env.PORT || 9000, {
    cors: {
      origin: "https://hiro-social.vercel.app",// port của client
    },
  });
  io.on("connection", (socket) => {

    //when ceonnect
    socket.on("client-send-mes", (data) => {
      console.log("client-send-mes", data)
      socket.join(data.conversation_id)
      io.to(data.conversation_id).emit("mes-from-server",data);
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