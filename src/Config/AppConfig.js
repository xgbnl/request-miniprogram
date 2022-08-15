export class AppConfig {

    static  #instance = null;

    #globalData = {};

    constructor() {
    }

    /**
     * Init singleton setting.
     * @param api request api
     * @param loginPage user login page
     * @param homePage miniProgram home page
     * @param tokenType token type
     * @param storageKey token storage key
     */
    configure({api, loginPage, homePage,tokenType,storageKey}) {
        this.#globalData = {
            api ,
            loginPage,
            homePage,
            tokenType: tokenType ?? 'Bearer',
            storageKey: storageKey ?? 'access_token'
        };
    }

    /**
     * Get request api.
     * @returns {string}
     */
    getApi() {
        return this.#globalData.api;
    }

    /**
     * Get miniProgram login pages.
     * @returns {string}
     */
    getLoginPage() {
        return this.#globalData.loginPage;
    }

    /**
     * Get miniProgram home pages.
     * @returns {*}
     */
    getHomePage() {
        return this.#globalData.homePage;
    }

    /**
     * Get token type.{bearer}
     * @returns {string}
     */
    getTokenType() {
        return this.#globalData.tokenType;
    }

    /**
     * Get token storage key.
     * @returns {string}
     */
    getStorageKey() {
        return this.#globalData.storageKey;
    }

    /**
     * Check access token is empty.
     * @returns {boolean}
     */
    tokenIsEmpty(){
        return !wx.getStorageSync(this.getStorageKey());
    }

    /**
     * Get AppConfig singleton instance.
     * @returns {AppConfig}
     */
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new AppConfig();
        }

        return this.#instance;
    }
}