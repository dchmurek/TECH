import express, { RequestHandler, response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from './config'
import Controller from 'interfaces/controller.interface';
import mongoose, { mongo } from 'mongoose';
import { error } from 'console';

class App {
   public app: express.Application;

   constructor(controllers: Controller[]) {
       this.app = express();
       this.initializeMiddlewares();
       this.initializeControllers(controllers);
       this.connectToDatabase();
   }

   public initializeControllers(controllers: Controller[]): void{
    controllers.forEach((controller) => {
        this.app.use('/', controller.router);
    });
   }

   private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        //this.app.use(morgan('dev'));
        this.app.use(this.requestLogMiddleware);
   }

   public listen(): void {
        this.app.listen(config.port, () => {
           console.log(`App listening on the port ${config.port}`);
       });
   }

   public requestLogMiddleware: RequestHandler = (request, response, next) => {
        console.log(`[${request.method} ${request.url} ${new Date().toISOString()}]`);
        next();
   }

   private async connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(config.databaseUrl);
        console.log('Connection with database established');
    } catch (error) {
        console.log('Error connecting to MongoDB: ' , error);
    }

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error: ', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
 }
}
export default App;
