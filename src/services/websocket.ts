class WebSocketClient {
  private ws: WebSocket | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // This code will only run in the browser
      this.ws = new WebSocket('ws://localhost:8080');
      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };
  
      this.ws.onmessage = (event) => {
        if (this.onMessageCallback) {
          this.onMessageCallback(String(event.data));
        }
      };
  
      this.ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };
  
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }
  

  connect(p0: string): void {
    // Connection is handled in the constructor
  }

  private onMessageCallback: ((message: string) => void) | null = null;
    onMessage(callback: (message: string) => void) {
      this.onMessageCallback = callback
    }
}
export default WebSocketClient;