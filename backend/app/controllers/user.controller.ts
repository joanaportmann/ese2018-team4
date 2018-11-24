import { Router, Request, Response } from "express";
import { User } from '../models/user.model';
import { authenticatedUser } from './authentication';


const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  const simpleUser = req.body;
  const user = await User.findByPrimary(simpleUser.username);
  if (user) {
    res.statusCode = 403;
    res.json({
      'message': 'username already exists'
    });
    return;
  }
  const instance = new User();
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
