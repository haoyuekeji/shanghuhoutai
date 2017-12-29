var phone = /^1(3|4|5|7|8)\d{9}$/; // 电话正则
var mm = /^(?![^a-zA-Z]+$)(?!\D+$)/; // 密码正则 6—18位数字加字母
var zhanghao_ = false
var zhanghao1_ = false
var mima1_ = false
var mima2_ = false

// if(window.href = )
if (window.location.href.split('=')[1] !== 'haoyuekeji') {
  $('input').attr('disabled', true)
}
// 验证账户唯一性
$('.zhanghao').eq(1).find('input').blur(function () {
  var zhanghao = $(this).val()
  if (zhanghao !== '') {
    if (!phone.test(zhanghao)) {
      $('.hint').html('账号格式错误！')
      zhanghao_ = false
    } else {
      $('.hint').html('')
      $.post(localhost + '/tuan/tusersale/findone', { phone: zhanghao }, function (data) {
        if (data.data.length === 0) {
          $('.zhanghao').eq(1).find('input').css({ 'color': 'green' })
          zhanghao_ = true
        } else {
          $('.zhanghao').eq(1).find('input').css({ 'color': 'red' })
          $('.hint').html('该手机号已注册！')
          zhanghao_ = false
        }
      })
    }
  } else {
    $('.hint').html('账号不能为空！')
    zhanghao_ = false
  }
})

// 填写用户名
$('.zhanghao').eq(0).find('input').blur(function () {
  var yonghu = $(this).val()
  if (yonghu === '') {
    $('.hint').html('用户名不能为空！')
    zhanghao1_ = false
  } else {
    $.post(localhost + '/tuan/tusersale/findone', { name: yonghu }, function (data) {
      if (data.data.length === 0) {
        $('.zhanghao').eq(0).find('input').css({ 'color': 'green' })
        $('.hint').html('')
        zhanghao1_ = true
      } else {
        $('.zhanghao').eq(0).find('input').css({ 'color': 'red' })
        $('.hint').html('该账号已存在！')
        zhanghao1_ = false
      }
    })
  }
})

// 填写密码
$('.mima').eq(0).find('input').blur(function () {
  var mima1 = $(this).val()
  if (mima1 !== '') {
    if (!mm.test(mima1)) {
      $('.hint').html('密码为6-18位字母和数字！')
      mima1_ = false
    } else {
      $('.hint').html('')
      mima1_ = true
    }
  } else {
    $('.hint').html('密码不能为空！')
    mima1_ = false
  }
})

// 确认密码
$('.mima').eq(1).find('input').blur(function () {
  var mima1 = $('.mima').eq(0).find('input').val()
  var mima2 = $('.mima').eq(1).find('input').val()
  if (mima1 !== mima2) {
    $('.mima').find('input').css({
      'color': 'red'
    })
    $('.hint').html('两次密码不一致！')
    mima2_ = false
  } else {
    $('.mima').find('input').css({
      'color': 'green'
    })
    $('.hint').html('')
    mima2_ = true
  }
})

// 提交注册并验证信息完善
$('.button').click(function () {
  var yonghu = $('.zhanghao').eq(0).find('input').val()
  var zhanghao = $('.zhanghao').eq(1).find('input').val()
  var mima1 = $('.mima').eq(0).find('input').val()
  var mima2 = $('.mima').eq(1).find('input').val()
  var APPID = $('.APPID').find('input').val()
  var authority = $('.authority').find('input').val()
  if (zhanghao !== '' && mima1 !== '' && mima2 !== '' && APPID !== '' && authority !== '') {
    $('.hint').html('')
    if (mima1_ === true && mima2_ === true && zhanghao_ === true && zhanghao1_ === true) {
      $.post(localhost + '/tuan/tusersale/save', {
        name: yonghu,
        pass: mima1,
        phone: zhanghao,
        authority: authority,
        appId: APPID
      }, function (data) {
        if (data.error === false && data.message === '操作成功') {
          alert("注册成功！")
          location.href = 'login_pin.html'
        } else {
          alert(data.message)
        }
      })
    } else {
      $('.hint').html('前面有错，请认真填写！')
    }
  } else {
    $('.hint').html('请勿留空！')
  }
})