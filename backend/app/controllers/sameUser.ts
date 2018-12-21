
import {Request, Response} from 'express';

export function sameUser(req: Request, res: Response, next: Function, username: string) {
    if (req.user.username !== username) {
      console.log("!!!!! WRONG USER");
      res.statusCode = 403;
      res.json({
        'message': 'not correct user'
      });
      return;
    } else next();
  }