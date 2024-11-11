import { PostRepository } from '@databases/mysql/repositories';
import { PostEntity } from '@databases/mysql';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import { CreatePostDto } from '@modules/post/dto/create-post.dto';

@Injectable()
export class PostService extends BaseService<PostEntity, PostRepository> {
  constructor(private readonly postRepository: PostRepository) {
    super(PostEntity, postRepository);
  }

  create(createPostDto: CreatePostDto) {
    const postEntity = new PostEntity({
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return super.create(postEntity);
  }
}
