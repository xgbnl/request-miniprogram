export class Application {

    static #instance = null;

    #configured = {};

    constructor() {
    }

    /**
     * 初始化配置
     * @param host
     * @param authPage 授权页
     * @param redirectPage 跳转页
     */
    configure({host, authPage, redirectPage}) {
        this.#configured = {
            host,
            authPage,
            redirectPage,
        };
    }

    /**
     * 获取请求API
     * @returns {string}
     */
    getHost() {
        return this.#configured.host;
    }

    /**
     * 重定向至授权页
     */
    redirectToAuthPage() {
        wx.redirectTo({url: this.#configured.authPage})
    }

    /**
     * 404错误跳转至重定向页面
     */
   toRedirectionPage() {
        wx.redirectTo({url: this.#configured.redirectPage})
    }

    /**
     * 获取单例实例
     * @returns {null}
     */
    static make() {
        if (!this.#instance) {
            this.#instance = new Application();
        }

        return this.#instance;
    }
}