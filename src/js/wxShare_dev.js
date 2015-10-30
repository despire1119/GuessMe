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
                    title: '光棍节求『脱单』？ 不如猜猜价格先『免单』!',
                    link: g().urlLinks,
                    imgUrl: 'http://image3.suning.cn//uimg/cms/img/144584983772397531.jpg',
                    success: function () {
                        console.log('分享成功')
                    },
                    cancel: function () {
                        console.log('您已取消分享')
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '光棍节求『脱单』？ 不如猜猜价格先『免单』!',
                    desc: '光棍节求『脱单』？ 不如猜猜价格先『免单』!',
                    link: g().urlLinks,
                    imgUrl: 'http://image3.suning.cn//uimg/cms/img/144584983772397531.jpg',
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