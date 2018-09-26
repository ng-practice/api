import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';
import { NewsModule } from './news/news.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [TasksModule, ChatModule, NewsModule, MediaModule]
})
export class AppModule {}
