export class AppConfig {

    static  #instance = null;

    #globalData = {};

    constructor() {
    }

    configure({api, loginPage, homePage,tokenType,storageKey}) {
        this.#globalData = {
            api ,
            loginPage,
            homePage,
            tokenType: tokenType ?? 'Bearer',
            storageKey: storageKey ?? 'access_token'
        };
    }

    getApi() {
        return this.#globalData.api;
    }

    getLoginPage() {
        return this.#globalData.loginPage;
    }

    getHomePage() {
        return this.#globalData.homePage;
    }

    getTokenType() {
        return this.#globalData.tokenType;
    }

    getStorageKey() {
        return this.#globalData.storageKey;
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new AppConfig();
        }

        return this.#instance;
    }
}