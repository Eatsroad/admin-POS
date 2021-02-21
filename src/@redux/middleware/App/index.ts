import { AuthMiddleware } from './AuthMiddleware';
import { StoreMiddleware } from './StoreMiddleware';
import { OrderMiddleware } from './OrderMiddleware';
import { CancelMenuMiddleware } from './CancelMenuMiddleware';
import { UIMiddleware } from './UIMiddleware';
export const appMiddleware = [
    AuthMiddleware, 
    StoreMiddleware,
    OrderMiddleware,
    CancelMenuMiddleware,
    UIMiddleware
];
