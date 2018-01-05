var height = $(window).height()
var push_stu = 0
$('.body-left').css({
  'height': height
})
var pic
var pic_zhu
var maxFileCount1 = 0
var maxFileCount2 = 0
var invoice_type = '无'
var All = []
if (token !== '3') {
  maxFileCount1 = 5
  maxFileCount2 = 10
}
// 鼠标移入上下滑入
function arrow_show (dom, fun, dom_) {
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
function ArrChange (stu, arr, ind) {
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
      }, function (res) {})
    })
  }
})

// 获取快递模板
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

$('body').on('blur', '.chima', function () {
  $(this).addClass('transform')
})
$('.span').on('click', '.span-span', function () {
  $('.span').siblings('.classify').find('input').val($(this).find('span').text())
})
// 点击进入编辑状态
$('body').on('click', '.clickdb', function () {
  $(this).prop('readonly', false)
})
// 移出焦点进入制度状态
$('body').on('blur', '.clickdb', function () {
  $(this).prop('readonly', true)
})
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
      ' <li><input type="text" readonly class="clickdb mjiage"></li>' +
    ' <li><input type="text" readonly class="clickdb nums"></li>' +
    '<div class="del_">' +
    '<img src="images/del.png" alt="">' +
    '</div>' +
    '                                </ul>\n' +
    '                            </li>')
})


 //点击秒杀宝贝
$("body").on('click','#checkBox',function () {
    if($(this).is(':checked')) {
       $(".allPdan").css({display:'block'})
    }else{
        $(".allPdan").css({display:'none'})
    }
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
      '<li style="position: relative" class="djia">' +
      '<span style="cursor: pointer">秒杀价' +
      '<span style="font-size: 12px;display: block">(双击一键添加)</span>' +
      '</span>' +
      '<input type="text" style="height: 100%;width: 64%;position: absolute;' +
      'left:0;top:0;margin-left: 25px;opacity: 0;cursor: pointer;text-align: center">' +
      '</li>' +
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
    '<li><input type="text" readonly class="clickdb mjiage"></li>' +
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
$('.sure').on('input', 'input', function () {
  All = []
  $('.button').html('保存')
})
// 添加商品信息

$('.button').click(function () {
  var stu = true
  $('.sure').find('.all-con-left input').each(function (key, val) {
    if (val.value === '') {
      alert('有颜色栏未填写，如不需要请点击右上角删除！')
      stu = false
    }
  })
  if (stu !== true) {
    return false
  }
  $('.sure').find('.all-con-right span input').each(function (key, val) {
    if (val.value === '') {
      alert('有尺寸栏未填写，如不需要请点击右上角删除！')
      stu = false
    }
  })
  if (stu !== true) {
    return false
  }
  All = []
  var q = 0
  for (var f = 0; f < $('.disjiage').length; f++) {
    if ($('.disjiage').eq(f).val() <= 0) {
      q++
    }
  }
  if (q > 0) {
    alert('折扣价不得为0！')
    return false
  }
  for (var k = 0; k < $('.all-con-right').find('input').length; k++) {
    if ($('.all-con-right').find('input').eq(k).val() === '') {
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
    for (var p = 0; p < $('.all-con-right').eq(i).find('.push-details input').length; p += 5) {
      All += $('.all-con-left').find('input').eq(i).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p + 1).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p + 2).val() + ',' + $('.all-con-right').eq(i).find('input').eq(p + 3).val()+ ',' + $('.all-con-right').eq(i).find('input').eq(p + 4).val() + '='
    }
  }
  $('.button').html('已保存！')
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
    pic_zhu = data.response.data
  }
}).on('filebatchuploaderror', function (event, data) {
  if (data.response.error === '文件过大') {
    $(' .banner-hint').html(data.response.error + '！').fadeIn()
    setTimeout(function () {
      $('.banner-hint').fadeOut()
    }, 1200)
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
    pic = data.response.data
    var piclist = pic.split(',')
    for (var i = 0; i < piclist.length; i++) {
      $('.preview-con').append('<img src="' + piclist[i] + '" alt="" width="100%">')
    }
  }
}).on('filebatchuploaderror', function (event, data) {
  if (data.response.error === '文件过大') {
    $(' .banner-hint').html(data.response.error + '！').fadeIn()
    setTimeout(function () {
      $('.banner-hint').fadeOut()
    }, 1200)
  }
})

// 分类添加信息动态显示
$('.classify').find('input').on('input', function () {})

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
  var images = pic
  var indexImages = pic_zhu
  var title = $('.title').find('input').val()
  var classify = $('.classify').find('input').val()
  var pNumber = $('.kuanhao').find('input').val()
  var pText = $('.tjbianji').find('input').val()
  var pTime = $('.timesInput').find('input').val()|0
  var address = $('.address .input textarea').val()
  var jia = $('.kuaidi').eq(1).find('input:checked').siblings('span').html() == '立即上架' ? 'true' : 'false'
  var brand = $('.canshu').find('input').eq(0).val()
  var materialQuality = $('.canshu').find('input').eq(1).val()
  var designPic = $('.canshu').find('input').eq(3).val()
  var pStyle = $('.canshu').find('input').eq(4).val()
  var model = $('.canshu').find('input').eq(5).val()
  var pattern = $('.canshu').find('input').eq(6).val()
    var checked='';
    //选中状态
    if($("#checkBox").is(':checked')){
        checked= true
    }else{
        checked= false
    }
    console.log(checked)
  //秒杀时间开始
    //年月日
    var mData = $(".pdan-start").find('input').eq(0).val()
    var hour = $(".pdan-start").find('input').eq(1).val()
    var minite = $(".pdan-start").find('input').eq(2).val()
    var myTime =mData+" "+hour+":"+minite+":00"
  //秒杀时间结束
    //年月日
    var mDatas = $(".pdan-end").find('input').eq(0).val()
    var hours = $(".pdan-end").find('input').eq(1).val()
    var minites = $(".pdan-end").find('input').eq(2).val()
    var myTimes =mDatas+" "+hours+":"+minites+":00"




  for (var op = 0; op < $('.choujiang').find('input').length;op++) {
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
            pname: title,
            ptypeName: classify,
            dname: deliverPrice,
            pNumber: pNumber,
            images: images,
            indexImages: indexImages,
            protypes: All,
            invoice_type: invoice_type,
            token: token,
            online_code: onlinecode,
            isLuckDraw:isLuckDraw,
            suffix:pText,
            showHours:pTime,
            issecondkill:checked,
            killStart:myTime,
            killEnd:myTimes,
            //  废弃参数为空
            brand: '',
            pStyle: '',
            pattern: '',
            materialQuality: '',
            model: '',
            designPic: '',
            sendAddress: ''
          }, function (data) {
            console.log(data)
            outline(data)
            if (data.data !== null && data.token !== '折扣价不应该大于原价') { // 成功后清空数据
              alert('添加成功！')
              $('input').val('')
              $('textarea').val('')
              $('.span').html('')
              $('.kuaidi input').prop('checked', false)
              $('.button').html('保存')
              push_stu = 0
              location.href = 'push.html'
            }else {
              alert(data.token)
              push_stu = 0
            }
          })
        }
      }
    }
  }
})
