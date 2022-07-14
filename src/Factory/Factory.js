import {Request} from "../Request/Request.js";

export class Factory {

    static getRequest() {
        return new Request();
    }

}