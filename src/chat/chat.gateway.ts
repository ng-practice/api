import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'net';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';

import { ChatMessagesService } from './lib/chat-messages.service';
import { SocketAct } from './lib/contracts/socket-act';
import { ChatMessageValidator } from './lib/guards/chat-message-validator.guard';
import { ChatMessage } from './models';
import { ChatHistoryLoaded, ChatMessageSent } from './models/acts';
import { ChatClientEvent } from './models/chat-client-event';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private _chatMessages: ChatMessagesService) {}

  /**
   * Passes all messages stored in the database when a client connects.
   */
  @SubscribeMessage(ChatClientEvent.LoadAllMessages)
  loadAll(): Observable<ChatHistoryLoaded> {
    return this._chatMessages
      .all()
      .pipe(map(messages => new ChatHistoryLoaded(messages)));
  }

  /**
   * Removes all stored messages
   */
  @SubscribeMessage(ChatClientEvent.RemoveAllMessages)
  removeAll(): Observable<ChatHistoryLoaded> {
    return this._chatMessages
      .removeAll()
      .pipe(mapTo(new ChatHistoryLoaded([])));
  }

  /**
   * Multicasts a single message to all connected clients.
   * @param message The message containing valuable content. :)
   */
  @SubscribeMessage(ChatClientEvent.PublishSingleMessage)
  @UseGuards(ChatMessageValidator)
  publishMessage(_: SocketIO.Socket, message: ChatMessage) {
    return this._chatMessages
      .addOne(message)
      .pipe(
        tap(chatMessage => this.broadCast(new ChatMessageSent(chatMessage)))
      );
  }

  /**
   * Helps to emit a SocketEvent using the socket server instance of the
   * gateway
   * @param act Event that should be transmitted to all subscribers
   */
  private broadCast<T>(act: SocketAct<T>) {
    this.server.emit(act.event, act.data);
  }
}
