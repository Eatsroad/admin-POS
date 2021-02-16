import { AuthMiddleware } from './AuthMiddleware';
import { StoreMiddleware } from './StoreMiddleware';
import { OrderMiddleware } from './OrderMiddleware';

export const appMiddleware = [
    AuthMiddleware, 
    StoreMiddleware,
    OrderMiddleware
];
