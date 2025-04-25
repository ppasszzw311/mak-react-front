import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth';
import { productHandlers } from './handlers/products';
import { checkInHandlers } from './handlers/checkIn';

export const worker = setupWorker(
  ...authHandlers,
  ...productHandlers,
  ...checkInHandlers
); 