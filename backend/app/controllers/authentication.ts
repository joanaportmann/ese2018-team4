import {Request, Response} from 'express';

export function authenticatedUser(req: Request, res: Response, next: Function) {
    if (!req.user) {
        res.statusCode = 403;
        res.send('You are not logged in, moron');
    }
    next();
}

