import { Module } from '@nestjs/common';
import { join } from 'path';

import { ChatMessagesService } from './lib/chat-messages.service';
import { ChatGateway } from './chat.gateway';

// tslint:disable-next-line:no-var-requires
const JsonDB = require('node-json-db');

const database = join(__dirname, '..', '..', 'database');

@Module({
  providers: [
    ChatGateway,
    {
      provide: ChatMessagesService,
      useValue: new ChatMessagesService(
        new JsonDB(`${database}/chat-messages`, true, true)
      )
    }
  ]
})
export class ChatModule {}
