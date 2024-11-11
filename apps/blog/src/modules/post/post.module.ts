import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from '@databases/mysql/repositories';
import { UserModule } from '@modules/user';

@Module({
  imports: [UserModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
