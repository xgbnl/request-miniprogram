import {HttpFactory} from "./Factories/HttpFactory";
import {Application} from "./Services/Application";
import {Helper} from "./Helper/Helper";
import {Auth} from './Services/Auth';
import {InterceptorFactory} from "./Factories/InterceptorFactory";

const application = Application.getInstance();

const auth = new Auth(application);

const restful = HttpFactory.getRestful(
    InterceptorFactory.getRequestInterceptor(),
    InterceptorFactory.getResponseInterceptor(application),
    application,
    auth,
);

export {
    Helper,
    restful as RESTFul,
    auth as Auth,
    application as Application,
};