import DataController from './controllers/data.controller';
import App from './app';
import IndexController from './controllers/index.controller';

const app: App = new App([
    new DataController(),
    new IndexController()
]);

app.listen();