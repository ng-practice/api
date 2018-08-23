import { ChatMessage } from './chat-message';

export interface PersistedChatMessage {
  [key: string]: ChatMessage;
}
