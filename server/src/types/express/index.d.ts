import { JwtUser } from '../../utils/tokens';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}

export {};
