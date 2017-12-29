var you_ = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/; // 邮箱正则
var mm = /^(?![^a-zA-Z]+$)(?!\D+$)/; // 密码正则 6—18位数字加字母
var mima_ = false
var mima1_ = false
var mima2_ = false
var yanzheng_mima = '0'
var sta = 0
var time = 60
var PhoneCode
var Phone = false
var edit_number = 0
var moudle_number = 0
var express = 0
var express_all = []
var index_span = 0
var express_index = 0
var banner_content = []
// 图片排序方法
function sort_img(arr, dom) {
  $(dom).html('')
  arr.forEach(function (val, key) {
    $(dom).append('<div class="show-img-con">' +
      '<div class="last"><</div>' +
      '<img src="' + val + '" alt="" width=\'100%\'>' +
      '<div class="next">></div>' +
      '<div class="loading-show-img-del">' +
      '<img src="images/del.png" alt="" width=\'100%\'>' +
      '</div>' +
      '</div>')
  })
}
// 鼠标移入上下滑入
function arrow_show(dom, fun, dom_) {
  switch (fun) {
    case 'mouseover':
      var width_ = 0
      break
    case 'mouseleave':
      var width_ = '-20px'
      break
    default:
      break
  }
  $(dom).on(fun, dom_, function () {
    $(this).find('.last').stop(true).animate({
      left: width_
    }, 300)
    $(this).find('.next').stop(true).animate({
      right: width_
    }, 300)
  })
}

// 更改数组元素位置
function ArrChange(stu, arr, ind) {
  switch (stu) {
    case 0:
      if (ind > 0) {
        arr.splice(ind - 1, 0, arr[ind])
        arr.splice(ind + 1, 1)
      }
      break
    case 1:
      if (ind < arr.length - 1) {
        arr.splice(ind + 2, 0, arr[ind])
        arr.splice(ind, 1)
      }
      break
    default:
      break
  }
}

// 删除图片
function del_img(ind, dom, arr) {
  arr.splice(ind, 1)
  sort_img(arr, dom)
}

// 获取首页banner图
$.post(localhost + '/seller/index', {
  token: token,
  pageSize: 20,
  active: true,
  online_code: onlinecode
}, function (res) {
  outline(res)
  banner_content = res.data[0].split(',')
  sort_img(banner_content, '.loading-show-img')
  // 鼠标移入上下滑入
  arrow_show('.loading-show-img', 'mouseover', '.show-img-con')
  arrow_show('.uploading-show-img', 'mouseover', '.show-img-con')

  // 鼠标移出上下滑出
  arrow_show('.loading-show-img', 'mouseleave', '.show-img-con')
  arrow_show('.uploading-show-img', 'mouseleave', '.show-img-con')

  // 点击更换主图位置
  $('.loading-show-img').on('click', '.last', function () {
    var ind = $(this).parents('.show-img-con').index()
    ArrChange(0, banner_content, ind)
    sort_img(banner_content, '.loading-show-img')
  })
  $('.loading-show-img').on('click', '.next', function () {
    var ind = $(this).parents('.show-img-con').index()
    ArrChange(1, banner_content, ind)
    sort_img(banner_content, '.loading-show-img')
  })
  // 删除图片
  $('body').on('click', '.loading-show-img-del', function () {
    var className = $(this).parents().parents()[0].className
    var ind = $(this).parents().index()
    switch (className) {
      case 'loading-show-img':
        del_img(ind, '.loading-show-img', banner_content)
        break
      default:
        break
    }
  })

  // 更改首页轮播图的位置
  $('.loading-show-sure').click(function () {
    $.post(localhost + '/seller/update', {
      sellerId: token,
      online_code: onlinecode,
      banners: banner_content.join(','),
      token: token
    }, function (res) {
      if (res.data === '操作成功') {
        alert('更改成功！')
        $.post(localhost + '/seller/index', {
          token: token,
          pageSize: 20,
          active: true,
          online_code: onlinecode
        }, function (res) {
          outline(res)
          var content = res.data[0].split(',')
          sort_img(content, '.loading-show-img')
        })
      }
    })
  })
})

// 快递模板
function addhtml_(i, content) {
  $('.moudle-body').html('')
  if (content.length === 0) {
    $('.moudle-name').append('<div>暂无模板！</div>')
    return false
  }
  $('.moudle-body').append('<div class="moudle">' +
    '<div class="moudle-top">' +
    '<div class="input">' +
    '<span>快递名称：</span>' +
    '<input type="text" calss="dname"  value=' + content[i][0].dname + '>' +
    '<ul></ul>' +
    '</div>' +
    '<div class="input">' +
    '<span>发货地址：</span>' +
    '<textarea name="" id="" cols="30" rows="2">' + content[i][0].origin_address + '</textarea>' +
    '</div>' +
    '<div class="input">' +
    '<span>计价方式：</span>' +
    '<input type="radio" name="express' + express + '">按件数' +
    '<input type="radio" name="express' + express + '">按重量' +
    '</div>' +
    '<div class="input">运送方式：快递</div>' +
    '<div class="sure" title="展开">隐藏</div>' +
    '</div>' +
    '<div class="freight">' +
    '<span>默认运费</span>' +
    '<input type="text" value=' + content[i][0].account + '>' +
    '<span class="jian">件</span>' +
    '<input type="text" value=' + content[i][0].more_account + '>' +
    '<span>元，每增加</span>' +
    '<input type="text" value=' + content[i][0].price + '>' +
    '<span class="jian">件</span>' +
    '<span>，运费增加</span>' +
    '<input type="text" value=' + content[i][0].more_price + '>' +
    '<span>元</span>' +
    '<span class="moudle-up" title="展开">' +
    ' <img src="images/arrow.png" alt="" width="100%">' +
    '</span>' +
    '<span class="post_dname" style="display:none">' + content[i][0].dname + '</span>' +
    ' <span class="moudle-del">删除模板</span>' +
    '</div>' +
    '<div class="moudle-con">' +
    ' <div class="moudle-con-top">' +
    ' <div class="left">' +
    ' <span>运送到</span>' +
    ' </div>' +
    ' <div class="con">' +
    ' <a>首' +
    '<span class="xjian">件数</span>' +
    '  </a>' +
    '  <a> 首费/元 </a>' +
    '  <a>续' +
    '<span class="jian">件</span>' + '数' +
    ' </a>' +
    ' <a>续费/元</a>' +
    ' </div>' +
    ' </div>' +
    ' </div>' +
    '<div class="add-moudle-details">' +
    ' 点击！为指定地区城市设置邮费' +
    '</div>' +
    '<div class="express-sure">' +
    '确 定' +
    '</div>' +
    '</div>')

  for (var k = 1; k < content[i].length; k++) {
    $('.moudle-con').append('<div class="moudle-con-body">' +
      '<div class="id">' + content[i][k].id + '</div>' +
      '<div class="left">' +
      '<span class="address">' +
      content[i][k].destination +
      '</span>' +
      '<span class="edit">编 辑</span>' +
      '</div>' +

      '<div class="con">' +
      '<input type="text" value=' + content[i][k].account + '>' +
      '<input type="text" value=' + content[i][k].price + '>' +
      '<input type="text" value=' + content[i][k].more_account + '>' +
      '<input type="text" value=' + content[i][k].more_price + '>' +
      ' </div>' +
      '<div class="gengxin">更新</div>' +
      '<div class="moudle-details-del">' +
      '  删 除' +
      '</div>' +
      '</div>')
  }
  if (content[i][0].price_type === '件数') {
    $('.moudle-top').eq(0).find('input[type=radio]').eq(0).prop('checked', true)
    $('.moudle').eq(0).find('.jian').html('件')
    $('.moudle').eq(0).find('.xjian').html('件')
  } else {
    $('.moudle-top').eq(0).find('input[type=radio]').eq(1).prop('checked', true)
    $('.moudle').eq(0).find('.jian').html('/kg')
    $('.moudle').eq(0).find('.xjian').html('重')
  }
}
// 获取首页轮播图对应编号并赋值
$.post(localhost + '/seller/index', {
  token: token,
  pageSize: 20,
  active: true,
  online_code: onlinecode
}, function (res) {
  outline(res)

  if (res.data[3] !== null) {
    var input_ = $('.banner-pic').find('input')
    var banner_pic = res.data[3].split(',')
    for (var i = 0; i < input_.length; i++) {
      input_.eq(i).val(banner_pic[i])
    }
  }
})
// 模糊搜索
function findlist(list, listen, substr) {
  var strlist = []
  for (var k = 0; k < list.length; k++) {
    strlist.push(list[k].indexOf(substr))
  }

  for (var j = 0; j < strlist.length; j++) {
    if (strlist[j] >= 0) {
      showlist.push(list[j])
      enlist.push(listen[j])
    }
  }
}

// 获取邮箱信息
$.post(localhost + '/seller/findOne', {
  token: token,
  online_code: onlinecode
}, function (data) {
  outline(data)
  if (data.data.sellerEmail === null) {
    $('.email .hint').html('请先绑定邮箱！').fadeIn()
    setTimeout(function () {
      $('.email .hint').fadeOut()
    }, 1200)
  } else {
    $('.email').find('input').val(data.data.sellerEmail)
  }
})
// 获取快递模板信息
$.post(localhost + '/deliver/getTemplate', {
  sellerId: token,
  online_code: onlinecode
}, function (res) {
  outline(res)
  var content = res.data
  for (var p = 0; p < content.length; p++) {
    $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
  }

  addhtml_(index_span, content)
  $('.moudle-name span').eq(0).addClass('seclect').siblings('.moudle-name span').removeClass('seclect')

})

// 点击切换物流模板
$('.moudle-name').on('click', 'span', function () {
  index_span = $(this).index()
  $('.moudle-name span').eq(index_span).addClass('seclect').siblings('.moudle-name span').removeClass('seclect')
  $.post(localhost + '/deliver/getTemplate', {
    sellerId: token,
    online_code: onlinecode
  }, function (res) {
    outline(res)
    $('.moudle-name').html('')
    var content = res.data
    for (var p = 0; p < content.length; p++) {
      $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
    }
    addhtml_(index_span, content)
    $('.moudle-name span').eq(index_span).addClass('seclect').siblings('.moudle-name span').removeClass('seclect')
  })
})

// 渲染城市信息
for (var i = 0; i < province.length; i++) {
  $('.cover').append('<div class="province">' +
    '<div class="province-left">' +
    '<input type="checkbox">' +
    '<span>' + province[i][0] + '</span>' +
    '</div>' +
    '<div class="province-right">' +
    '</div>' +
    '</div>')
  for (var k = 1; k < province[i].length; k++) {
    $('.province-right').eq(i).append(' <div class="city">' +
      '<input type="checkbox">' +
      '<span>' + province[i][k] + '</span>' +
      '</div>')
  }
}

// 绑定邮箱并返回信息弹出弹窗
$('.bang').click(function () {
  var email = $('.email').find('input').val()
  if (email !== '' && you_.test(email)) {
    $('.email-warn').eq(0).html('')
    $.post(localhost + '/seller/update', {
      token: token,
      sellerEmail: email,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.data === '操作成功') {
        $('.email .hint').html('绑定成功！').fadeIn()
        setTimeout(function () {
          $('.email .hint').fadeOut()
        }, 1200)
      } else {
        $('.email .hint').html('绑定失败！').fadeIn()
        setTimeout(function () {
          $('.email .hint').fadeOut()
        }, 1200)
      }
    })
  } else {
    $('.email-warn').eq(0).html('格式不正确！')
  }
})

// 验证原密码的正确性，防止他人恶意操作
$('.mima').find('input').eq(0).blur(function () {
  var mima = $(this).val()
  $.post(localhost + '/seller/checkPass', {
    token: token,
    oldPass: mima,
    online_code: onlinecode
  }, function (data) {
    outline(data)
    if (data.message === '原密码不正确') {
      $('.email-warn').eq(1).html('原密码不正确！')
    } else {
      mima_ = true
      $('.email-warn').eq(1).html('')
    }
  })
})

// 设置新密码并验证密码格式
$('.mima').find('input').eq(1).blur(function () {
  var mima = $(this).val()
  if (!mm.test(mima)) {
    $('.email-warn').eq(2).html('密码应为6—18位字母加数字！')
  } else {
    $('.email-warn').eq(2).html('')
  }
})

// 验证两次密码同一性
$('.mima').find('input').eq(2).blur(function () {
  var mima1 = $('.mima').find('input').eq(1).val()
  var mima2 = $(this).val()
  if (mima1 === mima2) {
    $('.email-warn').eq(3).html('')
    mima1_ = true
  } else {
    mima1_ = false
    $('.email-warn').eq(3).html('密码不一致！')
  }
})

//获取验证码
$('.yanzheng').click(function () {
  $.post(localhost + '/seller/getPhoneCode',
    {
      token: token
    }, function (res) {
      if (res.error) {
        alert(res.message)
      } else {
        if (res.message === "操作成功") {
          yanzheng_mima = res.data
        }
      }
    }
  )
})
$('.mima').find('input').eq(3).blur(function () {
  var val = $(this).val()
  if (val === yanzheng_mima) {
    mima2_ = true
  }
})
// 提交更改密码返回弹出弹窗
$('.sure-mima').click(function () {
  var mima = $('.mima').find('input').eq(1).val()
  if (mima_ === true && mima1_ === true && mima2_ === true) {
    $.post(localhost + '/seller/update', {
      token: token,
      sellerPass: mima,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.data === '操作成功') {
        $('.mima .hint-sure').html('修改成功！').fadeIn()
        setTimeout(function () {
          $('.mima .hint-sure').fadeOut()
        }, 1200)
      } else {
        $('.mima .hint-sure').html('修改失败！').fadeIn()
        setTimeout(function () {
          $('.mima .hint-sure').fadeOut()
        }, 1200)
      }
    })
  } else {
    $('.mima .hint-sure').html('操作有误！').fadeIn()
    setTimeout(function () {
      $('.mima .hint-sure').fadeOut()
    }, 1200)
  }
})

// 输入新的手机号并查询唯一性
$('.phone').find('input').eq(0).on('input', function () {
  var val = $(this).val()
  if (val.length === 11) {
    $.post(localhost + '/seller/findOne ', {
      sellerPhone: val,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.data === null) {
        $('.phone .email-warn').html('账号已存在！')
        Phone = false
      } else {
        $('.phone .email-warn').html('')
        Phone = true
      }
    })
  }
})

// 点击获取验证码
$('.yanzhengma').click(function () {
  if (sta === 0 && Phone === true) {
    sta = 1
    $('.yanzhengma').html(time + 's后重新获取').css({
      'background': '#ccc',
      'color': '#000'
    })
    $.post(localhost + '/seller/getPhoneCode', {
      token: token,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      PhoneCode = data.data
    })
    var set = setInterval(function () {
      time--
      if (time === 0) {
        time = 60
        $('.yanzhengma').html('点击获取验证码').css({
          'background': '#00d6f8',
          'color': '#000'
        })
        sta = 0
        clearInterval(set)
      } else {
        $('.yanzhengma').html(time + 's后重新获取').css({
          'background': '#ccc',
          'color': '#000'
        })
      }
    }, 1000)
  } else {
    $('.phone .hint-phone').html('账号已存在！').fadeIn()
    setTimeout(function () {
      $('.phone .hint-phone').fadeOut()
    }, 1200)
  }
})

// 输入验证码后点击验证，并返回信息弹出弹窗
$('.sure-phone').click(function () {
  var PhoneNumber = $('.phone').find('input').eq(0).val()
  var val = $('.phone').find('input').eq(1).val()
  if (val !== '' && val === PhoneCode) {
    $.post(localhost + '/seller/update', {
      token: token,
      sellerPhone: PhoneNumber,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.data === '操作成功') {
        $('.phone .hint-phone').html('更换成功！').fadeIn()
        setTimeout(function () {
          $('.phone .hint-phone').fadeOut()
        }, 1200)
      } else {
        $('.phone .hint-phone').html('更换失败！').fadeIn()
        setTimeout(function () {
          $('.phone .hint-phone').fadeOut()
        }, 1200)
      }
    })
  } else {
    $('.phone .hint-phone').html('验证码错误！').fadeIn()
    setTimeout(function () {
      $('.phone .hint-phone').fadeOut()
    }, 1200)
  }
})

// 上传首页banner图
$('#uploading').fileinput({
  language: 'zh', // 设置语言
  uploadUrl: localhost + '/seller/update', // 上传的地址
  allowedFileExtensions: ['jpg', 'png', 'gif'], // 接收的文件后缀,
  maxFileCount: 3,
  enctype: 'multipart/form-data',
  showUpload: true, // 是否显示上传按钮
  showCaption: false, // 是否显示标题
  uploadAsync: false, // 是否异步上传
  browseClass: 'btn btn-primary', // 按钮样式
  previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
  uploadExtraData: function (previewId, index) { // 额外参数的关键点
    var obj = {}
    obj.token = token
    obj.online_code = onlinecode
    return obj
  }
}).on('filebatchuploadsuccess', function (event, data) {
  if (data.response.data === '操作成功') {
    $.post(localhost + '/seller/index', {
      token: token,
      pageSize: 20,
      active: true,
      online_code: onlinecode
    }, function (res) {
      outline(res)
      banner_content = res.data[0].split(',')
      sort_img(banner_content, '.loading-show-img')
    })
  }
}).on('filebatchuploaderror', function (event, data) {
  if (data.response.error === '文件过大') {
    $(' .banner-hint').html(data.response.error + '！').fadeIn()
    setTimeout(function () {
      $('.banner-hint').fadeOut()
    }, 1200)
  }
})

// 上传视频
$('#uploading-video').fileinput({
  language: 'zh', // 设置语言
  uploadUrl: localhost + '/seller/update', // 上传的地址
  allowedFileExtensions: ['mp4', 'avi', 'rmvb'], // 接收的文件后缀
  maxFileCount: 1,
  enctype: 'multipart/form-data',
  showUpload: true, // 是否显示上传按钮
  showCaption: false, // 是否显示标题
  uploadAsync: false, // 是否异步上传
  browseClass: 'btn btn-primary', // 按钮样式
  previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
  uploadExtraData: function (previewId, index) { // 额外参数的关键点
    var obj = {}
    obj.token = token
    obj.online_code = onlinecode
    return obj
  }
}).on('filebatchuploadsuccess', function (event, data) { }).on('filebatchuploaderror', function (event, data) {
  if (data.response.error === '文件过大') {
    $(' .banner-hint').html(data.response.error + '！').fadeIn()
    setTimeout(function () {
      $('.banner-hint').fadeOut()
    }, 1200)
  }
})
// 获取商品编号
$('.banner-pic-sure').click(function () {
  var input_ = $(this).siblings('.input').find('input')
  var val_ = []
  for (var i = 0; i < input_.length; i++) {
    val_.push(input_.eq(i).val())
  }
  $.post(localhost + '/seller/update', {
    token: token,
    lunbo: val_.join(','),
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.data === '操作成功') {
      alert(res.data + '!')
    }
  })
})
// 点击增加细节框
$('body').on('click', '.add-moudle-details', function () {
  $(this).siblings('.moudle-con').append('<div class="moudle-con-body">' +
    '<div class="left">' +
    '<span class="address">' +

    '</span>' +
    '<span class="edit">编 辑</span>' +
    '</div>' +

    '<div class="con">' +
    '<input type="text">' +
    '<input type="text">' +
    '<input type="text">' +
    '<input type="text">' +
    ' </div>' +
    '<div class="moudle-details-del">' +
    '  删 除' +
    '</div>' +
    '</div>')
})

// 点击增加模板
$('body').on('click', '.add-moudle', function () {
  $("body").find('input').removeAttr('disabled')
  $('.moudle-name div').html('')
  express++
  $(this).siblings('.moudle-body').append('<div class="moudle">' +
    '<div class="moudle-top">' +
    '<div class="input">' +
    '<span>快递名称：</span>' +
    '<input type="text" calss="dname">' +
    '<ul></ul>' +
    '</div>' +
    '<div class="input">' +
    '<span>发货地址：</span>' +
    '<textarea name="" id="" cols="30" rows="2"></textarea>' +
    '</div>' +
    '<div class="input">' +
    '<span>计价方式：</span>' +
    '<input type="radio" name="express' + express + '" checked>按件数' +
    '<input type="radio" name="express' + express + '">按重量' +
    '</div>' +
    '<div class="input">运送方式：快递</div>' +
    '<div class="sure" title="展开">隐藏</div>' +
    '</div>' +
    '<div class="freight">' +
    '<span>默认运费</span>' +
    '<input type="text">' +
    '<span class="jian">件</span>' +
    '<input type="text">' +
    '<span>元，每增加</span>' +
    '<input type="text">' +
    '<span class="jian">件</span>' +
    '<span>，运费增加</span>' +
    '<input type="text">' +
    '<span>元</span>' +
    '<span class="moudle-up" title="展开">' +
    ' <img src="images/arrow.png" alt="" width="100%">' +
    '</span>' +
    ' <span class="moudle-del">删除模板</span>' +
    '</div>' +
    '<div class="moudle-con">' +
    ' <div class="moudle-con-top">' +
    ' <div class="left">' +
    ' <span>运送到</span>' +
    ' </div>' +
    ' <div class="con">' +
    ' <a>首' +
    '<span class="xjian">件数</span>' +
    '  </a>' +
    '  <a> 首费/元 </a>' +
    '  <a>续' +
    '<span class="jian">件</span>' + '数' +
    ' </a>' +
    ' <a>续费/元</a>' +
    ' </div>' +
    ' </div>' +
    '<div class="moudle-con-body">' +
    '<div class="left">' +
    '<span class="address">' +

    '</span>' +
    '<span class="edit">编 辑</span>' +
    '</div>' +

    ' <div class="con">' +
    ' <input type="text">' +
    ' <input type="text">' +
    ' <input type="text">' +
    ' <input type="text">' +
    ' </div>' +

    ' <div class="moudle-details-del">' +
    '    删 除' +
    '</div>' +
    ' </div>' +
    '</div>' +
    '<div class="add-moudle-details">' +
    ' 点击！为指定地区城市设置邮费' +
    '</div>' +
    '<div class="express-sure">' +
    '确 定' +
    '</div>' +
    '</div>')
})

// 动态添加搜索结果
$('.moudle-body').on('input', '.moudle-top input', function () {
  showlist = []
  enlist = []
  var vlue = $(this).val()
  $(this).siblings('ul').html('')
  var reg = /^[\u4E00-\u9FA5]+$/
  if (reg.test(vlue)) {
    findlist(list_zh, list_en, vlue)
  }
  for (var i = 0; i < showlist.length; i++) {
    $(this).siblings('ul').append('<li>' + showlist[i] + '</li>')
  }
  if (vlue === '') {
    $(this).siblings('ul').html('')
  }
})

// 点击复制并清空数组
$('.moudle-body').on('click', '.moudle-top li', function () {
  $(this).parents('ul').siblings('input').val($(this).text())
  $(this).parents('ul').html('')
})

// 移出焦点清空
$('.moudle-body').on('blur', '.moudle-top input', function () {
  $(this).val('')
})

// 点击空白处清空ul结构
$('.moudle-body').on('click', function () {
  $('.moudle-top ul').html('')
})

// 点击伸展头部
$('body').on('click', '.moudle-up', function () {
  var ind = $(this).parents().parents().index()
  var text_ = $('.moudle-top').eq(ind).find('input').val()
  if ($(this).attr('title') !== '展开') {
    $(this).parents().siblings('.moudle-top').slideDown()
    $(this).attr('title', '展开')
  }
})

// 点击隐藏收起头部
$('body').on('click', '.sure', function () {
  if ($(this).siblings('.input').find('input').val() !== '' && $(this).siblings('.input').find('textarea').val() !== '') { } else {
    alert('此处信息不可为空！')
    return false
  }
  $(this).parents('.moudle-top').slideUp()
  $(this).parents('.moudle-top').siblings('.freight').children('.moudle-up').attr('title', '关闭')
})

// 点击删除细节模板
$('.moudle-body').on('click', '.moudle-details-del', function () {
  var id = $(this).siblings('.id').text()
  var ind = $(this).parents().parents().parents().index()
  var that = $(this)
  if (confirm('您确定要删除本条详情吗？')) {
    if ($(this).parents('.moudle-con').siblings('.moudle-top').find('input').val() !== '' && id !== '') {
      $(this).parents('.moudle-con').find('.id').length > 1 ?
        $.post(localhost + '/deliver/del', {
          id: id,
          sellerId: token,
          online_code: onlinecode
        }, function (res) {
          outline(res)
          if (res.message === '操作成功') {
            $.post(localhost + '/deliver/getTemplate', {
              sellerId: token,
              online_code: onlinecode
            }, function (res) {
              outline(res)
              var content = res.data
              $('.moudle-name').html('')
              for (var p = 0; p < content.length; p++) {
                $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
              }
              addhtml_(index_span, content)
            })
          }
        }) : alert('请点击右上角删除整个模板！')
    } else {
      $('.moudle').eq(ind).find('.moudle-con-body').length > 1 ?
        $(this).parents('.moudle-con-body').remove() : alert('请点击右上角删除整个模板！')
    }
  }
})

// 点击删除模板
$('.moudle-body').on('click', '.moudle-del', function () {
  var dname = $(this).siblings('.post_dname').text()
  var ind = $(this).parents('.moudle').index()
  var that = $(this)
  if (confirm('您确定要删除模板吗？')) {
    if ($(this).parents('.freight').siblings('.moudle-top').find('input').val() !== '' && ind === 0) {
      $.post(localhost + '/deliver/del', {
        sellerId: token,
        dname: dname,
        online_code: onlinecode
      }, function (res) {
        outline(res)
        if (res.message === '操作成功') {
          index_span-- > 0 ? index_span-- : index_span = 0
          alert(res.message)
          $.post(localhost + '/deliver/getTemplate', {
            sellerId: token,
            online_code: onlinecode
          }, function (res) {
            outline(res)
            var content = res.data
            $('.moudle-name').html('')
            for (var p = 0; p < content.length; p++) {
              $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
            }
            addhtml_(index_span, content)
          })
        }
      })
    } else {
      $(this).parents('.moudle').remove()
    }
  }
})

// 点击文字选中input框
$('.cover').on('click', '.province span', function () {
    if($(this).siblings('input').attr('disabled')==='disabled'){
        $(this).siblings('input').attr({'click':'null'})
    }
  else if ($(this).siblings('input').prop('checked')) {
        $(this).siblings('input').prop('checked', false)
    }
  else {
    $(this).siblings('input').prop('checked', true)
  }
})

// 城市全选大区自动选中
$('.cover').on('click', '.province-right', function () {
  var input_number = $(this).find('input').length
  var number = $(this).find('input:checked').length
  if (number === input_number) {
    $(this).siblings().find('input').prop('checked', true)
  } else {
    $(this).siblings().find('input').prop('checked', false)
  }
})

// 点击大区全选城市
$('.cover').on('click', '.province-left', function () {
  if ($(this).find('input').prop('checked')) {
    $(this).siblings().find('input').prop('checked', true)
  } else {
    $(this).siblings().find('input').prop('checked', false)
  }
})

// 点击省市选择出现
$('.moudle-body').on('click', '.edit', function () {
  express_index = $(this).parents('.moudle').index()
  var province_arr = [];
  var length_ = $('.moudle').eq(express_index).find('.address').length
  var input_ready = [];
  var disabled_arr =[];
var ready_span=$(this).siblings('.address').html().split('，').length===0?[]:$(this).siblings('.address').html().split('，')
    console.log($(this).siblings('.address').html().split('，'));
    var span_length = $('.city').find('span').length
  var span_ = $('.city').find('span')
    $('.moudle').eq(express_index).find('input').prop('checked', false).removeAttr('disabled')
  for (var k = 0; k < length_; k++) {
    var province_ready = $('.moudle').eq(express_index).find('.address').eq(k).html().split('，')
    input_ready.push.apply(input_ready, province_ready)
  }

  var tem = input_ready.concat(province_arr)


    for(var w=tem.length-1;w>=0;w--){
      for(var r=0;r<ready_span.length;r++){
          if(tem[w]===ready_span[r]){
              tem.splice(w,1)
          }
      }
  }
    console.log(tem);
    for (var i = 0; i < tem.length; i++) {
    for (var j = 0; j < span_length; j++) {
      if (tem[i] === span_.eq(j).text()) {
        span_.eq(j).siblings('input').prop('checked', true).prop({disabled:'disabled'})
      }
      if(tem[i] === span_.eq(j).text()&& span_.eq(j).siblings('input').prop('checked', true)){
        disabled_arr.push(tem[i]);
          input_ready.length=0;
      }
    }
  }

  for (var p = 0; p < $('.province-right').length; p++) {
    var province_right_length = $('.province-right').eq(p).find('input').length
    var province_input_length = $('.province-right').eq(p).find('input:checked').length
    if (province_right_length === province_input_length) {
      $('.province-left').eq(p).find('input').prop('checked', true).attr({disabled:'disabled'})
      // $('.province-left').eq(p).find('input').css({ 'color': 'red' })
    }
  }
  $('.cover').fadeIn()
  moudle_number = $(this).parents().parents().parents('.moudle').index()
  edit_number = $(this).parents('.left').parents().index() - 1
})

// 点击省市消失
$('.guanbi').click(function () {
  $('.cover').fadeOut()
  // setTimeout(function () {
  //   $('.cover').find('input').prop('checked', false)
  // }, 500)
})

// 点击确定进行赋值
$('.cover-sure').click(function () {
  var province_arr = []
  var input_ready = []
  var length_ = $('.moudle').eq(express_index).find('.address').length
  var cover_stu = true
  for (var k = 0; k < length_; k++) {
    var province_ready = $('.moudle').eq(express_index).find('.address').eq(k).html().split('，')
    input_ready.push.apply(input_ready, province_ready)
  }
  for (var i = 0; i < $('.province-right').find('input').length; i++) {
    if ($('.province-right').find('input').eq(i).prop('checked')&&!$('.province-right').find('input').eq(i).prop('disabled')) {
      province_arr.push($('.province-right').find('input').eq(i).siblings().text())
    }
  }
  if (cover_stu && province_arr.length !== 0) {
    $('.moudle').eq(moudle_number).find('.address').eq(edit_number).html(province_arr.join('，'))
    $('.cover').fadeOut()
    $('.cover').find('input').prop('checked', false)
  }
})

// 点击单选按钮更改数量单位
$('.moudle-body').on('click', '.moudle-top input[type=radio]', function () {
  var ind = $(this).index() - 1
  moudle_number = $(this).parents().parents().parents('.moudle').index()
  switch (ind) {
    case 0:
      $('.moudle').eq(moudle_number).find('.jian').html('件')
      $('.moudle').eq(moudle_number).find('.xjian').html('件')
      break
    case 1:
      $('.moudle').eq(moudle_number).find('.jian').html('/kg')
      $('.moudle').eq(moudle_number).find('.xjian').html('重')
      break
    default:
      break
  }
})

// 点击更新模板
$('.moudle-body').on('click', '.gengxin', function () {
  var id = $(this).siblings('.id').text()
  var destination = $(this).parents('.moudle-con-body').find('.address').text()
  var account = $(this).parents('.moudle-con-body').find('input').eq(0).val()
  var price = $(this).parents('.moudle-con-body').find('input').eq(1).val()
  var more_account = $(this).parents('.moudle-con-body').find('input').eq(2).val()
  var more_price = $(this).parents('.moudle-con-body').find('input').eq(3).val()
  $.post(localhost + '/deliver/update', {
    sellerId: token,
    id: id,
    destination: destination,
    account: account,
    price: price,
    more_account: more_account,
    more_price: more_price,
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.message === '操作成功') {
      alert(res.message)
      $.post(localhost + '/tuan/tdelivertemplates/list', {
        sellerId: token,
        online_code: onlinecode
      }, function (res) {
        outline(res)
        var content = res.data
        $('.moudle-name').html('')
        for (var p = 0; p < content.length; p++) {
          $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
        }
        addhtml_(index_span, content)
      })
    }
  })
})

// 点击确认信息，并添加模板
$('.moudle-body').on('click', '.express-sure', function () {
  var dom_ = $(this).parents('.moudle')
  var id_length = dom_.find('.id').length
  var k = 0
  var length_ = dom_.find('.address').length
  var freight_length = dom_.find('.freight').find('input').length
  var freight_input = []
  var moudle_input = []
  express_all = []
  var dname = ''
  for (var j = 0; j < freight_length; j++) {
    freight_input.push(dom_.find('.freight').find('input').eq(j).val())
  }

  if (dom_.find('textarea').val() !== '') {
    for (var i = 0; i < dom_.find('input[type=text]').length; i++) {
      i >= 1 ? k = i - 1 : k = 0
      i >= length_ ? k = length_ - 1 : ''
      if (dom_.find('input[type=text]').eq(i).val() === '' || dom_.find('.address').eq(k).text() == '') {
        alert('请完善信息！')
        return false
      } else {
        dname = dom_.find('input').eq(0).val()
        var origin_address = dom_.find('textarea').val()
        var price_type = ''
        dom_.find('.input').eq(2).find('input:checked').index() === 1 ? price_type = '件数' : price_type = '重量'
      }
    }
  } else {
    alert('请填写发货地址！')
  }
  if (id_length === 0) {
    for (var p = 0; p < dom_.find('.moudle-con-body').length; p++) {
      var address = dom_.find('.moudle-con-body').eq(p).find('.address').text()
      moudle_input = []
      for (var o = 0; o < 4; o++) {
        moudle_input.push(dom_.find('.moudle-con-body').find('.con').find('input').eq(o).val())
      }
      express_all.push(address + '#' + moudle_input.join('#'))
    }

    $.post(localhost + '/deliver/save_template', {
      sellerId: token,
      dname: dname,
      account: freight_input[0],
      price: freight_input[1],
      more_account: freight_input[2],
      more_price: freight_input[3],
      origin_address: origin_address,
      price_type: price_type,
      delivers: express_all.join('-'),
      online_code: onlinecode
    }, function (res) {
      outline(res)
      if (res.message === '操作成功') {
        alert('添加成功！')
        $.post(localhost + '/deliver/getTemplate', {
          sellerId: token,
          online_code: onlinecode
        }, function (res) {
          outline(res)
          dom_.remove()
          var content = res.data
          $('.moudle-name').html('')
          for (var p = 0; p < content.length; p++) {
            $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
          }
          addhtml_(content.length - 1, content)
        })
      } else {
        alert(res.message)
      }
    })
  } else {
    for (var w = 0; w < dom_.find('.moudle-con-body').length; w++) {
      if (dom_.find('.moudle-con-body').eq(w).find('.id').text() === '') {
        var destination = dom_.find('.moudle-con-body').eq(w).find('.address').text()
        var account = dom_.find('.moudle-con-body').eq(w).find('input').eq(0).val()
        var price = dom_.find('.moudle-con-body').eq(w).find('input').eq(1).val()
        var more_account = dom_.find('.moudle-con-body').eq(w).find('input').eq(2).val()
        var more_price = dom_.find('.moudle-con-body').eq(w).find('input').eq(3).val()
        $.post(localhost + '/deliver/update', {
          sellerId: token,
          destination: destination,
          account: account,
          price: price,
          more_count: more_account,
          more_price: more_price,
          dname: dname,
          price_type: price_type,
          online_code: onlinecode
        }, function (res) {
          outline(res)
          if (res.message === '操作成功') {
            $.post(localhost + '/deliver/getTemplate', {
              sellerId: token,
              online_code: onlinecode
            }, function (res) {
              outline(res)
              dom_.remove()
              var content = res.data
              $('.moudle-name').html('')
              for (var p = 0; p < content.length; p++) {
                $('.moudle-name').append('<span>' + content[p][0].dname + '</span>')
              }
              addhtml_(index_span, content)
            })
          }
        })
      }
    }
  }
})
