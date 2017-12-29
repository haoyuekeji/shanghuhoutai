var height = $(window).height()
var push_stu = 0
$('.body-left').css({
  'height': height
})
var maxFileCount1 = 0
var maxFileCount2 = 0
var invoice_type = '无'
var banner
var details_img
var All = []
// 赋值方法
function setdata(dom, data) {
  $(dom).find('input').val(data)
}
// 预览方法
function view(arr, dom) {
  $(dom).html('')
  for (var i = 0; i < arr.length; i++) {
    $(dom).append('<img src="' + arr[i] + '" alt="" width="100%">')
  }
}

// 点击编辑事件
function edit(dom) {
  $('body').on('click', dom, function () {
    $(this).prop('readonly', false)
  })
}

// 移出焦点进入只读状态事件
function readonly(dom) {
  $('body').on('blur', dom, function () {
    $(this).prop('readonly', true)
  })
}

// 文件最大数量
function img_number(arr) {
  if (token !== '3') {
    switch (arr) {
      case banner:
        maxFileCount1 = 5 - arr.length
        if (maxFileCount1 === 0) {
          $('#loading').css({
            'display': 'none'
          })
        }
        break
      case details_img:
        maxFileCount2 = 10 - arr.length
        if (maxFileCount2 === 0) {
          $('#uploading').css({
            'display': 'none'
          })
        }
        break
      default:
        break
    }
  }
}

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
  img_number(arr)
  switch (arr) {
    case banner:
      view(arr, '.loading-preview-con')
      sort_img(arr, '.loading-show-img')
      break
    case details_img:
      view(arr, '.uploading-preview-con')
      sort_img(arr, '.uploading-show-img')
      break
    default:
      break
  }
}

// 获取商品ID
var pid = localStorage.getItem('fix')

// 获取快递模板列表
$.post(localhost + '/deliver/getTemplate', {
  sellerId: token,
  online_code: onlinecode
}, function (res) {
  outline(res)
  var content = res.data
  for (var p = 0; p < content.length; p++) {
    $('select').append('<option>' + content[p][0].dname + '</option>')
  }
})

// 获取商品数据并进行赋值
$.post(localhost + '/seller/pro/findOne', {
  pid: pid,
  token: token,
  online_code: onlinecode
}, function (res) {
  outline(res)
  var content = res.data
  var produtsTypes = content.produtsTypes
  banner = content.indexImages.split(',')
  details_img = content.images.split(',')
  var color = []
  var json = {}
  var details_con = []
  img_number(banner)
  img_number(details_img)
  setdata('.title', content.pname)
  setdata('.kuanhao', content.pNumber)
  setdata('.classify', content.ptypeName)
  view(banner, '.loading-preview-con')
  view(details_img, '.uploading-preview-con')
  sort_img(banner, '.loading-show-img')
  sort_img(details_img, '.uploading-show-img')
  produtsTypes.forEach(function (val, key) {
    if (!json[val.color]) {
      color.push(val.color)
      json[val.color] = 1
    }
  })
  color.forEach(function (val, key) {
    produtsTypes.forEach(function (val_, key_) {
      if (val === val_.color) {
        details_con.push({})
        details_con[key_].color = val_.color
        details_con[key_].amount = val_.amount
        details_con[key_].priceNew = val_.priceNew
        details_con[key_].size = val_.size
        details_con[key_].discountPrice = val_.discountPrice
      }
    })
  })
  color.forEach(function (val, key) {
    $('.sure').append('<div class="all">\n' +
      '                <div class="all-top">\n' +
      '                    <ul>\n' +
      '                        <li style="width: 90px">颜色</li>\n' +
      '                        <li>尺码</li>\n' +
      '<li style="position: relative" class="djia">' +
      '<span style="cursor: pointer">折扣价' +
      '<span style="font-size: 12px;display: block">(双击一键添加)</span>' +
      '</span>' +
      '<input type="text" style="height: 100%;width: 64%;position: absolute;' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">' +
      '</li>' +
      '                        <li style="position: relative" class="jia">\n' +
      '                            <span style="cursor: pointer;display: block">原价\n' +
      '                                <span style="font-size: 12px">(双击一键添加)</span>\n' +
      '                            </span>\n' +
      '                            <input type="text" style="height: 100%;width: 64%;position: absolute;\n' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">\n' +
      '                        </li>\n' +
      '                        <li style="position: relative" class="cunliang">\n' +
      '                            <span>库存\n' +
      '                                <span style="font-size: 12px;display: block">(双击一键添加)</span>\n' +
      '                            </span>\n' +
      '                            <input type="text" style="height: 100%;width: 64%;position: absolute;\n' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">\n' +
      '                        </li>\n' +
      '                    </ul>\n' +
      '                </div>\n' +
      '                <div class="all-con">\n' +
      '                    <div class="all-con-left">\n' +
      '                        <input type="text"  readonly class="clickdb">\n' +
      '                    </div>\n' +
      '                    <div class="all-con-right">\n' +
      '                        <ul>\n' +
      '                        </ul>\n' +
      '<div class="add_">' +
      '<img src="images/add.png" alt="">' +
      '</div>' +
      '                    </div>\n' +
      '                    <div class="del">\n' +
      '                        <img src="images/del.png" alt="">\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '            </div>')

    $('.all').eq(key).find('.all-con-left input').val(val)
    details_con.forEach(function (val_, key_) {
      if (val === val_.color) {
        $('.all').eq(key).find('.all-con-right ul').eq(0).append('<li>\n' +
          '                                <ul class="push-details">\n' +
          '                                    <li><span>\n' +
          '                                      <input type="text" placeholder=\'列如："S"\' class="chima" readonly value=' + details_con[key_].size + '>\n' +
          '                                </span></li>\n' +
          '                <li><input type="text" readonly class="clickdb disjiage" value=' + details_con[key_].discountPrice + '></li>' +
          '<li><input type="text" readonly class="clickdb jiage" value=' + details_con[key_].priceNew + '></li>' +
          ' <li><input type="text" readonly class="clickdb nums" value=' + details_con[key_].amount + '></li>' +
          '<div class="del_">' +
          '<img src="images/del.png" alt="">' +
          '</div>' +
          '                                </ul>\n' +
          '                            </li>')
      }
    })
  })
  $('.address').find('textarea').val(content.sendAddress)
  // deliverPrice

  // 添加商品分类
  $.post(localhost + '/ptypename/list', {
    sellerId: token,
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.data !== null) {
      var content = res.data.ptypename.split(',')
      for (var i = 0; i < content.length; i++) {
        $('.span').append('<div class="span-span"><div class="last"><</div><div class="next">></div><span>' + content[i] + '</span></div>')
      }
      arrow_show('.span', 'mouseover', '.span-span')
      arrow_show('.span', 'mouseleave', '.span-span')
      $('.span').on('click', '.last', function () {
        var ind = $(this).parents('.span-span').index()
        ArrChange(0, content, ind)
        $('.span').html('')
        for (var i = 0; i < content.length; i++) {
          $('.span').append('<div class="span-span"><div class="last"><</div><div class="next">></div><span>' + content[i] + '</span></div>')
        }
        return false
      })
      $('.span').on('click', '.next', function () {
        var ind = $(this).parents('.span-span').index()
        ArrChange(1, content, ind)
        $('.span').html('')
        for (var i = 0; i < content.length; i++) {
          $('.span').append('<div class="span-span"><div class="last"><</div><div class="next">></div><span>' + content[i] + '</span></div>')
        }
        return false
      })
      $('.button').click(function () {
        $.post(localhost + '/ptypename/save', {
          id: res.data.id,
          sellerId: token,
          ptypename: content.join(',')
        }, function (res) { })
      })
    }
  })

  // 点击更改分类选项
  $('.span').on('click', '.span-span', function () {
    $('.span').siblings('.classify').find('input').val($(this).find('span').text())
  })

  // 鼠标移入上下滑入
  arrow_show('.loading-show-img', 'mouseover', '.show-img-con')
  arrow_show('.uploading-show-img', 'mouseover', '.show-img-con')

  // 鼠标移出上下滑出
  arrow_show('.loading-show-img', 'mouseleave', '.show-img-con')
  arrow_show('.uploading-show-img', 'mouseleave', '.show-img-con')

  // 点击更换主图位置
  $('.loading-show-img').on('click', '.last', function () {
    var ind = $(this).parents('.show-img-con').index()
    ArrChange(0, banner, ind)
    view(banner, '.loading-preview-con')
    sort_img(banner, '.loading-show-img')
  })
  $('.loading-show-img').on('click', '.next', function () {
    var ind = $(this).parents('.show-img-con').index()
    ArrChange(1, banner, ind)
    view(banner, '.loading-preview-con')
    sort_img(banner, '.loading-show-img')
  })

  // 点击更换详情图位置
  $('.uploading-show-img').on('click', '.last', function () {
    var ind = $(this).parents('.show-img-con').index()
    ArrChange(0, details_img, ind)
    view(details_img, '.uploading-preview-con')
    sort_img(details_img, '.uploading-show-img')
  })
  $('.uploading-show-img').on('click', '.next', function () {
    var ind = $(this).parents('.show-img-con').index()
    ArrChange(1, details_img, ind)
    view(details_img, '.uploading-preview-con')
    sort_img(details_img, '.uploading-show-img')
  })
  // 删除图片
  $('body').on('click', '.loading-show-img-del', function () {
    var className = $(this).parents().parents()[0].className
    var ind = $(this).parents().index()
    switch (className) {
      case 'loading-show-img':
        del_img(ind, '.show-img-con', banner)
        img_number(banner)
        break
      case 'uploading-show-img':
        del_img(ind, '.show-img-con', details_img)
        img_number(details_img)
        break
      default:
        break
    }
  })

  // 点击更改编辑状态
  edit('.chima')
  readonly('.chima')
  edit('.clickdb')
  readonly('.clickdb')

  // 设置删除条件，点击删除颜色分类
  $('body').on('click', '.del', function () {
    $('.del').length > 1 && $(this).parents('.all').remove()
  })

  // 设置删除条件，点击删除详细分类
  $('body').on('click', '.del_', function () {
    $(this).parents('.all-con-right').find('.push-details').length > 1 && $(this).parents('.push-details').parents('li').remove()
  })

  // 点击一键添加
  $('body').on('click', '.all-top .jia', function () {
    $(this).find('input').css({
      'opacity': 1
    }).siblings('span').css({
      'opacity': 0
    })
  })

  // 点击一键添加
  $('body').on('click', '.all-top .djia', function () {
    $(this).find('input').css({
      'opacity': 1
    }).siblings('span').css({
      'opacity': 0
    })
  })

  // 移出焦点进行赋值
  $('body').on('blur', '.all-top .jia', function () {
    var val = $(this).find('input').val()
    var ind = $(this).parents('.all').index()
    $(this).find('input').css({
      'opacity': 0
    }).siblings('span').css({
      'opacity': 1
    })
    $('.all-con-right').eq(ind).find('.jiage').val(val)
  })

  // 移出焦点进行赋值
  $('body').on('blur', '.all-top .djia', function () {
    var val = $(this).find('input').val()
    var ind = $(this).parents('.all').index()
    $(this).find('input').css({
      'opacity': 0
    }).siblings('span').css({
      'opacity': 1
    })
    $('.all-con-right').eq(ind).find('.disjiage').val(val)
  })

  // 点击一键添加
  $('body').on('click', '.all-top .cunliang', function () {
    $(this).find('input').css({
      'opacity': 1
    }).siblings('span').css({
      'opacity': 0
    })
  })

  // 移出焦点进行赋值
  $('body').on('blur', '.all-top .cunliang', function () {
    var val = $(this).find('input').val()
    var ind = $(this).parents('.all').index()
    $(this).find('input').css({
      'opacity': 0
    }).siblings('span').css({
      'opacity': 1
    })
    $('.all-con-right').eq(ind).find('.nums').val(val)
  })

  // 点击添加详细分类
  $('body').on('click', '.add_', function () {
    $(this).siblings('ul').append('<li>\n' +
      '                                <ul class="push-details">\n' +
      '                                    <li><span>\n' +
      '                                      <input type="text" placeholder=\'列如："S"\' class="chima">\n' +
      '                                </span></li>\n' +
      '                <li><input type="text" readonly class="clickdb disjiage"></li>' +
      '<li><input type="text" readonly class="clickdb jiage"></li>' +
      ' <li><input type="text" readonly class="clickdb nums"></li>' +
      '<div class="del_">' +
      '<img src="images/del.png" alt="">' +
      '</div>' +
      '                                </ul>\n' +
      '                            </li>')
  })

  // 点击添加颜色分类
  $('.add').click(function () {
    $('.sure').append('<div class="all">\n' +
      '                <div class="all-top">\n' +
      '                    <ul>\n' +
      '                        <li style="width: 90px">颜色</li>\n' +
      '                        <li>尺码</li>\n' +
      '<li style="position: relative" class="djia">' +
      '<span style="cursor: pointer">折扣价' +
      '<span style="font-size: 12px;display: block">(双击一键添加)</span>' +
      '</span>' +
      '<input type="text" style="height: 100%;width: 64%;position: absolute;' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">' +
      '</li>' +
      '                        <li style="position: relative" class="jia">\n' +
      '                            <span style="cursor: pointer;display: block">原价\n' +
      '                                <span style="font-size: 12px">(双击一键添加)</span>\n' +
      '                            </span>\n' +
      '                            <input type="text" style="height: 100%;width: 64%;position: absolute;\n' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">\n' +
      '                        </li>\n' +
      '                        <li style="position: relative" class="cunliang">\n' +
      '                            <span>库存\n' +
      '                                <span style="font-size: 12px;display: block">(双击一键添加)</span>\n' +
      '                            </span>\n' +
      '                            <input type="text" style="height: 100%;width: 64%;position: absolute;\n' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">\n' +
      '                        </li>\n' +
      '                    </ul>\n' +
      '                </div>\n' +
      '                <div class="all-con">\n' +
      '                    <div class="all-con-left">\n' +
      '                        <input type="text"  readonly class="clickdb">\n' +
      '                    </div>\n' +
      '                    <div class="all-con-right">\n' +
      '                        <ul>\n' +
      '<li>\n' +
      '                                <ul class="push-details">\n' +
      '                                    <li><span>\n' +
      '                                      <input type="text" placeholder=\'列如："S"\' class="chima">\n' +
      '                                </span></li>\n' +
      '                <li><input type="text" readonly class="clickdb disjiage"></li>' +
      '<li><input type="text" readonly class="clickdb jiage"></li>' +
      ' <li><input type="text" readonly class="clickdb nums"></li>' +
      '<div class="del_">' +
      '<img src="images/del.png" alt="">' +
      '</div>' +
      '                                </ul>\n' +
      '                            </li>' +
      '                        </ul>\n' +
      '<div class="add_">' +
      '<img src="images/add.png" alt="">' +
      '</div>' +
      '                    </div>\n' +
      '                    <div class="del">\n' +
      '                        <img src="images/del.png" alt="">\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '            </div>')
  })

  // 添加商品信息

  $('.sure').on('input', 'input', function () {
    All = []
    $('.button').html('保存')
  })
  $('.button').click(function () {
    var stu = true
    try {
      $('.sure').find('.all-con-left input').each(function (key, val) {
        if (val.value === '') {
          alert('有颜色栏未填写，如不需要请点击右上角删除！')
          return false
        }
      })
    } catch (e) { }

    try {
      $('.sure').find('.all-con-right span input').each(function (key, val) {
        if (val.value === '') {
          alert('有尺寸栏未填写，如不需要请点击右上角删除！')
          return false
        }
      })
    } catch (e) { }

    All = []
    var q = 0
    for (var f = 0; f < $('.disjiage').length; f++) {
      if ($('.disjiage').eq(f).val() <= 0) {
        alert('折扣价不得为0！')
        return false
      }
    }

    for (var k = 0; k < $('.all-con-right').find('input').length; k++) {
      if ($('.all-con-right').find('input').eq(k).val() == '') {
        q++
      }
    }
    if (q > 0) {
      if (confirm('你所填写的信息中有空白，点击确定自动补全为0或填写完整！')) {
        for (var k = 0; k < $('.all-con-right').find('input').length; k++) {
          if ($('.all-con-right').find('input').eq(k).val() == '') {
            $('.all-con-right').find('input').eq(k).val('0')
          }
        }
      } else {
        return false
      }
    }

    for (var i = 0; i < $('.all-con-left').length; i++) {
      for (var p = 0; p < $('.all-con-right').eq(i).find('.push-details input').length; p += 4) {
        All += $('.all-con-left').find('input').eq(i).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p + 1).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p + 2).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p + 3).val() + '='
      }
    }
    $('.button').html('已保存！')
  })

  $('body').on('click', '.btn', function () {
    if ($('#loading').css('display') === 'none') {
      $('.hint-page').fadeIn().html('图片数量已打上限，请删除后重试！')
      setTimeout(function () {
        $('.hint-page').fadeOut().html('')
      }, 1500)
    }
  })

  // 上传主图
  $('#loading').fileinput({
    language: 'zh', // 设置语言
    uploadUrl: localhost + '/seller/pro/uploadPic', // 上传的地址
    allowedFileExtensions: ['jpg', 'png', 'gif'], // 接收的文件后缀,
    maxFileCount: maxFileCount1,
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
    if (data.response.data !== '' || data.response.data !== undefined) {
      var pic_zhu = data.response.data.split(',')
      pic_zhu.forEach(function (val, key) {
        banner.push(val)
      })
      img_number(banner)
      sort_img(banner, '.loading-show-img')
      view(banner, '.loading-preview-con')
    }
  })

  // 上传详情图片
  $('#uploading').fileinput({
    language: 'zh', // 设置语言
    uploadUrl: localhost + '/seller/pro/uploadPic', // 上传的地址
    allowedFileExtensions: ['jpg', 'png', 'gif'], // 接收的文件后缀,
    maxFileCount: maxFileCount2,
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
    if (data.response.data !== '' || data.response.data !== undefined) {
      var pic = data.response.data.split(',')
      pic.forEach(function (val, key) {
        details_img.push(val)
      })
      img_number(details_img)
      sort_img(details_img, '.uploading-show-img')
      view(details_img, '.uploading-preview-con')
    }
  })

  // 分类添加信息动态显示
  $('.classify').find('input').on('input', function () { })

  // 快递显示
  var deliverPrice = ''
  $('.express').click(function () {
    if ($(this).is(':checked')) {
      deliverPrice = null
      $('select').val('选择快递模板')
    } else {
      deliverPrice = $('select option:selected').text()
    }
  })
  $('select').click(function () {
    if ($('select option:selected').text() === '选择快递模板') {
      deliverPrice = null
      $('.express').prop('checked', true)
    } else {
      deliverPrice = $('select option:selected').text()
      $('.express').prop('checked', false)
    }
  })
  // 点击发布
  $('.fabu').click(function () {
    var isLuckDraw = ''
    var images = details_img.join(',')
    var indexImages = banner.join(',')
    var title = $('.title').find('input').val()
    var classify = $('.classify').find('input').val()
    var pNumber = $('.kuanhao').find('input').val()
      var pText = $('.tjbianji').find('input').val()
    var address = $('.address .input textarea').val()
    var jia = $('.kuaidi').eq(1).find('input:checked').siblings('span').html() == '立即上架' ? 'true' : 'false'
    var brand = $('.canshu').find('input').eq(0).val()
    var materialQuality = $('.canshu').find('input').eq(1).val()
    var designPic = $('.canshu').find('input').eq(3).val()
    var pStyle = $('.canshu').find('input').eq(4).val()
    var model = $('.canshu').find('input').eq(5).val()
    var pattern = $('.canshu').find('input').eq(6).val()
    for (var op = 0; op < $('.choujiang').find('input').length; op++) {
      if ($('.choujiang').find('input').eq(op).is(':checked')) {
        isLuckDraw = $('.choujiang').find('input').eq(op).val()
      }
    }
    if (
      title === '' || classify === '' || deliverPrice === '' || deliverPrice === '选择快递模板'
    ) {
      alert('标题，分类，快递模板为必填项！')
      return false
    } else {
      if (images === undefined || indexImages === undefined) {
        alert('请先上传图片！')
        return false
      } else {
        if (All.length === 0) {
          alert('请先点击保存按钮！')
          return false
        } else {
          if (push_stu === 0) {
            push_stu = 1
            $.post(localhost + '/seller/pro/save', {
              id: pid,
              monthSale: content.monthSale,
              thumbsup: content.thumbsup,
              active: content.active,
              // createDate: content.createDate,
              pname: title,
              ptypeName: classify,
              pNumber: pNumber,
              images: images,
              indexImages: indexImages,
              protypes: All,
              invoice_type: invoice_type,
              dname: deliverPrice,
              token: token,
              online_code: onlinecode,
              isLuckDraw: isLuckDraw,
                suffix:pText,
                qrcode: content.qrcode,
              //  废弃参数为空
              sendAddress: '',
              brand: '',
              pStyle: '',
              pattern: '',
              materialQuality: '',
              model: '',
              designPic: ''
            }, function (data) {
              outline(data)
              if (data.data !== null && data.token !== '折扣价不应该大于原价') { // 成功后清空数据
                alert('更新成功！')
                $('input').val('')
                $('textarea').val('')
                $('.span').html('')
                $('.kuaidi input').prop('checked', false)
                $('.button').html('保存')
                push_stu = 0
                location.href = 'charge.html'
              } else {
                alert(data.token)
                push_stu = 0
              }
            })
          }
        }
      }
    }
  })
})
