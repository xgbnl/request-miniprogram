export class Application {

    static #instance = null;

    #currentPage = '';

    #globalData = {};

    constructor() {
    }

    /**
     * Init singleton setting.
     * @param host
     * @param authPage
     * @param homePage
     * @param tokenKey
     * @param authPages
     */
    configure({host, authPage, homePage, authPages = []}) {
        this.#globalData = {
            host,
            authPage,
            homePage,
            authPages,
        };
    }

    /**
     * 设置当前页面
     * @param pages
     */
    setCurrentPage(pages = []) {
        if (pages.length === 0) {
            return this.#currentPage;
        }

        const page = pages.pop();

        if (page === undefined || page === null) {
            return this.#currentPage;
        }

        this.#currentPage = page.route;
    }

    /**
     * 获取当前页面
     * @returns {string}
     */
    getCurrentPage() {
        return this.#currentPage;
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
     * 获取需要验证的页面
     * @returns {*[]}
     */
    getAuthPages() {
        return this.#globalData.authPages;
    }

    /**
     * 跳转
     * @param url
     */
    #redirect(url) {
        wx.redirectTo({url: url,});
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