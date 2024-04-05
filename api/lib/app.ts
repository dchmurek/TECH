import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from './config'
import Controller from 'interfaces/controller.interface';

class App {
   public app: express.Application;

   constructor(controllers: Controller[]) {
       this.app = express();
       this.initializeMiddlewares();
       this.initializeControllers(controllers);
   }

   public initializeControllers(controllers: Controller[]): void{
    controllers.forEach((controller) => {
        this.app.use('/', controller.router);
    });
   }

   private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
   }

   public listen(): void {
        this.app.listen(config.port, () => {
           console.log(`App listening on the port ${config.port}`);
       });
   }
}
export default App;