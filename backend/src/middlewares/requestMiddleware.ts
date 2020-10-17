import { Request, Response, NextFunction } from 'express';
// This middleware provides functions that are supposed to be run after express.json
// They check for JSON syntax parsing error and if the req.body is not null
// as that'd mean the request did not have a application/json header

export default {
  checkSyntaxError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError) {
      console.error(err);
      return res.status(400).send({ status: 400, detail: err.message });
    }

    next();
  },

  isBody (req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0)
      return res.status(400).send({ status: 400, detail: "Invalid Content-Type header"});

    return next()
  }
}