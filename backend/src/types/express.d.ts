import { ClerkUserPayload } from '../common/guards/clerk-auth.guard';

declare module 'express-serve-static-core' {
  interface Request {
    user?: ClerkUserPayload;
  }
}
