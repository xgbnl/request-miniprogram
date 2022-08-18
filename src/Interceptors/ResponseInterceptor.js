import {Interceptor} from "./Interceptor";
import {ResponseEnum} from "../Enum/ResponseEnum";
import {Helper} from "../Helper/Helper";

export class ResponseInterceptor extends Interceptor {

    #app

    constructor(app) {
        super();
        this.#app = app;
    }

    interceptor({code, msg}) {

        switch (code) {
            case ResponseEnum.UNAUTHORIZED:
                Helper.abort(msg ?? '无效访问令牌');
                this.#redirectToAuthPage();
                break;
            case ResponseEnum.FORBIDDEN:
                Helper.abort(msg ?? '访问被禁止');
                break;
            case ResponseEnum.NOT_FOUND:
                Helper.abort(msg ?? '页面不存在');
                this.#redirectToHomePage();
                break;
            case ResponseEnum.VALIDATE:
                Helper.abort(msg);
                break;
            case ResponseEnum.ERROR:
                Helper.abort(msg);
                break;
        }
    }

    #redirect(url) {
        wx.redirectTo({url: url,});
    }

    #redirectToAuthPage() {
        setTimeout(() => {
            this.#redirect(this.#app.getAuthPage())
        }, 5000)
    }

    #redirectToHomePage() {
        setTimeout(() => {
            this.#redirect(this.#app.getHomePage())
        }, 5000)
    }
}