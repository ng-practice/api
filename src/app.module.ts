import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [TasksModule, ChatModule]
})
export class AppModule {}
