import { SocketAct } from '../../lib/contracts/socket-act';
import { ChatMessage } from '../chat-message';

export class ChatHistoryLoaded implements SocketAct<ChatMessage[]> {
  readonly event = '[Chat] All past messages have been loaded';

  constructor(public data: ChatMessage[]) {}
}
