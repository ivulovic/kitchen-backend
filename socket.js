const WebSocket = require("ws");
const webSocketServer = new WebSocket.Server({ port: 8989 });

const broadcast = (data, ws) => {
  webSocketServer.clients.forEach((client) => {
    if(client.readyState === WebSocket.OPEN  && client!==ws ){
      client.send(JSON.stringify(data));
    }
  })
};

webSocketServer.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if(data.type){
      broadcast(data, ws);
    }
  })
  ws.on("close", ()=>{

  })
});
