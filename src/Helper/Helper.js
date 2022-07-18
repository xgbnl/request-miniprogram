export class Helper {

    static abort(msg, icon = 'none', duration = 2000) {
        wx.showToast({
            title: msg,
            icon: icon,
            duration: duration,
            mask: false
        })
    }

}