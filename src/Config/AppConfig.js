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
     * @param header
     * @param tokenType
     * @param storageKey
     */
    configure({api, authPage, homePage, header, tokenType, storageKey}) {
        this.#globalData = {
            api,
            authPage,
            homePage,
            header,
            tokenType: tokenType ?? '',
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
    getAuthPage() {
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
     * Get local storage token.
     * @returns {*}
     */
    getStorageToken() {
        return wx.getStorageSync(this.getStorageKey());
    }

    /**
     * Get token storage key.
     * @returns {string}
     */
    getStorageKey() {
        return this.#globalData.storageKey;
    }

    /**
     * Get token header.
     * @returns {{"Content-Type": *}|*}
     */
    getHeader() {
        return this.#globalData.header;
    }

    /**
     * Check access token is empty.
     * @returns {boolean}
     */
    tokenIsEmpty() {
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