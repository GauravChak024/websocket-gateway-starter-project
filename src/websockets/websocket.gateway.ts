import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const message = `Received message: ${payload}`;
    this.server.emit('message', message); // Broadcast the message to all connected clients
    return message;
  }
}