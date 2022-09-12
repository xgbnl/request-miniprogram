import { HttpFactory } from "./Factories/HttpFactory";
import { AppConfig } from "./Services/AppConfig";
import { Helper } from "./Helper/Helper";
import { Token } from './Services/Token';
import { InterceptorFactory } from './Factories';

const appConfig = AppConfig.getInstance();

const token = new Token(AppConfig);

const restful = HttpFactory.getRestful(
    InterceptorFactory.getRequestInterceptor(),
    InterceptorFactory.getResponseInterceptor(appConfig),
    appConfig,
    token,
);

export {
    restful as RESTFul,
    appConfig as AppConfig,
    Helper,
    token as Token,
};