import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from 'express';
import path = require("path");

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.get(`${this.path}/:id`, this.getData);
        this.router.get(`${this.path}/:id/latest`, this.getLatest);
        this.router.get(`${this.path}/:id/:num`, this.getDataWithRange);
        this.router.delete(`${this.path}/all`, this.deleteAll);
        this.router.delete(`${this.path}/:id`, this.deleteData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        const data = testArr;
        response.status(200).json(data);
     };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        const { id } = request.params;
        testArr.push(Number(elem));
        response.status(200).json(elem);
     };    

     private getData = async (request: Request, response: Response, next: NextFunction) => {
        const {id} = request.params;
        const data = testArr;
        response.status(200).json(data[Number(id)]);
    }

    private getLatest = async (request: Request, response: Response, next: NextFunction) => {
        const {id} = request.params;
        const data = testArr;
        const max = data.reduce((a, b) => Math.max(a, b), -Infinity);
        response.status(200).json(max);
    }

    private getDataWithRange = async (request: Request, response: Response, next: NextFunction) => {
        const {id} = request.params;
        const {num} = request.params;
        response.status(200).json(testArr.splice(Number(id), Number(num)));
    }

    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json("Cleared");
    }

    private deleteData = async (request: Request, response: Response, next: NextFunction) => {
        const {id} = request.params;
        const elem = testArr[Number(id)-1];
        testArr.splice(Number(id)-1, 1)
        response.status(200).json(`Id: ${id}, Element: ${elem}`);
    }
}

export default DataController;


