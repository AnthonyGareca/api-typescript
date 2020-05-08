import { Request, Response, Router } from 'express';

class Routes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/', (req, res) => {
      res.send('API: /api/demo');
      // res.json({"hi": "Andy!"});
    });
  }
}

const routes = new Routes();

export default routes.router;