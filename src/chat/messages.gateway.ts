import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'net';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';

import { ChatMessagesService } from './lib/chat-messages.service';
import { ChatMessage } from './models';

export interface SocketAct<T> {
  event: string;
  data?: T;
}

export class MessageSent implements SocketAct<ChatMessage> {
  readonly event = '[Chat] A new message has been published';

  constructor(public data: ChatMessage) {}
}

export class ChatHistoryLoaded implements SocketAct<ChatMessage[]> {
  readonly event = '[Chat] All past messages have been loaded';

  constructor(public data: ChatMessage[]) {}
}

export enum ChatClientEvent {
  LoadAllMessages = '[Chat:Client] Load messages from history',
  RemoveAllMessages = '[Chat:Client] Remove messages from history',
  PublishSingleMessage = '[Chat:Client] Publish message to the channel'
}

@WebSocketGateway()
export class MessagesGateway {
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
  publishMessage(_: SocketIO.Socket, message: ChatMessage) {
    return this._chatMessages
      .addOne(message)
      .pipe(tap(chatMessage => this.broadCast(new MessageSent(chatMessage))));
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
