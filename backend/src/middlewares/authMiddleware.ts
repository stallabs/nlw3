import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export default function(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    jwt.verify(token, 'cyber'); // TODO: access secret through environment variables
    return next();
  } catch {
    return res.sendStatus(401);
  }

}