var PhoneNumber = window.location.href.split('=')[1]
var mm = /^(?![^a-zA-Z]+$)(?!\D+$)/; // 密码正则 6—18位数字加字母
var mm_ = false
var code = localStorage.getItem('yanzhengcode_pin')
var code_ = window.location.href.split('=')[2]
if (code === null || code !== code_) {
  alert('您还没有填写验证码')
  location.href = 'resetPass_pin.html'
}

$('.mima').eq(0).find('input').blur(function () {
  var val = $(this).val()
  if (!mm.test(val)) {
    alert('密码为6-18位字母和数字！')
  } else {
    mm_ = true
  }
})

$('.mima').eq(1).find('input').blur(function () {
  var mima1 = $('.mima').eq(0).find('input').val()
  var mima2 = $(this).val()
  if (mima1 === mima2) {
  } else {
    alert('密码不一致！')
  }
})

$('.button').click(function () {
  var mima1 = $('.mima').find('input').eq(0).val()
  var mima2 = $('.mima').find('input').eq(1).val()
  if (mima1 === mima2 && mm_ !== false) {
    $.post(localhost + '/tuan/tusersale/forgetpass', { phone: PhoneNumber, newpass: mima1 }, function (data) {
      if (data.message === '操作成功') {
        localStorage.removeItem('yanzhengcode_pin')
        alert(data.message + '!')
        location.href = 'login_pin.html'
      } else {
        alert(data.message + '!')
      }
    })
  } else {
    alert('信息不完善！')
  }
})