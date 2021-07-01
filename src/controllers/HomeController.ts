import { Request, Response } from 'express';

const responseBody = `
    <div style="display: flex; justify-content: center; align-items:center;width:100%;height:100%;">
        <p>Welcome to the api example coded by jCarlo0s</p>
    </div>
`;

export class HomeController {
    public getHome(req: Request, res: Response) {
        res.status(200).send(responseBody);
    }
}