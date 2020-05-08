import { Request, Response, Router } from 'express';

import User from '../models/User';

class UserRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    const user = await User.findOne({ email: req.params.email }).populate('demos', 'title url');
    res.json(user);
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();
    res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, lastName, email, password, demos } = req.body;
    const newUser = new User({ name, lastName, email, password, demos });
    await newUser.save();
    console.log(newUser);
    res.json(newUser);
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    const newUser = await User.findOneAndUpdate({ email }, req.body, { new: true });
    res.json(newUser);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });
    res.json(user);
  }

  routes() {
    this.router.get('/', this.getUsers);
    this.router.get('/:email', this.getUser);
    this.router.post('/', this.createUser);
    this.router.put('/:email', this.updateUser);
    this.router.delete('/:email', this.deleteUser);
  }
}

const user = new UserRoutes();

export default user.router;