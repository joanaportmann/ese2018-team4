import { Request, Response, Router } from "express";
import { User } from '../models/user.model';
import { authenticatedUser } from './authentication';
import { sameUser } from './sameUser';



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

router.put('/:username', async (req: Request, res: Response) => {
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

router.put('/:username/enabled', async (req: Request, res: Response) => {
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
  instance.enabled = req.body;
  await instance.save();
  res.cookie('user', instance.toSimplification());
  res.statusCode = 204;
  res.send();
});

router.put('/:username/password', async(req: Request, res: Response) => {
  const passwordHash = User.hashPassword(req.body);
  const username = req.params.username;
  const instance = await User.findByPrimary(username);
  if (!instance) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.passwordHash = passwordHash;
  await instance.save();
  res.cookie('user', instance.toSimplification());
  res.statusCode = 204;
  res.send();
});

router.delete('/:username', authenticatedUser, async (req: Request, res: Response, next: Function) => {
  const username = req.params.username;
  const instance = await User.findByPrimary(username);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  sameUser(req, res, next, username);
},
  async (req: Request, res: Response) => {
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
    try {
      await User.findByPrimary(username);
      await instance.destroy();
      res.clearCookie('user');
      req.logout();
      res.statusCode = 204;
      res.send();
    } catch (err) {
      console.log("**** Error: " + err);
    }
  });

export const UserController: Router = router;
