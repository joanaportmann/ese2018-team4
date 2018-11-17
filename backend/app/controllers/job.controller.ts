import {Router, Request, Response} from 'express';
import {Job} from '../models/job.model';
import { authenticatedUser } from './authentication';

const router: Router = Router();

function sameUser (req: Request, res: Response, next: Function) {
  //TODO: Implement as soon as we have user-job relation!!! Issue 23
  next();
}

router.get('/', async (req: Request, res: Response) => {
  const instances = await Job.findAll();
  res.statusCode = 200;
  res.send(instances.map(job => job.toSimplification()));
});

router.post('/', authenticatedUser, async (req: Request, res: Response) => {
  const instance = new Job();

  instance.fromSimplification(req.body);
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

router.put('/:id', authenticatedUser, sameUser, async (req: Request, res: Response) => {
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

router.delete('/:id', authenticatedUser, sameUser, async (req: Request, res: Response) => {
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
