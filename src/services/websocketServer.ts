// src/services/websocketServer.ts
import { WebSocketServer, WebSocket } from 'ws';
import { LaptopInformation, LaptopService } from './laptop';

class WebSocketServerClass {
  private wss: WebSocketServer;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
  }

  start(server: any, p0: () => Promise<LaptopInformation[]>): void {
      server.on('upgrade', (request: any, socket: any, head: any) => {
          this.wss.handleUpgrade(request, socket, head, (ws) => {
            this.wss.emit('connection', ws, request);
          });
      });

      this.wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected');

        ws.on('message', (message: string) => {
          console.log(`Received: ${message}`);
        });

        ws.on('close', () => {
          console.log('Client disconnected');
        });
      });

      const interval = setInterval(async () => {
        const laptopService = new LaptopService();
        const laptops: LaptopInformation[] = await laptopService.getLaptops();
        this.broadcastMessage(JSON.stringify(laptops));
      }, 5000);

      server.on('close', () => this.closeAllIntervals(interval));
  }
  
  broadcastMessage(message: string): void {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(message);
        } catch (error) {console.error("Error sending message to client:", error)}
      }
    });
  }
  
    closeAllIntervals(interval: NodeJS.Timeout): void {
        clearInterval(interval);
    }
}

export { WebSocketServerClass };