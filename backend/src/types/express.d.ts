import { ClerkUserPayload } from '../common/guards/clerk-auth.guard'; // or wherever you defined the payload type

declare module 'express-serve-static-core' {
  interface Request {
    user?: ClerkUserPayload;
  }
}
