const WebSocket = require("ws");
const { OrderAdded } = require("./socket/constants");
const { payload } = require("./socket/utils");
const webSocketServer = new WebSocket.Server({ port: 8989 });

const messages = [];

const broadcast = (data, ws) => {
  webSocketServer.clients.forEach((client) => {
    if(client.readyState === WebSocket.OPEN  && client!==ws ){
      client.send(JSON.stringify(data));
    }
  })
};

webSocketServer.on("connection", (ws) => {
  // send response back to user who sent notification, not needed for now
  // ws.send(JSON.stringify({ type:"LOAD_MESSAGES", messages }));

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type){
      case OrderAdded:
        messages.push({ id:messages.length + 1, message: data.payload });
        broadcast(payload(OrderAdded, data.payload), ws);
        break;
      default: break;
    }
  })

  ws.on("close", ()=>{

  })
});
