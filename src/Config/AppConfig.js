export class AppConfig {

    static  #instance = null;

    #globalData = {};

    constructor() {
    }

    /**
     * Init singleton setting.
     * @param api
     * @param authPage
     * @param homePage
     * @param tokenType
     * @param storageKey
     */
    configure({api, authPage, homePage,tokenType,storageKey}) {
        this.#globalData = {
            api ,
            authPage,
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
        return this.#globalData.authPage;
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