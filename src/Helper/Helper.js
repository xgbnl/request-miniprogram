export class Helper {

    static prefix(haystack, prefix = '/') {
        return haystack.startsWith(prefix) ? haystack : `${prefix}${haystack}`;
    }

    static parse(haystack) {
        return JSON.parse(haystack);
    }

    static stringify(haystack) {
        return JSON.stringify(haystack);
    }
}