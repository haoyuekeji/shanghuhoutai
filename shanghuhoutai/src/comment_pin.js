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
    console.log(val.isComment)
    if (val.isComment) {
      $('.all').append('<div class="comment-cons">' +
        ' <div class="comment-cons-img">' +
        ' <img src="' + val.tProducts.indexPic.split(',')[0] + '" alt="123" width="80%">' +
        '</div>' +
        '<div class="comment-cons-con">' +
        val.comment.message +
        '</div>' +
        ' <div class="comment-cons-name">' +
        '  客户：' + val.tDeliver.receiver +
        '</div>' +
        '<div class="comment-cons-details">' +
        '<div>' + val.tProducts.pname + '</div>' +
        '<div>￥' + val.totalPrice + '</div>' +
        '</div>' +
        '<div class="comment-cons-sure">' +
        '   <input type="button" value="更多" name="true">' +
        '</div>' +
        ' <div class="comment-cons-none">' +
        '<div class="imgs">' +

        '</div>' +
        //  ' <div class="comment-cons-none-seller">'+
        //       '<div class="comment-cons-none-seller-name">'+
        //         '  "回复："'+
        //      ' </div>'+
        //       '<div class="comment-cons-none-seller-con">'+
        //          ' 呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵'+
        //       '</div>'+
        //   '</div>'+

        // '<div class="comment-cons-none-con">'+
        //   '<div class="comment-cons-none-con-name">'+
        //   '  "客户：名称"'+val.tDeliver.receiver+
        //  ' </div>'+
        //  ' <div class="comment-cons-none-con-con">'+
        //  ' <div>'+
        //       '"快递很快，东西很好""快递很快，东西一般快递很快，东西一般快递很 快，东西一般快递很快，东西一般东西一般东西一般东西一般东西一""快递很快，东西一般快递很快，东西一般快递很快，东西一般快递很快，东西一般东西一般东西 一般东西一般东西一""快递很快，东西一般快递很快，东西一般快递很快，东西一般快递很快，东西一般东西一般东西'+
        //   '</div>'+
        //   '<div class="images">'+
        //   '    <img src="images/worse.png" alt="123">'+
        //  '     <img src="images/worse.png" alt="123">'+
        //   '    <img src="images/worse.png" alt="123">'+
        //   '    <img src="images/worse.png" alt="123">'+
        //   '    <img src="images/worse.png" alt="123">'+
        //   '    <img src="images/worse.png" alt="123">'+
        //  ' </div>'+
        //  ' </div>'+
        // '<div class="comment-cons-none-con-resend-con">'+
        //  '   <textarea name="" id="" cols="125" rows="5" placeholder="输入回复内容"></textarea>'+
        // '</div>'+
        //   '<div class="comment-cons-none-sure">'+
        //     '  <input type="button" value="回复">'+
        //  ' </div>'+
        // '</div>'+
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>')
      var imgs = val.comment.pics.split(',')
      imgs.forEach(function (val1, key1) {
        $('.imgs').eq(key).append(' <img src="' + val1 + '" alt="123">')
      });
    }
  });

}

function addhtml2_(content) {
  content.forEach(function (val, key) {
    val.tuanOrdersList.forEach(function (val, key) {
      if (val.iscomment) {
        $('.all').append('<div class="comment-cons">' +
          ' <div class="comment-cons-img">' +
          ' <img src="' + val.tProducts.indexPic.split(',')[0] + '" alt="123" width="80%">' +
          '</div>' +
          '<div class="comment-cons-con">' +
          val.comment.message +
          '</div>' +
          ' <div class="comment-cons-name">' +
          '  "客户：' + val.tDeliver.receiver +
          '</div>' +
          '<div class="comment-cons-details">' +
          '<div>' + val.tProducts.pname + '</div>' +
          '<div>￥' + val.totalPrice + '</div>' +
          '</div>' +
          '<div class="comment-cons-sure">' +
          '   <input type="button" value="更多" name="true">' +
          '</div>' +
          ' <div class="comment-cons-none">' +
          '<div class="imgs">' +

          '</div>' +
          //  ' <div class="comment-cons-none-seller">'+
          //       '<div class="comment-cons-none-seller-name">'+
          //         '  "回复："'+
          //      ' </div>'+
          //       '<div class="comment-cons-none-seller-con">'+
          //          ' 呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵'+
          //       '</div>'+
          //   '</div>'+

          // '<div class="comment-cons-none-con">'+
          //   '<div class="comment-cons-none-con-name">'+
          //   '  "客户：名称"'+val.tDeliver.receiver+
          //  ' </div>'+
          //  ' <div class="comment-cons-none-con-con">'+
          //  ' <div>'+
          //       '"快递很快，东西很好""快递很快，东西一般快递很快，东西一般快递很 快，东西一般快递很快，东西一般东西一般东西一般东西一般东西一""快递很快，东西一般快递很快，东西一般快递很快，东西一般快递很快，东西一般东西一般东西 一般东西一般东西一""快递很快，东西一般快递很快，东西一般快递很快，东西一般快递很快，东西一般东西一般东西'+
          //   '</div>'+
          //   '<div class="images">'+
          //   '    <img src="images/worse.png" alt="123">'+
          //  '     <img src="images/worse.png" alt="123">'+
          //   '    <img src="images/worse.png" alt="123">'+
          //   '    <img src="images/worse.png" alt="123">'+
          //   '    <img src="images/worse.png" alt="123">'+
          //   '    <img src="images/worse.png" alt="123">'+
          //  ' </div>'+
          //  ' </div>'+
          // '<div class="comment-cons-none-con-resend-con">'+
          //  '   <textarea name="" id="" cols="125" rows="5" placeholder="输入回复内容"></textarea>'+
          // '</div>'+
          //   '<div class="comment-cons-none-sure">'+
          //     '  <input type="button" value="回复">'+
          //  ' </div>'+
          // '</div>'+
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>')
        var imgs = val.comment.pics.split(',')
        imgs.forEach(function (val1, key1) {
          $('.imgs').eq(key).append(' <img src="' + val1 + '" alt="123">')
        });
      }
    })
  });
}
$.post(localhost + '/tuan/torders/list', {
  saleId: 3,
  state: '已完成订单',
  showsale: true,
  online_code: onlinecode
}, function (res) {
  outline(res)
  var content = res.data.content
  addhtml1_(content)
})
$.post(localhost + '/tuan/tuanorders/list', {
  saleId: token,
  state: '已完成团购订单',
  showsale: true,
  online_code: onlinecode
}, function (res) {
  outline(res)
  var content = res.data
  addhtml2_(content)
})