export class Helper {

    static trigger(msg) {
        wx.showToast({
            title: msg,
            icon: 'error',
            duration: 2000,
            mask: false
        })
    }

}