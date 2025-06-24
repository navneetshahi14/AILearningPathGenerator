// import { ClerkUserPayload } from '../src/common/guards/clerk-auth.guard';

declare namespace Express {
  interface Request {
    user?: {
      _id: string;
      email?: string;
      [key: string]: any;
    };
  }
}
