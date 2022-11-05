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
     * 获取跳转页
     * @returns {string}
     */
    getRedirectPage() {
        return this.#configured.redirectPage;
    }

    /**
     * 获取请求API
     * @returns {string}
     */
    getHost() {
        return this.#configured.host;
    }

    /**
     * 获取授权页面
     * @returns {string}
     */
    getAuthPage() {
        return this.#configured.authPage;
    }

    /**
     * 重定向至授权页
     */
    redirectToAuthPage() {
        wx.redirectTo({url: this.getAuthPage()})
    }

    /**
     * 404错误跳转至重定向页面
     */
    redirectToRedirectionPage() {
        wx.redirectTo({url: this.getRedirectPage()})
    }

    /**
     * 获取单例实例
     * @returns {null}
     */
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Application();
        }

        return this.#instance;
    }
}