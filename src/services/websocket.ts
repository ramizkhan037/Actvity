class WebSocketClient {
  private ws: WebSocket | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // This code will only run in the browser
      try {
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
          if (this.ws) {
            //Check that the error object exists before logging it to the console
            if(error && Object.keys(error).length){
              console.error('WebSocket error:', error);
            } else {
              console.error('WebSocket error: An unknown WebSocket error occurred.');
            }
          }
        };
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
      }
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
