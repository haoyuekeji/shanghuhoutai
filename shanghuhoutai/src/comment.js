var pageNumber = 0

$('.all').on('click', '.comment-cons-sure input', function () {
    var stu = eval($(this).prop('name')) === false ? false : true
    $(this).prop('name', !stu)
    if (stu) {
        $(this).val('隐藏')
        $(this).parents('.comment-cons').find('.comment-cons-none').slideDown()
    } else {
        $(this).val('更多')
        $(this).parents('.comment-cons').find('.comment-cons-none').slideUp()
    }
})

function addhtml1_(content) {
    content.forEach(function (val, key) {
        console.log(val.products[0].indexImages.split(','))
        if (val.iscomment) {
            $('.all').append('<div class="comment-cons">' +
                ' <div class="comment-cons-img">' +
                ' <img src="' + val.products[0].indexImages.split(",") + '" alt="123" width="80%">' +
                '</div>' +
                '<div class="comment-cons-con">' +
                val.comment.message +
                '</div>' +
                ' <div class="comment-cons-name">' +
                '  客户：' + val.wxname +
                '</div>' +
                '<div class="comment-cons-details">' +
                '<div>' + val.products[0].pname + '</div>' +
                '<div>￥' + val.totalPrice + '</div>' +
                '</div>' +
                '<div class="comment-cons-sure">' +
                '   <input type="button" value="更多" name="true">' +
                '</div>' +
                ' <div class="comment-cons-none">' +
                '<div class="imgs">' +

                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>')
            var imgs = val.comment.images.split(',')
            imgs.forEach(function (val1, key1) {
                $('.imgs').eq(key).append(' <img src="' + val1 + '" alt="123">')
            });
        }
    });

}
$.post(localhost + '/comment/list',{
    sellerId:token,
    pageNumber:pageNumber,
    online_code: onlinecode
},function (res) {
    outline(res)
    var content = res.data.content
    console.log(content)
    addhtml1_(content)
})

