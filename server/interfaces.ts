import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Document, NativeError } from 'mongoose';

export interface CookieController {
  setSSIDCookie: RequestHandler;
  deleteCookies: RequestHandler;
}

export interface ProjectController {
  saveProject: RequestHandler;
  getProjects: RequestHandler;
  deleteProject: RequestHandler;
}

export interface MarketplaceController {
  publishProject: RequestHandler;
  getPublishedProjects: RequestHandler;
  unpublishProject: RequestHandler;
  cloneProject: RequestHandler;
}

export interface RequestId extends Request {
  user: {
    id: string;
  };
}

export interface SessionCookie extends Document {
  cookieId: string;
}

export interface SessionController {
  isLoggedIn: (req: RequestId, res: Response, next: NextFunction) => void;
  startSession: (req: RequestId, res: Response, next: NextFunction) => void;
  endSession: (req: RequestId, res: Response, next: NextFunction) => void;
  // gitHubResponse: (req: RequestId, res: Response, next: NextFunction) => void;
  // gitHubSendToken: (req: RequestId, res: Response, next: NextFunction) => void;
  // githubSession: (req: RequestId, res: Response, next: NextFunction) => void;
}

export interface newUserError extends NativeError {
  keyValue: {
    email: string;
    username: string;
  };
}

export interface UserController {
  getUser: RequestHandler;
  createUser: RequestHandler;
  verifyUser: RequestHandler;
}

export interface UserStylesController {
  saveCssFile: RequestHandler;
}
export interface UserDocument extends Document {
  password: string;
}
