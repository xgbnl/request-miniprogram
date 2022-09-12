import { RESTFul } from "../Request/RESTFul.js";

export class HttpFactory {

    static getRestful(reqInter, respInter, appConfig, token) {
        return new RESTFul(reqInter, respInter, appConfig, token);
    }
}