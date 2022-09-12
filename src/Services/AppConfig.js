export class AppConfig {

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

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new AppConfig();
        }

        return this.#instance;
    }
}