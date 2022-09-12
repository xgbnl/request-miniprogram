export class Application {

    static #instance = null;

    #globalData = {};

    constructor() {
    }

    /**
     * Init singleton setting.
     * @param host
     * @param authPage
     * @param homePage
     * @param tokenKey
     */
    configure({ host, authPage, homePage, tokenKey }) {
        this.#globalData = {
            host,
            authPage,
            homePage,
            tokenKey: tokenKey ?? 'bearer',
        };
    }

    /**
     * 获取请求API
     * @returns {string}
     */
    getHost() {
        return this.#globalData.host;
    }

    /**
     * 获取授权页面
     * @returns {string}
     */
    getAuthPage() {
        return this.#globalData.authPage;
    }

    /**
     * 获取首页
     * @returns {*}
     */
    getHomePage() {
        return this.#globalData.homePage;
    }

    /**
     * 获取令牌主键
     * @returns {string}
     */
    getTokenKey() {
        return this.#globalData.tokenKey;
    }

    /**
     * 跳转
     * @param url
     */
    #redirect(url) {
        wx.redirectTo({ url: url, });
    }

    /**
     * 跳转至授权页
     */
    redirectToAuthPage() {
        setTimeout(() => {
            this.#redirect(this.getAuthPage())
        }, 3000)
    }

    /**
     * 跳转至首页
     */
    redirectToHomePage() {
        setTimeout(() => {
            this.#redirect(this.getHomePage())
        }, 3000)
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Application();
        }

        return this.#instance;
    }
}