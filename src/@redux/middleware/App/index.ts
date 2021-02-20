import { AuthMiddleware } from './AuthMiddleware';
import { StoreMiddleware } from './StoreMiddleware';
import { OrderMiddleware } from './OrderMiddleware';
import { CancelMenuMiddleware } from './CancelMenuMiddleware';
export const appMiddleware = [
    AuthMiddleware, 
    StoreMiddleware,
    OrderMiddleware,
    CancelMenuMiddleware,
];
