import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import routes from './routes/routes';
import demo from './routes/demoRoutes';
import user from './routes/userRouter';

class Server {
  app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    // Mongoose
    const MONGO_URL = 'mongodb://localhost:27017/covid19';
    mongoose.set('useFindAndModify', true);
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }).then(db => console.log('DB is connected'));
    // Settings
    this.app.set('port', process.env.PORT || 3000);
    // Middleware
    this.app.use(morgan(process.env.LOGS || 'dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
    this.app.use('/api/demos', demo);
    this.app.use('/api/users', user);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server run on port ${this.app.get('port')}`);
    });
  }
}

const server = new Server();

server.start();