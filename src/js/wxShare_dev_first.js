var wxShare = wxShare || {};

wxShare.loadJWeixin = function () {
    $.ajax({
        url: g().wxToken + encodeURIComponent(window.location.href),
        dataType: 'jsonp',
        jsonpCallback: 'get_wx_config',
        success: function (wx_config) {
            wx.config({
                debug: false,
                appId: wx_config.appId,
                //appId:'wx24336ca149550bd9',
                timestamp: wx_config.timestamp,
                nonceStr: wx_config.nonceStr,
                signature: wx_config.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });

            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: '帅的人已参加了猜价格，更帅的我猜中了免单！想脱单？先免单！',
                    link: g().urlLinks,
                    imgUrl: 'http://image3.suning.cn//uimg/cms/img/144584981554462337.jpg',
                    success: function () {
                        console.log('分享成功')
                    },
                    cancel: function () {
                        console.log('您已取消分享')
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '帅的人已参加了猜价格，更帅的我猜中了免单！想脱单？先免单！',
                    desc: '帅的人已参加了猜价格，更帅的我猜中了免单！想脱单？先免单！',
                    link: g().urlLinks,
                    imgUrl: 'http://image3.suning.cn//uimg/cms/img/144584981554462337.jpg',
                    success: function () {
                        console.log('分享成功')
                    },
                    cancel: function () {
                        console.log('您已取消分享')
                    }
                });
            })
            //
            wx.error(function (res) {
                console.log('fail')
            })

        }
    })
};
$(function () {
    wxShare.loadJWeixin()
})