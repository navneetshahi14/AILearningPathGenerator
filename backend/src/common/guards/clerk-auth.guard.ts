import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';

const client = jwksRsa({
  jwksUri: process.env.CLERK_JWKS_URI!,
});

function getKey(
  header: jwt.JwtHeader,
  callback: (err: Error | null, key?: string) => void,
): void {
  client.getSigningKey(header.kid as string, (err, key) => {
    if (err) return callback(err);

    const signingKey = key?.getPublicKey?.();
    if (!signingKey) return callback(new Error('No signing key found'));
    callback(null, signingKey);
  });
}

export interface ClerkUserPayload {
  _id: string;
  email?: string;
  [key: string]: any;
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token found');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = await new Promise<ClerkUserPayload>((resolve, reject) => {
        jwt.verify(token, getKey, {}, (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded as ClerkUserPayload);
        });
      });

      request.user = decoded;
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
