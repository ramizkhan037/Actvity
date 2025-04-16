// server.ts
import { WebSocketServerClass } from './src/services/websocketServer';
import { LaptopService } from './src/services/laptop';

const PORT = 9002;

const server = require('http').createServer();
const webSocketServer = new WebSocketServerClass();

webSocketServer.start(server, async () => {
    return await (new LaptopService()).getLaptops();
});


setInterval(async () => {
  const laptops = await LaptopService.getLaptops();
  server.sendDataToClients(laptops);
}, 5000);

server.listen(PORT);

console.log(`WebSocket server started on port: ${PORT}`);
