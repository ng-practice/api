import { ChatMessage } from '../chat-message';
import { SocketAct } from '../../lib/contracts/socket-act';

export class ChatMessageSent implements SocketAct<ChatMessage> {
  readonly event = '[Chat] A new message has been published';

  constructor(public data: ChatMessage) {}
}
