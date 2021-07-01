import { Request, Response } from 'express';
import { HomeController } from '../controllers/HomeController';
import { Api } from '../controllers/ApiController';

export class Routes {
    public HomeController: HomeController = new HomeController();
    public Api: Api = new Api();

    public routes(app: any): void {
        app.route('/').get(this.HomeController.getHome);
        app.route('/api/items').get(this.Api.searchItems);
        app.route('/api/items/:itemId').get(this.Api.itemDetails);
    }
}