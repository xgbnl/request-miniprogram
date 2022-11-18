export class Application {

    /**
     *
     * @type {Application|null}
     */
    static instance = null;

    /**
     * @type {{}}
     */
    #configured = {};

    constructor() {
    }

    /**
     * 初始化配置
     * @param host
     * @param authPage  授权页
     * @param redirectPage 跳转页
     * @param globalData 全局数据
     * @return {void}
     */
    configure({host, authPage, redirectPage,globalData = {}}) {
        this.#configured = {
            host,
            authPage,
            redirectPage,
            globalData,
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
     * 获取全局数据
     * @returns {Object}
     */
    getGlobalData() {
        return this.#configured.globalData;
    }

    /**
     * 重定向至授权页
     * @return {void}
     */
    redirectToAuthPage() {
        wx.redirectTo({url: this.#configured.authPage})
    }

    /**
     * 404错误跳转至重定向页面
     * @return {void}
     */
    toRedirectionPage() {
        wx.redirectTo({url: this.#configured.redirectPage})
    }

    /**
     * 获取单例实例
     * @return {Application}
     */
    static make() {
        if (!Application.instance) {
            Application.instance = new Application();
        }

        return Application.instance;
    }
}