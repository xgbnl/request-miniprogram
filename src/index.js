import {HttpFactory} from "./Factories/HttpFactory";
import {AppConfig} from "./Config/AppConfig";

const request = HttpFactory.getRequest();

const appConfig = AppConfig.getInstance();

export default {
    request,
    appConfig,
};