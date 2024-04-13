const eventos = (socket,io) => {
  //   console.log("a user connected");
  //enviar mensaje a todos sin necesidad de interactuar (menos al que se conecta o suscribe al eventeo chat)
  socket.broadcast.emit("chat", {
    usuario: "INFO",
    message: "se ha conectado un nuevo usuario",
  });
  //suscribirse a un evento
  socket.on("chat", (data) => {
    io.emit("chat", data); //enviar mensaje a todos los clientes conectados
    console.log(data);
  });
  socket.on("pedidos", (pedido) => {
    io.emit("pedidos", pedido); //enviar mensaje a todos los clientes conectados
    console.log(pedido);
  });
  
};
module.exports = { eventos };
