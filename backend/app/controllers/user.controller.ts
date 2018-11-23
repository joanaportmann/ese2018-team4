import { Router, Request, Response } from "express";
import { User } from '../models/user.model';
import { authenticatedUser } from './authentication';


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

router.delete('/:username', async (req: Request, res: Response) => {
    const username = req.params.username;
    const instance = await User.findByPrimary(username);
    if (instance == null) {
      res.statusCode = 404;
      res.json({
        'message': 'not found'
      });
      return;
    }
    instance.fromSimplification(req.body);
    await instance.destroy();
    res.statusCode = 204;
    res.send();
  });

export const UserController: Router = router;
