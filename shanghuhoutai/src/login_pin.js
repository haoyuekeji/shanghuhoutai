var mm = /^(?![^a-zA-Z]+$)(?!\D+$)/; // 密码正则 6—18位数字加字母
var phone = /^1(3|4|5|7|8)\d{9}$/; // 电话正则
var you_ = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/; // 邮箱正则

// 判断cookie是否存在
if (localStorage.getItem('checkbox_pin') === '' || localStorage.getItem('checkbox_pin') === undefined) {
  $('.checkbox').find('input').prop('checked', false)
  $('.a').css({ 'display': 'none' })
} else {
  var status = localStorage.getItem('checkbox_pin')
  if (status === false) {
    $('.checkbox').find('input').prop('checked', false)
    $('.a').css({ 'display': 'none' })
  } else {
    if (localStorage.getItem('zhanghao_pin') !== '' && localStorage.getItem('zhanghao_pin') !== undefined) { // 存在并为账号密码赋值
      var zhanghao_ = localStorage.getItem('zhanghao_pin')
      var mima_ = localStorage.getItem('mima_pin')
      $('.zhanghao').find('input').val(zhanghao_)
      $('.mima').find('input').val(mima_)
    }
    $('.checkbox').find('input').prop('checked', true)
    $('.a').css({ 'display': 'inline-block' })
  }
}

// 提交验证
function loding() {
  var zhanghao = $('.zhanghao').find('input').val()
  var mima = $('.mima').find('input').val()

  if (zhanghao !== '' && mima !== '') {
    $.post(localhost + '/tuan/tusersale/login', { name: zhanghao, pass: mima }, function (data) {
      if (data.data !== null) {
        localStorage.setItem('token', data.data.id)
        localStorage.setItem('onlinecode', data.data.onlineCode)
        if ($('.checkbox').find('input').is(':checked')) {
          localStorage.setItem('zhanghao_pin', zhanghao)
          localStorage.setItem('mima_pin', mima)
          location.href = 'all_pin.html'
        } else {
          localStorage.clear('zhanghao_pin')
          localStorage.clear('mima_pin')
          location.href = 'all_pin.html'
        }
      } else {
        $('.hint').html('账号或密码错误！')
      }
    })
  } else {
    $('.hint').html('请勿留空！')
  }
}

// 点击选中checkbox
$('.checkbox span').click(function () {
  if ($(this).siblings('input').is(':checked')) {
    $(this).siblings('input').prop('checked', false)
    $('.a').css({ 'display': 'none' })
    localStorage.setItem('checkbox_pin', false)
  } else {
    $(this).siblings('input').prop('checked', true)
    $('.a').css({ 'display': 'inline-block' })
    localStorage.setItem('checkbox_pin', true)
  }
})

$('.checkbox input').click(function () {
  if ($(this).is(':checked')) {
    $(this).prop('checked', true)
    $('.a').css({ 'display': 'inline-block' })
    localStorage.setItem('checkbox_pin', true)
  } else {
    $(this).prop('checked', false)
    $('.a').css({ 'display': 'none' })
    localStorage.setItem('checkbox_pin', false)
  }
})
// 验证账号是否存在
$('.zhanghao').find('input').blur(function () {
  var zhanghao = $(this).val()
  if (zhanghao !== '') {
    if (phone.test(zhanghao) || you_.test(zhanghao)) {
      $('.hint').html('')
      $(this).css({ 'color': 'green' })
      $.post(localhost + '/tuan/tusersale/findone', { phone: zhanghao }, function (data) {
        if (data.data.length === 0) {
          $(this).css({ 'color': 'red' })
          $('.hint').html('该账号不存在！')
        } else {
          $(this).css({ 'color': 'green' })
        }
      })
    } else {
      $(this).css({ 'color': 'red' })
      $('.hint').html('账号格式错误！')
    }
  } else {
    $('.hint').html('账号不能为空！')
  }
})

// 验证格式是否正确
$('.mima').find('input').blur(function () {
  var mima = $(this).val()
  if (mima !== '') {
    if (!mm.test(mima)) {
      $(this).css({ 'color': 'red' })
      $('.hint').html('密码为6-18位字母和数字！')
    } else {
      $(this).css({ 'color': 'green' })
      $('.hint').html('')
    }
  } else {
    $('.hint').html('密码不能为空！')
  }
})

//  提交验证，并返回信息，如验证通过，判断是否存入cookie并进行页面跳转
$('.button').click(function () {
  loding()
})
$('body').on('keydown', function (e) {
  if (e.keyCode === 13) {
    loding()
  }
})
