import { Router, Request, Response } from "express";
import { User } from '../models/user.model';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const instance = new User();
    
    // TODO: Check if user already exists

    const simpleUser = req.body;
    simpleUser.password = User.hashPassword(simpleUser.password);

    instance.fromSimplification(simpleUser);
    await instance.save();
    res.statusCode = 201;
    res.send(instance.toSimplification());
});

export const UserController: Router = router;
