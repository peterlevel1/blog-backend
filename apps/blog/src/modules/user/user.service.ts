import { Injectable } from '@nestjs/common';
import { UserEntity } from '@databases/mysql';
import { UserRepository } from '@databases/mysql/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  // findOneById(id: number): Promise<UserEntity | null> {
  //   const user = new UserEntity();
  //   user.username = '';

  //   return this.mysql.findOneBy({ id });
  // }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOneByUsername(username);
    console.log('findOneByUsername - user: %o', user);
    return user;
  }

  // findOneByEmail(email: string): Promise<UserEntity | null> {
  //   return this.userRepo.findOneBy({ email });
  // }

  // findOne(condition: any): Promise<UserEntity | null> {
  //   return this.userRepo.findOneBy(condition);
  // }

  // findAll(): Promise<UserEntity[]> {
  //   return this.userRepo.find();
  // }

  // async removeById(id: number): Promise<number> {
  //   const result = await this.userRepo.delete(id);
  //   return result.affected;
  // }
}
