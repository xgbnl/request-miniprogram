import {HttpFactory} from "./Factories/HttpFactory";
import {AppConfig} from "./Config/AppConfig";
import {Helper} from "./Helper/Helper";

const request = HttpFactory.getRequest();

const appConfig = AppConfig.getInstance();

export {
    request,
    appConfig,
    Helper,
};