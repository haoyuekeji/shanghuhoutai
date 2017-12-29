var phone = /^1(3|4|5|7|8)\d{9}$/
var phone_init = false
$('.phone').blur(function () {
  var val_ = $(this).val()
  if (!phone.test(val_)) {
    phone_init = false
    $('.init').html('电话号码格式错误！').fadeIn()
    setTimeout(function () {
      $('.init').fadeOut()
    }, 1200)
  }else {
    phone_init = true
  }
})

$('.button').click(function () {
  var name = $('.name').val()
  var phone = $('.phone').val()
  var mail = $('.mail').val()
  var address = $('.address').val()
  var message = $('.message').val()
  if (name === '' || phone === '' || message === '' || phone_init === false) {
    $('.init').html('姓名、号码、留言为必填项！').fadeIn()
    setTimeout(function () {
      $('.init').fadeOut()
    }, 1200)
  } else {
    $.post('https://www.cslapp.com/leave-message/save', {
      name: name,
      phone: phone,
      email: mail,
      address: address,
      message: message,
      token: 3
    }, function (res) {
      if (res.message === '操作成功') {
        alert('感谢您的支持，我们会尽快答复！')
      }
    })
  }
})
