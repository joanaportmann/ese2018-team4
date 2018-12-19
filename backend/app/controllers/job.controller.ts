import { Router, Request, Response } from 'express';
import { Job } from '../models/job.model';
import { authenticatedUser } from './authentication';
import { sameUser } from './sameUser';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const instances = await Job.findAll();
  res.statusCode = 200;
  res.send(instances.map(job => job.toSimplification()));
});

router.post('/', authenticatedUser, async (req: Request, res: Response) => {
  const instance = new Job();

  instance.fromSimplification(req.body);
  instance.approved = false;
  instance.owner = req.user.username;
  console.log(req.user.username);
  await instance.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Job.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

router.put('/:id', authenticatedUser, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance: Job | null = await Job.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

router.put('/:id/approved', async (req: Request, res: Response) => {

  //TO-DO only show approved jobs

  const id = parseInt(req.params.id);
  const instance: Job | null = await Job.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  if (!(req.body === 'true' || req.body === 'false')) {
    res.statusCode = 400;
    res.json({
      'message': 'expected body to be "true" or "false"'
    });
    return;
  }
  instance.approved = req.body === 'true';
  await instance.save();
  res.statusCode = 200;
  res.json({
    'message': 'job ' + (instance.approved ? 'approved' : 'unapproved')
  });
});

router.delete('/:id', authenticatedUser,
  async (req: Request, res: Response, next: Function) => {
    const id = parseInt(req.params.id);
    const instance = await Job.findById(id);
    
    if (instance == null) {
      res.statusCode = 404;
      res.json({
        'message': 'job not found'
      });
      return;
    }
        sameUser(req, res, next, instance.owner);
  },
  async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const instance = await Job.findById(id);
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

export const JobController: Router = router;
