import { Router, Request, Response } from 'express';
import { Job } from '../models/job.model';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const instances = await Job.findAll();
  res.statusCode = 200;
  res.send(instances.map(job => job.toSimplification()));
});

router.post('/', (req: Request, res: Response, next: Function) => {
  if (!req.user) {
    res.statusCode = 403;
    res.send('You are not logged in, moron');
  }
  next();
}, async (req: Request, res: Response) => {
  const instance = new Job();

  instance.fromSimplification(req.body);
  instance.approved = false;
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

router.put('/:id', async (req: Request, res: Response) => {
  console.log('not good.....................................');
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

router.delete('/:id', async (req: Request, res: Response) => {
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

const approveRouter: Router = Router({ mergeParams: true });
router.use('/:id/approved', approveRouter);

approveRouter.put('/', async (req: Request, res: Response) => {
  console.log('WHHHHHHHHHHHHHHHHHAAAAAAAAAAAATTT');
  console.log(req.body);
  const id = parseInt(req.params.id);
  const instance: Job | null = await Job.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.approved = req.body;
  await instance.save();
  res.statusCode = 200;
  res.json({
    'message': 'job enabled'
  });
});

export const JobController: Router = router;
