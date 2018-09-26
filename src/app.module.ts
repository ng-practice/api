import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [TasksModule, ChatModule, NewsModule]
})
export class AppModule {}
