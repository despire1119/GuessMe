//换字
$(function () {
    var winningType = purl().param().winningType
    var wxOpenId = purl().param().openId
    var detail=g().detail_in+'?wx_openid='+wxOpenId
    $('.go-back').find('a').on('click', function () {
        window.location.href=detail
    })
    switch (winningType) {
        case '1':
            var res = $('.result')
            res.find('.res-tit').html('亮瞎了')
            res.find('.res-line1').html('您是首位猜中神秘价的神秘人')
            res.find('.res-cong').html('恭喜您<em>独享</em>免单大奖')
            res.find('.shall-we').html('我们会尽快与您联系，请保持手机畅通！')
            break
        case '2':
            var res = $('.result')
            res.find('.res-tit').addClass('res-line0 re-color').html('S码领取成功')
            res.find('.res-line1').html('S码将以短信的形式发送至您的手机')
            res.find('.res-cong').html('请注意查收。')
            res.find('.shall-we').html('')
            break
    }
})