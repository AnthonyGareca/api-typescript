import { Request, Response, Router } from 'express';

import Demo from '../models/Demo';

class DemoRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getDemo(req: Request, res: Response): Promise<void> {
    const demo = await Demo.findOne({ url: req.params.url });
    res.json(demo);
  }

  public async getDemos(req: Request, res: Response): Promise<void> {
    const demos = await Demo.find();
    res.json(demos);
  }

  public async createDemo(req: Request, res: Response): Promise<void> {
    const { title, url, content, image } = req.body;
    const newDemo = new Demo({ title, url, content, image });
    await newDemo.save();
    console.log(newDemo);
    res.json(newDemo);
  }

  public async updateDemo(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    const newDemo = await Demo.findOneAndUpdate({ url }, req.body, { new: true });
    res.json(newDemo);
  }

  public async deleteDemo(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    const demo = await Demo.findOneAndDelete({ url });
    res.json(demo);
  }

  routes() {
    this.router.get('/', this.getDemos);
    this.router.get('/:url', this.getDemo);
    this.router.post('/', this.createDemo);
    this.router.put('/:url', this.updateDemo);
    this.router.delete('/:url', this.deleteDemo);
  }
}

const demo = new DemoRoutes();

export default demo.router;