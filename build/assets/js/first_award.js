$(function () {
    //获取数据
    var params = purl().param()
    var actionId = params.actionId
    var winningType = params.winningType
    var openId = params.openId
    var userType = params.userType
    var ldpUrl = params.ldpUrl || ''
    var phoneNumberNow = '18512581437'
    var userInfo = {
        actionId: params.actionId,
        winningType: params.winningType,
        winningId: params.winningId,
        userType: params.userType,
        openId: params.openId,
        phoneNumber: phoneNumberNow
    }

    var fa = {
        submitEvent: function () {
            $(".con").find('.user-tel').on("blur", function () {
                var mobile = $.trim($(".con").find('.user-tel').val())
                var mobileRg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                //var valArray = window.localStorage ? (JSON.parse(localStorage.getItem("person")) || []) : [];
                if (!mobileRg.test(mobile)) {
                    $('.res-wrapper').find('.tips').removeClass('conceal')
                    $('#send-tel').attr('disabled', 'true')
                    return false
                } else {
                    $('#send-tel').removeAttr('disabled')

                    $('.res-wrapper').find('.tips').addClass('conceal')
                    $('#send-tel').on('click', function () {
                        phoneNumberNow = $('.con').find('.user-tel').val()
                        userInfo.phoneNumber = phoneNumberNow
                        helper.makeAjax(g().telSend, userInfo, function (dataT) {
                            var status = parseInt(dataT.resultCode)
                            switch (status) {
                                case -1:
                                    window.location.href = g().error
                                    break
                                case 0:
                                    window.location.href = g().tel_success + '?' + 'openId=' + openId + '&' + 'userType=' + userType + '&' + 'winningType=' + winningType + '&' + 'ldpUrl=' + ldpUrl + '&' + 'actionId=' + actionId
                                    break
                                case 1:
                                    window.location.href = g().error
                                    break
                                case 2:
                                    window.location.href = g().tel_success + '?' + 'openId=' + openId + '&' + 'userType=' + userType + '&' + 'winningType=' + winningType + '&' + 'ldpUrl=' + ldpUrl + '&' + 'actionId=' + actionId
                                    break
                                case 3:
                                    window.location.href = g().tel_fail + '?' + 'openId=' + openId + '&' + 'userType=' + userType + '&' + 'winningType=' + winningType + '&' + 'ldpUrl=' + ldpUrl + '&' + 'actionId=' + actionId
                                    break
                                default :
                                    window.location.href = g().error
                            }
                        })
                    })
                }
            }).on("focus", function () {
                $('.res-wrapper').find('.tips').addClass('conceal')
            })

        },
        pageShareHandler: function () {
            $('.to-share').on('click', function () {
                helper.makeAjax(g().toShare, {
                    userType: userType,
                    openId: openId,
                    actionId: actionId
                }, function (data) {
                    var shareStatus = parseInt(data.resultCode)
                    switch (shareStatus) {
                        case -1:
                            window.location.href = g().error
                            break
                        case 0:
                            fa.shareHandler()
                            break
                        case 1:
                            window.location.href = g().error
                            break
                        case 2:
                            window.location.href = g().gameOver
                            break
                        default :
                            window.location.href = g().error
                    }
                })
            })
        },
        shareHandler: function () {
            fa.coverShow()
            $('.share-helper').removeClass('hide')
            $('.share-helper').find('p').on('click', function () {
                $('.share-helper').addClass('hide')
                fa.coverRemove()
            })
        },
        coverShow: function () {
            $('html').css('overflow', 'hidden')
            $('.cover').removeClass('hide')
            $('.det-toolbar').addClass('hide')
        },
        coverRemove: function () {
            $('html').css('overflow', 'auto')
            $('.cover').addClass('hide')
            $('.det-toolbar').removeClass('hide')
        },
        goToDraw: function () {
            $('#go-to-draw').attr('href', ldpUrl)
        }
    }
    fa.submitEvent()
    fa.pageShareHandler()
    fa.goToDraw()
    $('.user-tel').focus()

})
