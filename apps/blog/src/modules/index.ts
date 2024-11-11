import { TagModule } from '@modules/tag/tag.module';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { PostModule } from './post';
import { FileModule } from './file';

export const bizModules = [AuthModule, UserModule, PostModule, TagModule];
