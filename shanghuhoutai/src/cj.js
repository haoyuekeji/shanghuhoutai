function addhtml () {
  $('.all').html('')
  $('.all').append('<div class="cjnums">' +
    '<span>抽奖数量</span>' +
    '<input class="cjnums-con" placeholder="抽奖数量" />' +
    '</div>' +
    '<div class="cjnumber">' +
    '<span>抽奖号码</span>' +
    '<div class="input">' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '</div>' +
    '</div>' +
    '<div class="add">' +
    '<img src="images/add.png" alt="" width="100%">' +
    '</div>' +
    '<div class="sure">确定</div>')
}
function addhtml1 (content) {
  $('.all').html('')
  if (content.length === 0) {
    $('.all').html('您没有抽奖订单！')
    return false
  } else {
    for (var i = 0; i < content.length; i++) {
      var img = content[i].products[0].indexImages.split(',')[0]
      $('.all').append('' +
        '<div class="details">\n' +
        '    <div class="details-left">\n' +
        '           <img src="' + img + '" alt="">\n' +
        '    </div>\n' +
        '    <div class="details-con width">\n' +
        '    <div class="details-con-top">\n' +
        '<div>订单号：' + content[i].orderCode + '</div>\n' +
        content[i].products[0].pname +
        '</div>\n' +
        '<div class="style">\n' +
        '<span class="yanse">颜色：' + content[i].produtsTypes[0].color + '</span>\n' +
        '<span class="chima">尺码：' + content[i].produtsTypes[0].size + '</span>\n' +
        '</div>\n' +
        '<div class="price price-charge">\n' +
        '售价：￥' + content[i].totalPrice +
        '    </div>\n' +
        '    <span class="nums num">\n' +
        '</span>\n' +
        '</div>\n' +
        '<div class="details-right-charge">\n' +
        '    <div class="address">\n' +
        content[i].address.receiver + content[i].address.phone + '<br>\n' +
        content[i].address.address +
        '</div>\n' +
        '<div class="status">\n' +
        '抽奖码 ' + content[i].luckcode + '</div>\n' +
        '<div class="data">\n' +
        content[i].createDate +
        '</div>\n' +
        '<div class="fahuo wuliu-details" title="">\n' +
        '未中奖\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="details-details-cons">' +
        '<div class="details-details-con">' +
        '<div class="details-ul">' +
        '<ul>' +
        '<li>无</li>' +
        '<li>无</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>\n' +
        '    </div>' +
        '')
    }
  }
}

function addhtml2 (content) {
  $('.all').html('')
  if (content.length === 0) {
    $('.all').html('您没有已中奖订单！')
    return false
  } else {
    for (var i = 0; i < content.length; i++) {
      var img = content[i].products[0].indexImages.split(',')[0]
      $('.all').append('' +
        '<div class="details">\n' +
        '    <div class="details-left">\n' +
        '           <img src="' + img + '" alt="">\n' +
        '    </div>\n' +
        '    <div class="details-con width">\n' +
        '    <div class="details-con-top">\n' +
        '<div>订单号：' + content[i].orderCode + '</div>\n' +
        content[i].products[0].pname +
        '</div>\n' +
        '<div class="style">\n' +
        '<span class="yanse">颜色：' + content[i].produtsTypes[0].color + '</span>\n' +
        '<span class="chima">尺码：' + content[i].produtsTypes[0].size + '</span>\n' +
        '</div>\n' +
        '<div class="price price-charge">\n' +
        '<div class="status">\n' +
        '总价：' + content[i].totalPrice +
        '</div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div class="details-right-charge">\n' +
        '    <div class="address">\n' +
        content[i].address.receiver + content[i].address.phone + '<br>\n' +
        content[i].address.address +
        '</div>\n' +
        '<div class="status">\n' +
        '抽奖码 ' + content[i].luckcode + '</div>\n' +
        '<div class="data">\n' +
        content[i].createDate +
        '</div>\n' +
        '<div class="fahuo" title="">\n' +
        '发货\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="details-details-cons">' +
        '<div class="details-details-con">' +
        '<div class="details-ul">' +
        '<div><input type="text" class="details-ul-input" placeholder="物流公司"></div>' +
        '<ul>' +
        '</ul>' +
        '</div>' +
        '<span class="oid" style="display: none">' + content[i].id + '</span>' +
        '<div class="express"><input type="text" placeholder="物流订单号"></div>' +
        '<div class="express-sure">确定发货</div>' +
        '</div>' +
        '</div>\n' +
        '</div>'
      )
    }
  }
}
;(function () {}(
  addhtml()
))

$('.add').click(function () {
  $('.cjnumber').append('<div class="input">' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '<input class="cjnumber-con" placeholder="抽奖号码" />' +
    '</div>')
})
$('.body-top li').click(function () {
  var ind = $(this).index()
  console.log(ind)
  switch (ind) {
    case 0:
      addhtml()
      break
    case 1:
      $.post(localhost + '/order/list', {
        sellerId: token,
        luckdraw: true,
        online_code: onlinecode
      }, function (res) {
        outline(res)
        var content = res.data.content
        addhtml1(content)
      })
      break
    case 2:
      $.post(localhost + '/order/list', {
        sellerId: token,
        luck: true,
        online_code: onlinecode
      }, function (res) {
        outline(res)
        var content = res.data.content
        addhtml2(content)
      })
      break
    default:
      break
  }
})
$('.all').on('click', '.sure', function () {
  var cj = []
  var length_ = $('.cjnumber').find('input').length
  var allNumber = $('.cjnums').find('input').val()
  for (var i = 0; i < length_; i++) {
    cj.push($('.cjnumber').find('input').eq(i).val())
  }
  $.post(localhost + '/luckdraw/save', {
    sellerId: token,
    allNumber: allNumber,
    lackNumber: cj.join('='),
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.message === '操作成功') {
      alert(res.message)
    }
  })
})

// 模糊搜索
function findlist (list, listen, substr) {
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

// 点击发货按钮下拉事件
$('body').on('click', '.fahuo', function () {
  if ($(this).attr('title') === '') {
    $(this).parents('.details-right-charge').siblings('.details-details-cons').stop(true).slideDown()
    $(this).prop('title', '发货')
  } else {
    $(this).parents('.details-right-charge').siblings('.details-details-cons').stop(true).slideUp()
    $(this).prop('title', '')
  }
})

// 动态添加搜索结果
$('body').on('input', '.details-ul-input', function () {
  showlist = []
  enlist = []
  var vlue = $(this).val()
  $(this).parents().siblings('.details-ul ul').html('')
  var reg = /^[\u4E00-\u9FA5]+$/
  if (reg.test(vlue)) {
    findlist(list_zh, list_en, vlue)
  }
  for (var i = 0; i < showlist.length; i++) {
    $(this).parents().siblings('.details-ul ul').append('<li>' + showlist[i] + '</li>')
  }
  if (vlue === '') {
    $(this).parents().siblings('.details-ul ul').html('')
  }
})

// 点击复制并清空数组
$('body').on('click', '.details-ul li', function () {
  dename = []
  dename.push(enlist[$(this).index()])
  $(this).parents('.details-ul ul').siblings('div').find('.details-ul-input').val($(this).text())
  $(this).parents('.details-ul ul').html('')
})

// 点击确认按钮，成功后更改订单状态
$('body').on('click', '.express-sure', function () {
  var dename_ = []
  var index = $(this).parents('.details').index()
  var oid = $(this).siblings('.oid').text()
  var deliverPrice = $(this).siblings('.deliverPrice').text()
  var dcode = $(this).siblings('.express').find('input').val()
  var dname = $(this).siblings('.details-ul').find('input').val()
  dename_.push(dename[0])
  $.post(localhost + '/deliver/save', {
    oid: oid,
    token: token,
    dcode: dcode,
    dname: dname,
    price: 0.0,
    dename: dename_[0],
    online_code: onlinecode
  }, function (data) {
    outline(data)
    if (data.message === '操作成功') {
      alert(data.message)
      $.post(localhost + '/order/changeState', {
        oid: oid,
        state: '待收货订单',
        sellerId: token,
        online_code: onlinecode
      }, function (data) {
        outline(data)
        if (data.message === '操作成功') {
          $('.all').find('.details').eq(index).remove()
        }
      })
    } else {
      if (data.message === '信息已存在') {
        if (confirm('快递' + data.message + '!，确认继续吗？')) {
          $.post(localhost + '/deliver/save', {
            oid: oid,
            token: token,
            dcode: dcode,
            dname: dname,
            price: 0.0,
            dename: dename_[0],
            iscontinue: 'yes',
            online_code: onlinecode
          }, function (data) {
            outline(data)
            if (data.message === '操作成功') {
              $.post(localhost + '/order/changeState', {
                oid: oid,
                state: '待收货订单',
                sellerId: token,
                online_code: onlinecode
              }, function (data) {
                outline(data)
                if (data.message === '操作成功') {
                  $('.all').find('.details').eq(index).remove()
                }
              })
            }
          })
        }
      }
    }
  })
})
// 卖家后台设置抽奖信息*****
// /luckdraw/save?sellerId=1&allNumber=1000&lackNumber=[中奖号码以=号分隔,1=2=3=4]
// 设置商品开启抽奖活动*****
// 商品更新页面可设置抽奖****
// /seller/pro/save 追加参数 isLuckDraw=[true/false]
// 抽奖商品下订单******
// 如果 products.isLuckDraw=true&&products.isLuckDrawEnd=false 表示当前商品是抽奖商品且名额未满
// 当下单成功根据返回的order.isLuckDraw=true表示是抽奖订单，当付款成功后，改变订单状态时候 state=抽奖订单
// 卖家后台查看抽奖订单******
// /order/list?sellerId=1&luckdraw=true
// 卖家后台查看抽奖中奖订单******
// /order/list?sellerId=1&luck=true
