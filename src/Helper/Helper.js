export class Helper {

    static trigger(msg) {
        wx.showToast({
            title: '成功',
            icon: 'error',
            duration: 2000,
            mask: false
        })
    }

}