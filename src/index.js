import {Application} from "./Services/Application";
import {Factory} from "./Factory/Factory";
import {Helper} from "./Helper/Helper";

const app = Application.make();

const auth = Factory.makeAuth(app);

const restful = Factory.makeRESTFul(app, auth)

export {
    Helper,
    restful as RESTFul,
    auth as Auth,
    app as Application,
};