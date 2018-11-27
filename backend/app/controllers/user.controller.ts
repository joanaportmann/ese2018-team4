import { Request, Response, Router } from "express";
import { User } from '../models/user.model';


const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users: User[] = await User.findAll();
  res.statusCode = 200;
  res.send(users.map(user => user.toSimplification()));
});

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

router.put('/:username', async (req:Request, res: Response) => {
  const username = req.params.username;
  const instance = await User.findByPrimary(username);
  if (!instance) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.cookie('user', instance.toSimplification());
  res.statusCode = 204;
  res.send();
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
  res.clearCookie('user');
  res.statusCode = 204;
  res.send();
});

export const UserController: Router = router;
