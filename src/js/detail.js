$(function () {
    //数据
    var params = purl().param()
    var wxOpenId = params.wx_openid
    var actionId = 'fuck'
    var userType = 1
    var result = '0'
    var goodsIdNow = ''
    var goodsPicUrlNow = ''
    var partNameNow = ''
    var guessCount = ''
    var shareRemain = ''
    //console.log(helper.dateFormat(mydate,'yyyy.MM.dd'))
    //商品图片链接

    function getPic(e) {
        var a = "",
            t = "http://image?.suning.cn";
        if (e && e.toString().length <= 18) for (var s = 18 - e.toString().length, n = 0; s > n; n++) a += "0";
        var i = a + e;
        return t = t.replace("?", parseInt(Math.floor(10 * Math.random()) % parseInt("3") + 1)),
        i && (t = t + "/b2c/catentries/" + i + "_1_400x400.jpg"),
            t
    }

    //手机号码加密
    function tel(tmp) {
        tmp = tmp.replace(/(.{3}).*(.{3})/, "$1*****$2")
        return tmp
    }

    //中奖滚动
    function awardList(aw) {
        var ul = $(aw).find('ul'),
            lis = ul.find('li');
        if (lis.length <= 1)return;
        ul.css('top', 0);
        setInterval(goUp, 3000);

        function goUp() {
            ul.animate({top: "-.7rem"}, 300, function () {
                ul.children().first().appendTo(ul);
                ul.css('top', 0);
            });
        }
    }

    //弹出价格输入框
    function doGuess(a, b) {
        coverShow()
        $('#guess-pri').find('img').attr('src', a)
        $('#guess-pri').find('.title').html(b)
        $('#guess-pri').find('input').val('')
        $('#guess-pri').removeClass('hide')
        $('#guess-pri').find('.en-can').on('click', function () {
            $('#guess-pri').addClass('hide')
            coverRemove()
        })
    }

    //活动已结束状态可点击按钮
    function coverToolBar() {
        coverShow()
        $('.act-over').removeClass('hide')

        $('.close').on('click', function () {
            coverShow()
            $(this).parent().height(0).css('bottom', '-2rem')
            $('.act-over').removeClass('hide')
        })
    }

    //分享弹窗
    function sharePoP() {
        $('#more-chance').removeClass('hide')
        coverShow()
    }

    //分享提示
    function shareHandler() {
        coverShow()
        $('.share-helper').removeClass('hide')
        $('.share-helper').find('p').on('click', function () {
            $('.share-helper').addClass('hide')
            coverRemove()
        })
    }

    //分享次数超限
    function toMoreShare() {
        $('#more-chance').addClass('hide')
        coverRemove()
        window.location.href = g().gameOver
    }

    //基础信息获取
    helper.fuckAjax(g('', 'jsonpCallBack').base, {}, function (data) {
        result = parseInt(data.resultCode)
        actionId = data.actionInfo.actionId
        var begin = helper.dateFormat(new Date(parseInt(data.actionInfo.actionStartTime)), 'yyyy.MM.dd')
        var end = helper.dateFormat(new Date(parseInt(data.actionInfo.actionEndTime)), 'yyyy.MM.dd')
        var length = data.goodsInfoList.length || 0
        //活动状态
        switch (result) {
            case -1:
                window.location.href = g().error
                break
            case 0:
                init();
                break
            case 1:
                window.location.href = g().error_3
                break
            case 2:
                window.location.href = g().error_2
            case 3:
                infoInit()
                coverShow()
                coverToolBar()
                break
        }
        //详情页初始化
        function infoInit() {
            //加载商品
            for (var i = 0; i < length; i++) {
                var partNumber = data.goodsInfoList[i].partNumber
                var partName = data.goodsInfoList[i].partName
                var price = data.goodsInfoList[i].price
                var goodsPicUrl = getPic(partNumber)
                var goodsId = data.goodsInfoList[i].goodsId
                var htmGood = '<li class="goods"><a href="javascript:;"><img src=' + goodsPicUrl + ' alt=""/></a><p class="g-name">' + partName + '</p> <p class="g-pri clearfix"><span>&yen;?</span><i>S码神秘价</i></p> <p class="g-s-pri">市场价&nbsp;&yen;<em>' + price + '</em></p> <a class="g-m-btn" href="javascript:;" data-goodsid="' + goodsId + '" data-url="' + goodsPicUrl + '" data-name="' + partName + '">我要猜价</a></li>'
                $('#guess-list').append(htmGood)
            }
            //活动规则
            $('#beginTime').html(begin)
            $('#endTime').html(end)
            //当前参与人数
            helper.fuckAjax(g(actionId, 'jsonpCallback1').count, {}, function (dataC) {
                var count = dataC.currentUserCount.toString()
                $('.user-count').find('em').html(count)
            }, function () {
                console.log('已参与人数没取到')
            }, 10000, 'jsonpCallback1')
            //中奖列表
            helper.fuckAjax(g(actionId, 'jsonpCallback2').awardList, {}, function (dataL) {
                if (dataL.firstWinList.length > 0)
                    $('.st-aw').find('ul').html('')
                for (var i = 0; i < dataL.firstWinList.length; i++) {
                    var istListPhone = dataL.firstWinList[i].phoneNumber
                    var istListName = dataL.firstWinList[i].partName

                    var istInfo = '<li>恭喜<em>' + tel(istListPhone) + '</em>&nbsp;猜对『<em class="aw-goods">' + istListName + '</em>』价格,获得免单资格</li>'
                    $('.st-aw').find('ul').append(istInfo)
                }
                for (var i = 0; i < dataL.secondWinList.length; i++) {
                    var secListPhone = dataL.secondWinList[i].phoneNumber
                    var secListName = dataL.secondWinList[i].partName

                    var secInfo = '<li>恭喜<em>' + tel(secListPhone) + '</em>&nbsp;猜对『<em class="aw-goods">' + secListName + '</em>』价格区间，获得S码</li>'
                    $('.se-aw').find('ul').append(secInfo)
                }
                awardList('.st-aw')
                awardList('.se-aw')
            }, function () {
                console.log('中奖名单没取到')
            }, 10000, 'jsonpCallback2')
            //用户中奖记录
            helper.makeAjax(g().guessHis, {actionId: actionId, userType: userType, openId: wxOpenId}, function (dataH) {
                if (dataH.length >= 1) {
                    $('.prey-list').html('')
                    for (var i = 0; i < dataH.length; i++) {
                        var partNumber = dataH[i].partNumber
                        var partName = dataH[i].partName
                        var guessPrice = dataH[i].guessPrice
                        var price = dataH[i].price
                        var userGuessPrice = dataH[i].userGuessPrice
                        var winningType = parseInt(dataH[i].winningType)
                        var picUrl = getPic(partNumber)

                        function listFirst() {
                            var htmDom = '<li class="clearfix"><a href="javascript:;" class="prey-img"> <img src=' + picUrl + ' alt=""/> </a> <div class="prey-main"> <p class="p-title">' + partName + '</p> <p class="p-spri">S码神秘价:&yen;<em>' + guessPrice + '</em></p> <p class="p-pri">市场价:&yen;<em>' + price + '</em></p> <p class="p-mine">我的猜价:&yen;<em>' + userGuessPrice + '</em></p> </div> <div class="award free"></div> </li>'
                            $('.prey-list').append(htmDom)
                        }

                        function listSecond() {
                            var htmDom = '<li class="clearfix"><a href="javascript:;" class="prey-img"> <img src=' + picUrl + ' alt=""/> </a> <div class="prey-main"> <p class="p-title">' + partName + '</p> <p class="p-spri">S码神秘价:&yen;<em>?</em></p> <p class="p-pri">市场价:&yen;<em>' + price + '</em></p> <p class="p-mine">我的猜价:&yen;<em>' + userGuessPrice + '</em></p> </div> <div class="award scode"></div> </li>'
                            $('.prey-list').append(htmDom)
                        }

                        function listThird() {
                            var htmDom = '<li class="clearfix"><a href="javascript:;" class="prey-img"> <img src=' + picUrl + ' alt=""/> </a> <div class="prey-main"> <p class="p-title">' + partName + '</p> <p class="p-spri">S码神秘价:&yen;<em>?</em></p> <p class="p-pri">市场价:&yen;<em>' + price + '</em></p> <p class="p-mine">我的猜价:&yen;<em>' + userGuessPrice + '</em></p> </div> <div class="award draw"></div> </li>'
                            $('.prey-list').append(htmDom)
                        }

                        switch (winningType) {
                            case 1:
                                listFirst()
                                break
                            case 2:
                                listSecond()
                                break
                            case 3:
                                listThird()
                                break
                        }
                    }
                }
            }, function () {
                console.log('fail')
            })
        }

        function init() {
            infoInit()
            //次数检测
            helper.makeAjax(g().chance, {actionId: actionId, userType: userType, openId: wxOpenId}, function (dataCH) {
                var resultCode = parseInt(dataCH.resultCode)
                var guessRemain = dataCH.guessRemainCount
                shareRemain = dataCH.shareRemainCount
                guessCount = dataCH.guessCount
                switch (resultCode) {
                    case -1:
                        window.location.href = g().error
                        break
                    case 0:
                        window.location.href = g().error
                        break
                    case 1:

                        if (guessRemain == 0) {
                            if (shareRemain > 0) {
                                $('#guess-chance').html(guessCount)
                                $('#share-chance').html(shareRemain)
                                sharePoP()
                                $('#more-chance').find('.to-share').on('click', function () {
                                    $('#more-chance').addClass('hide')
                                    helper.makeAjax(g().toShare, {
                                        userType: userType,
                                        openId: wxOpenId,
                                        actionId: actionId
                                    }, function (dataS) {
                                        var shareStatus = parseInt(dataS.resultCode)
                                        switch (shareStatus) {
                                            case -1:
                                                window.location.href = g().error
                                                break
                                            case 0:
                                                shareHandler()
                                                break
                                            case 1:
                                                window.location.href = g().error
                                                break
                                            case 2:
                                                window.location.href = g().gameOver
                                                break
                                        }
                                    })
                                })
                            } else {
                                $('.act-over').find('.error-contain').html('次数已用完')
                                $('.act-over').removeClass('hide')
                                coverToolBar()
                            }
                        }
                        break
                }
            })

            //我要猜价
            $('#guess-list').find('.goods .g-m-btn').on('click', function () {
                goodsIdNow = $(this).data('goodsid')
                goodsPicUrlNow = $(this).data('url')
                partNameNow = $(this).data('name')
                doGuess(goodsPicUrlNow, partNameNow)
            })
        }

        //猜价提交
        $('#guess-pri').find('.en-btn').on('click', function () {
            var yuan = $('#yuan').val()
            var fen = $('#fen').val()
            if (yuan == '' && fen == '') {
                $('#guess-pri').find('.tips').addClass('on-tips')
                $('')
            } else {
                $('#guess-pri').find('.tips').removeClass('on-tips')
                $('#guess-pri').addClass('hide')

                yuan == '' ? yuan = '0' : yuan
                fen == '' ? fen = '0' : fen
                var userGuessPrice = yuan + '.' + fen
                helper.makeAjax(g().doGuessUrl, {
                    actionId: actionId,
                    goodsId: goodsIdNow,
                    userType: userType,
                    openId: wxOpenId,
                    userGuessPrice: userGuessPrice
                }, function (dataP) {
                    var resultCode = parseInt(dataP.resultCode)
                    var winningType = parseInt(dataP.winningType)
                    var winningId = dataP.winningId
                    var ldpUrl = dataP.ldpUrl
                    switch (resultCode) {
                        case -1:
                            window.location.href = g().error
                            break
                        case 0:
                            window.location.href = g().error
                            break
                        case 1:
                            window.location.href = g().error_3
                        case 2:
                            window.location.href = g().error_2
                            break
                        //活动结束
                        case 3:
                            $('.act-over').find('.error-contain').html('活动已结束')
                            $('.act-over').removeClass('hide')
                            coverToolBar()
                            break
                        //分享
                        case 4:
                            $('#guess-chance').html(guessCount)
                            $('#share-chance').html(shareRemain)
                            sharePoP()
                            $('#more-chance').find('.to-share').on('click', function () {
                                $('#more-chance').addClass('hide')
                                helper.makeAjax(g().toShare, {
                                    userType: userType,
                                    openId: wxOpenId,
                                    actionId: actionId
                                }, function (dataS) {
                                    var shareStatus = parseInt(dataS.resultCode)
                                    switch (shareStatus) {
                                        case -1:
                                            window.location.href = g().error
                                            break
                                        case 0:
                                            shareHandler()
                                            break
                                        case 1:
                                            window.location.href = g().error
                                            break
                                        case 2:
                                            toMoreShare()
                                            break
                                    }
                                })
                            })
                            break
                        //彻底玩完了
                        case 5:
                            window.location.href = g().gameOver
                            break
                        //第一次中一等奖
                        case 6:
                            window.location.href = g().first_award + '?' + 'actionId=' + actionId + '&' + 'winningType=' + winningType + '&' + 'winningId=' + winningId + '&' + 'userType=' + userType + '&' + 'openId=' + wxOpenId
                            break
                        //贪心
                        case 7:
                            window.location.href = g().greedy + '?' + 'actionId=' + actionId + '&' + 'winningType=' + winningType + '&' + 'winningId=' + winningId + '&' + 'userType=' + userType + '&' + 'openId=' + wxOpenId
                            break
                        //晚于他人中一等奖
                        case 8:
                            window.location.href = g().later_bird + '?' + 'actionId=' + actionId + '&' + 'winningType=' + winningType + '&' + 'winningId=' + winningId + '&' + 'userType=' + userType + '&' + 'openId=' + wxOpenId
                            break
                        //二等奖
                        case 9:
                            window.location.href = g().second_award + '?' + 'actionId=' + actionId + '&' + 'winningType=' + winningType + '&' + 'winningId=' + winningId + '&' + 'userType=' + userType + '&' + 'openId=' + wxOpenId
                            break
                        //抽奖
                        case 10:
                            window.location.href = g().draw + '?' + 'actionId=' + actionId + '&' + 'winningType=' + winningType + '&' + 'winningId=' + winningId + '&' + 'userType=' + userType + '&' + 'openId=' + wxOpenId + '&' + 'ldpUrl=' + ldpUrl
                            break
                        default :
                            window.location.href = g().error
                    }
                })
            }
        })
        //helper.makeAjax(g().doGuess,{actionId:actionId,goodsId:goodsIdNow})

    }, function () {
        console.log('没取到！！')
    }, 2000, 'jsonpCallBack')

    pageinit.toinit()

})