import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE } from './auth.constants';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE, true);
