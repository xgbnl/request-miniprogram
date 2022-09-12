import {HttpFactory} from "./Factories/HttpFactory";
import {Application} from "./Services/Application";
import {Helper} from "./Helper/Helper";
import {Token} from './Services/Token';
import {InterceptorFactory} from "./Factories/InterceptorFactory";

const application = Application.getInstance();

const token = new Token(application);

const restful = HttpFactory.getRestful(
    InterceptorFactory.getRequestInterceptor(),
    InterceptorFactory.getResponseInterceptor(application),
    application,
    token,
);

export {
    Helper,
    restful as RESTFul,
    token as Token,
    application as Application,
};