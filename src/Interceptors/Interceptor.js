export class Interceptor {

    constructor() {
        if (new.target === Interceptor) {
            throw new Error('抽象类无法被实例化');
        }
    }

    interceptor(params) {
    }

    _urlRegExp(value) {
        return new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/).test(value);
    }
}