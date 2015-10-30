function g(actionId, callback) {
    function getEnv() {
        var ego_pre = /^(\w*)(pre)(\w*)/;
        var ego_sit = /^(\w*)(sit)(\w*)/;
        var ego_dev = /^(\w*)(dev)(\w*)/;
        var _hostName = document.location.hostname;
        if (ego_pre.test(_hostName)) {
            return 'pre';
        } else {
            if (ego_sit.test(_hostName)) {
                return 'sit'
            } else {
                if (ego_dev.test(_hostName)) {
                    return 'dev'
                }
            }
        }
        return 'prd';
    }
    function randomString(len) {
        var len = len || 32,
            str= "";
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    }
    var env = getEnv()
    var wxToken = {
        pre: 'http://lightpre.cnsuning.com/guess/getWechatToken.do?url=',
        prd: 'http://light.suning.com/guess/getWechatToken.do?url=',
        local: 'http://lightpre.cnsuning.com/guess/getWechatToken.do?url='
    }
    var urlLinks = {
        pre: 'http://' + randomString(6)+'.preres1.suning.cn/project/qing/guess/',
        prd: 'http://' + randomString(6)+'.res1.suning.cn/project/qing/guess/',
        local: 'http://10.25.27.51:2000/GuessMe/build/'
    }
    var urlHost = {
        pre: 'http://preres.suning.cn/project/qing/guess/',
        prd: 'http://res.suning.cn/project/qing/guess/',
        local: 'http://10.25.27.51:2000/GuessMe/build/'
    }
    var baseApi = {
        pre: 'http://lightpre.cnsuning.com/guess/actionGoodsInfoList-' + callback + '.htm',
        prd: 'http://light.suning.com/guess/actionGoodsInfoList-' + callback + '.htm',
        local: 'http://10.25.27.51:8080/guess/actionGoodsInfoList-' + callback + '.htm'
    }

    var chance = {
        pre: 'http://lightpre.cnsuning.com/guess/getUserGuessAndShareCount.do',
        prd: 'http://light.suning.com/guess/getUserGuessAndShareCount.do',
        local: 'http://10.25.27.51:8080/guess/getUserGuessAndShareCount.do'
    }

    var countApi = {
        pre: "http://lightpre.cnsuning.com/guess/queryCurrentUserCount-" + actionId + "-" + callback + ".htm",
        prd: "http://light.suning.com/guess/queryCurrentUserCount-" + actionId + "-" + callback + ".htm",
        local: 'http://10.25.27.51:8080/guess/queryCurrentUserCount-' + actionId + '-' + callback + '.htm'
    }

    var awardList = {
        pre: 'http://lightpre.cnsuning.com/guess/queryLastWinningList-' + actionId + '-' + callback + '.htm',
        prd: 'http://light.suning.com/guess/queryLastWinningList-' + actionId + '-' + callback + '.htm',
        local: 'http://10.25.27.51:8080/guess/queryLastWinningList-' + actionId + '-' + callback + '.htm'
    }

    var wxapis = {
        pre: 'http://mobimsgpre.cnsuning.com/suning-web-mobile/weixin/public/requestUserInfo.htm?weixinRedirectUrl=',
        prd: 'http://mobts.suning.com/suning-web-mobile/weixin/public/requestUserInfo.htm?weixinRedirectUrl=',
        local: ''
    }

    var guessHis = {
        pre: 'http://lightpre.cnsuning.com/guess/queryMyGuessRecord.do',
        prd: 'http://light.suning.com/guess/queryMyGuessRecord.do',
        local: 'http://10.25.27.51:8080/guess/queryMyGuessRecord.do'
    }

    var doGuess = {
        pre: 'http://lightpre.cnsuning.com/guess/guessPrice.do',
        prd: 'http://light.suning.com/guess/guessPrice.do',
        local: 'http://10.25.27.51:8080/guess/guessPrice.do'
    }

    var toShare = {
        pre: 'http://lightpre.cnsuning.com/guess/addGuessNumber.do',
        prd: 'http://light.suning.com/guess/addGuessNumber.do',
        local: 'http://10.25.27.51:8080/guess/addGuessNumber.do'
    }


    var telSend = {
        pre: 'http://lightpre.cnsuning.com/guess/saveUserPhoneNumber.do',
        prd: 'http://light.suning.com/guess/saveUserPhoneNumber.do',
        local: 'http://10.25.27.51:8080/guess/saveUserPhoneNumber.do'
    }

    var detail_encode = {
        pre: encodeURIComponent(urlHost[env] + 'detail.html'),
        prd: encodeURIComponent(urlHost[env] + 'detail.html'),
        local: encodeURIComponent(urlHost[env] + 'detail.html')
    }

    return {
        //接口
        base: baseApi[env],
        count: countApi[env],
        awardList: awardList[env],
        guessHis: guessHis[env],
        doGuessUrl: doGuess[env],
        toShare: toShare[env],
        telSend: telSend[env],
        chance: chance[env],
        wxToken: wxToken[env],

        //跳转
        index: urlHost[env] + 'index.html',
        detail: wxapis[env] + detail_encode[env],
        detail_in: urlHost[env] + 'detail.html',
        wxapi: wxapis[env],
        error: urlHost[env] + 'error_-1.html',
        error_2: urlHost[env] + 'error_2.html',
        error_3: urlHost[env] + 'error_3.html',
        first_award: urlHost[env] + 'first_award.html',
        gameOver: urlHost[env] + 'gameover.html',
        greedy: urlHost[env] + 'greedy.html',
        later_bird: urlHost[env] + 'later_bird.html',
        second_award: urlHost[env] + 'second_award.html',
        draw: urlHost[env] + 'draw.html',
        tel_success: urlHost[env] + 'tel_success.html',
        tel_fail: urlHost[env] + 'tel_fail.html',
        urlLinks: urlLinks[env]
    }
}
