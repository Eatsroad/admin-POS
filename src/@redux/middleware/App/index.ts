import { AuthMiddleware } from './AuthMiddleware';
import { StoreMiddleware } from './StoreMiddleware';

export const appMiddleware = [AuthMiddleware, StoreMiddleware];
