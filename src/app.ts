/**
 * Application Entry Point
 * by jCarlo0s <jandradecb@gmail.com>
 */
import express from 'express';
import { Routes } from './routes/routes';


/**
 * APP Definition
 */
class App {
    public app: express.Application;
    public appRoutes: Routes = new Routes();
    
    constructor() {
        this.app = express();
        this.config();
        this.appRoutes.routes(this.app);
    }

    // Application configuration
    public config(): void {
        this.app.use(express.json());
    }
}

export default new App().app;