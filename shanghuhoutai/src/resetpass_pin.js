var sta = 0
var phone = /^1(3|4|5|7|8)\d{9}$/; // 电话正则
var PassWord
var phone_stu = false
var start_time = Date.now()
var end_time = localStorage.getItem('pnonecode_end_pin')
function timeFun(time) {
  var set = setInterval(function () {
    time--
    if (time === 0) {
      $('.time').html('点击获取验证码').css({ 'background': '#2b6eff', 'color': '#fff' })
      sta = 0
      clearInterval(set)
    } else {
      $('.time').html(time + 's后重新获取').css({ 'background': '#ccc', 'color': '#000' })
    }
  }, 1000)
}
//判断是否应该开启计时器
if (end_time !== null) {
  if (start_time <= end_time) {
    var time = Math.ceil((end_time - start_time) / 1000)
    $('.time').html(time + 's后重新获取').css({ 'background': '#ccc', 'color': '#000' })
    sta = 1
    timeFun(time)
  }
}

$('.zhanghao').find('input').on('input', function () {
  var len = $(this).val().length
  if (len === 11) {
    if (phone.test($(this).val())) {
      $.post(localhost + '/tuan/tusersale/findone', { phone: $(this).val() }, function (data) {
        if (data.data.length === 0) {
          $('.zhanghao').find('input').css({ 'color': 'red' })
          $('.hint').html('该账号不存在！')
        } else {
          $('.zhanghao').find('input').css({ 'color': 'green' })
          phone_stu = true
        }
      })
    } else {
      alert('手机号格式错误！')
    }
  }
})
$('.time').click(function () {
  if (phone_stu) {
    if (sta === 0) {
      var time = 60
      localStorage.setItem('pnonecode_end_pin', Date.now()+ 60000)
      sta = 1
      $('.time').html(time + 's后重新获取').css({ 'background': '#ccc', 'color': '#000' })
      $.post(localhost + '/tuan/tusersale/phonecode', { phone: $('.zhanghao').find('input').val() }, function (data) {
        if (data.data !== null && data.data !== '') {
          PassWord = data.data
        }
      })
      timeFun(time)
    }
  } else {
    $('.hint').html('手机号有误！')
  }
})
$('.button').click(function () {
  var val = $('.mima').find('input').val()
  if (val === PassWord) {
    localStorage.setItem('yanzhengcode_pin', PassWord)
    location.href = 'password_pin.html?PhoneNumber=' + $('.zhanghao').find('input').val() + '=' + PassWord
  }
})
