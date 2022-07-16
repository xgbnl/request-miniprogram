import {Interceptor} from "./Interceptor";
import {ResponseEnum} from "../Enum/ResponseEnum";
import {Helper} from "../Helper/Helper";

export class ResponseInterceptor extends Interceptor {

    interceptor(params) {

        const {code, msg} = params;

        switch (code) {
            case ResponseEnum.UNAUTHORIZED:
                Helper.trigger('无效访问令牌' || msg);
                break;
            case ResponseEnum.FORBIDDEN:
                Helper.trigger('访问被禁止' || msg);
                break;
            case ResponseEnum.NOT_FOUND:
                Helper.trigger('页面不存在' || msg);
                break;
            case ResponseEnum.VALIDATE:
                Helper.trigger(msg);
                break;
        }
    }
}