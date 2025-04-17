class WebSocketClient {
  private ws: WebSocket | null = null;
  private onMessageCallback: ((message: string) => void) | null = null;
  private url: string = 'ws://localhost:9004'; // Update to match your server port

  constructor(url?: string) {
    if (url) {
      this.url = url;
    }
  }

  connect(): void {
    if (typeof window === 'undefined') {
      console.warn('WebSocket is only available in browser environment');
      return;
    }
    
    try {
      this.ws = new WebSocket(this.url);
      
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
        if (this.ws) {
          //Check that the error object exists before logging it to the console
          if(error){
            console.error('WebSocket error:', error);
          }
        }
        // Avoid trying to stringify the entire object with circular references
      };
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  }

  onMessage(callback: (message: string) => void) {
    this.onMessageCallback = callback;
    return this; // For method chaining
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default WebSocketClient;
