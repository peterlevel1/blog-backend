import { SQL_ORDER_BY_KEYS } from '@common/constants';
import { PostEntity, PostEntityKeys } from '@databases/mysql/entities';
import { keys, pick } from 'lodash';

export class PostRepositorySql {
  createPost() {
    return 'INSERT INTO `post` (title, content) VALUES (:title, :content);';
  }

  createUserPost() {
    return 'INSERT INTO `userPosts` (userId, postId) VALUES (:userId, :postId)';
  }

  findAll({ orderBy, orderByKey }) {
    return `SELECT p.*
        FROM userPosts up JOIN post p ON up.postId = p.id
        WHERE up.userId = :userId
        ORDER BY ${PostEntityKeys.includes(orderByKey) ? orderByKey : ''} ${SQL_ORDER_BY_KEYS.includes(orderBy) ? orderBy : ''}
        LIMIT :limit
        OFFSET :offset`;
  }

  findOne() {
    return `SELECT p.* \
        FROM userPosts up JOIN post p ON up.postId = p.id
        WHERE up.userId = :userId AND p.id = :postId
        LIMIT 1`;
  }

  update(postEntity: PostEntity) {
    return `UPDATE post p JOIN userPosts up ON p.id = up.postId
        SET ${keys(pick(postEntity, PostEntityKeys))
          .map((key) => `p.${key} = :${key}`)
          .join(', ')}
        WHERE up.userId = :userId AND p.id = :postId`;
  }

  remove() {
    return 'DELETE p \
        FROM post p JOIN userPosts up ON p.id = up.postId \
        WHERE up.userId = :userId AND p.id = :postId';
  }
}
