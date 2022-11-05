export class Application {

    static #instance = null;

    #currentPage = '';

    #globalData = {};

    constructor() {
    }

    /**
     * Init singleton setting.
     * @param host
     * @param authPage 授权页
     * @param listenerPages 监听页面
     */
    configure({host, authPage, listenerPages = []}) {
        this.#globalData = {
            host,
            authPage,
            listenerPages,
        };
    }

    /**
     * 设置当前页面
     * @param pages
     * @returns {string}
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
     * 获取监听的页面
     * @returns {*}
     */
    getListenerPages() {
        return this.#globalData.listenerPages;
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

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Application();
        }

        return this.#instance;
    }
}