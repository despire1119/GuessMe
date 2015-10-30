var WeixinShare = {
    config: function (title, desc, link, imgUrl, debug) {
        var self = this;

        self.title = title;
        self.desc = desc;
        self.link = link;
        self.imgUrl = imgUrl;
        self.debug = debug || false;

        var current_url = window.location.href;
        $.ajax({
            url: wxhost + encodeURIComponent(current_url),
            //url: 'http://h5-site.tbs-info.cn/home/share_config?url=' + encodeURIComponent(current_url),
            timeout: 5000,
            dataType : "jsonp",
            jsonp: 'callbackparam',
            error: function (xhr, textStatus) {
            },
            success: function (data) {
                wx.config({
                    debug: false,
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                });

                wx.ready(function () {
                    self.updateInfo(self.title, self.desc, self.link, self.imgUrl);
                });
            }
        });
    },
    updateInfo: function (title, desc, link, imgUrl) {
        if (wx) {
            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                trigger: function (res) {
                },
                success: function (res) {
                    $('#alpha').hide();
                },
                cancel: function (res) {
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });


            wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                trigger: function (res) {
                },
                success: function (res) {
                    $('#alpha').hide();
                },
                cancel: function (res) {
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        }
    },
    updateDesc: function (desc) {
        var self = this;
        self.desc = desc;
        self.updateInfo(self.title, self.desc, self.link, self.imgUrl);
    },
    updateLink: function (link) {
        var self = this;
        self.link = link;
        self.updateInfo(self.title, self.desc, self.link, self.imgUrl);
    },
    updateImgUrl: function (imgUrl) {
        var self = this;
        self.imgUrl = imgUrl;
        self.updateInfo(self.title, self.desc, self.link, self.imgUrl);
    }
}