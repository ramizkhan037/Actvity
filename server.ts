// server.ts
import { WebSocketServerClass } from './src/services/websocketServer';
import { LaptopService } from './src/services/laptop';

const PORT = 9003;

const server = require('http').createServer();
const webSocketServer = new WebSocketServerClass();

webSocketServer.start(server, () => new LaptopService().getLaptops());

setInterval(async () => {
  const laptops = await (new LaptopService()).getLaptops();
  // Use the correct method name and stringify the data
  webSocketServer.broadcastMessage(JSON.stringify(laptops));
}, 5000);

server.listen(PORT);

console.log(`WebSocket server started on port: ${PORT}`);