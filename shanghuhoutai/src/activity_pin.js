
$.post(localhost + '/tuan/tusersale/index', {
    id: token
}, function (res) {
    if (res.data[2]) {
        $('.pack-top-con-stu').html('关闭')
    }
})

$('.pack-top-con-stu').click(function () {
    var redpacket = true
    if ($(this).html() === '开启') {
        redpacket = true
        $(this).html('关闭')
    } else {
        redpacket = false
        $(this).html('开启')
    }
    $.post(localhost + '/tuan/tusersale/redpacket', {
        saleId: token,
        redpacket: redpacket
    }, function (res) {
        if (res.error) {
            alert(res.message)
        } else {
            if (res.message === "操作成功") {
                alert(res.message)
            }
        }
    })
})
// $('.submit').click(function () {
//     console.log($('.pack input').val())
//     console.log($('.time input').val())
//     // $.post(localhost + '', {}, function () {
//     //
//     // })
// })