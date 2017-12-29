var amount_ = []
var saleNumber_ = []
var content
var pages = 0
var pagesindex = 0
var showlist = []
var enlist = []
var dename = []
var style, details, html_
var nums = 0

if (authority === '0') {
  $('.body-top ul li:gt(0)').css({
    'display': 'none'
  })
  $('.body-top ul').css({
    'background': '#18cffb'
  })
}
$('body').on('click', '.edit', function () {
  if ($(this).attr('title') === '') {
    $(this).siblings('.details-details').stop(true).slideDown()
    $(this).prop('title', '编辑')
  } else {
    $(this).siblings('.details-details').stop(true).slideUp()
    $(this).prop('title', '')
  }
})
// 正在销售
function addhtml_(content) {
  $('.all').html('')
  $('.pages').show()

  for (var q = content.length - 1; q >= 0; q--) {
    if (content[q].active === false) {
      content.splice(q, 1)
    }
    for (var s = content[q].produtsTypes.length - 1; s >= 0; s--) {
      if (content[q].produtsTypes[s].active === false) {
        content[q].produtsTypes.splice(s, 1)
      }
      if (content[q].produtsTypes.length === 0) {
        content.splice(q, 1)
      }
    }
  }
  if (content.length === 0) {
    $('.all').html('您没有发布任何商品！<a href="push.html" style="color:red">点击发布</a>')
    return false
  } else {
    for (var i = 0; i < content.length; i++) {
      var amount = 0
      var saleNumber = 0
      var img = content[i].indexImages.split(',')
      content[i].produtsTypes.forEach(function (val, key) {
        amount += val.amount
      })
      amount_.push(amount)
      content[i].monthSale === null ? saleNumber_ = 0 : saleNumber_ = content[i].monthSale
      $('.all').append('<div class="details">\n' +
        '                <div class="details-left">\n' +
        '                    <img src="' + img[0] + '" alt="">\n' +
        '                </div>\n' +
        '                <div class="details-con">\n' +
        '                    <div class="details-con-top">\n' +
        content[i].pname +
        '                    </div>\n' +
        '                    <div class="init">   </div>\n' +
        '                    <div class="price">\n' +
        '<div class="produt-id" style="display:none">商品编号：<span>' + content[i].id + '</span></div>' +
        '<div style="color:red">商品编号：<span style="color:red">' + content[i].pcode + '</span></div>' +
        '                        <span class="nums">\n' +
        '                            剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
        '                            已卖出：' + saleNumber_ + '\n' +
        '                        </span>\n' +
        '                    </div>' +

        '                </div>\n' +
        '                <div class="edit" title="">编辑</div>\n' +
        '                <div class="down" title="">下架</div>\n' +
        '                <div class="fix" title="">修改</div>\n' +
        '                <div class="shopcar-count" title="">已加购物车人数：' + content[i].shopcar_count + '</div>\n' +
        '\n' +
        '                <div class="details-details">\n' +
        '                    <div class="">\n' +
        '                        <span>颜色</span>\n' +
        '                        <span>尺码</span>\n' +
        '                        <span>单价</span>\n' +
        '                        <span>修改单价</span>\n' +
        '                        <span>库存</span>\n' +
        '                        <span>增加库存</span>\n' +
        // '                        <span>已卖出</span>\n' +
        '                        <span>下架</span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>')

      for (var k = 0; k < content[i].produtsTypes.length; k++) {
        $('.details-details').eq(i).append(
          '<div class="list">\n' +
          '<span>' + content[i].produtsTypes[k].color + '</span>\n' +
          '<span>' + content[i].produtsTypes[k].size + '</span>\n' +
          '<span>' + content[i].produtsTypes[k].discountPrice + '</span>\n' +
          '<span><span class="id" style="display: none">' + content[i].produtsTypes[k].id + '</span><input type="text"><span class="sure-price">确定</span></span>\n' +
          '<span>' + content[i].produtsTypes[k].amount + '</span>\n' +
          '<span><span class="id" style="display: none">' + content[i].produtsTypes[k].id + '</span><input type="text"><span class="sure-nums">确定</span></span>\n' +
          // '<span>' + content[i].produtsTypes[k].saleNumber + '</span>\n' +
          '<span class="del"><span class="id" style="display: none">' + content[i].produtsTypes[k].id + '</span><span class="id_id" style="display: none">' + content[i].id + '</span>下架</span>' +
          ' </div>\n' +
          '')
      }
    }
  }
}

// 仓库
function addhtml4_(content) {
  $('.all').html('')
  $('.pages').show()
  if (content.length === 0) {
    $('.all').html('您没有已下架商品！')
    return false
  } else {
    for (var q = content.length - 1; q >= 0; q--) {
      if (content[q].active === true) {
        content.splice(q, 1)
      }
    }
    for (var i = 0; i < content.length; i++) {
      var amount = 0
      var saleNumber = 0

      if (content.length === 0) {
        $('.all').html('暂无商品！')
        return false
      } else
        {
        var img = content[i].indexImages.split(',')
        content[i].produtsTypes.forEach(function (val, key) {
          amount += val.amount
        })
        amount_.push(amount)
        content[i].monthSale === null ? saleNumber_ = 0 : saleNumber_ = content[i].monthSale
        $('.all').append('<div class="details">\n' +
          '<div class="id_id" style="display: none">' + content[i].id + '</div>' +
          '                <div class="details-left">\n' +
          '                    <img src="' + img[0] + '" alt="">\n' +
          '                </div>\n' +
          '                <div class="details-con">\n' +
          '                    <div class="details-con-top">\n' +
          content[i].pname +
          '                    </div>\n' +
          '                    <div class="init">   </div>\n' +
          '                    <div class="price">\n' +
          '<div class="produt-id" style="display:none">商品编号：<span>' + content[i].id + '</span></div>' +
          '<div style="color:red">商品编号：<span style="color:red">' + content[i].pcode + '</span></div>' +
          '                        <span class="nums">\n' +
          '                            剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
          '                            已卖出：' + saleNumber_ + '\n' +
          '                        </span>\n' +
          '                    </div>' +
          '                </div>\n' +
          '                <div class="edit" title="">编辑</div>\n' +
          '                <div class="shangjia" title="">上架</div>\n' +
          '                <div class="fix" title="">修改</div>\n' +
          '\n' +
          '                <div class="details-details">\n' +
          '                    <div class="">\n' +
          '                        <span>颜色</span>\n' +
          '                        <span>尺码</span>\n' +
          '                        <span>单价</span>\n' +
          '                        <span>修改单价</span>\n' +
          '                        <span>库存</span>\n' +
          '                        <span>增加库存</span>\n' +
          // '                        <span>已卖出</span>\n' +
          // '                        <span>shang</span>\n' +
          '                    </div>\n' +
          '                </div>\n' +
          '            </div>')
      }
      for (var k = 0; k < content[i].produtsTypes.length; k++) {
        $('.details-details').eq(i).append(
          '<div class="list">\n' +
          '<span>' + content[i].produtsTypes[k].color + '</span>\n' +
          '<span>' + content[i].produtsTypes[k].size + '</span>\n' +
          '<span>' + content[i].produtsTypes[k].discountPrice + '</span>\n' +
          '<span><span class="id" style="display: none">' + content[i].produtsTypes[k].id + '</span><input type="text"><span class="sure-price">确定</span></span>\n' +
          '<span>' + content[i].produtsTypes[k].amount + '</span>\n' +
          '<span><span class="id" style="display: none">' + content[i].produtsTypes[k].id + '</span><input type="text"><span class="sure-nums">确定</span></span>\n' +
          // '<span>' + content[i].produtsTypes[k].saleNumber + ' </span>\n' +
          '<span class="del" style="display: none"><span class="id" style="display: none">' + content[i].produtsTypes[k].id +
          '</span><span class="id_id" style="display: none">' + content[i].id + '</span>下架</span>' +
          ' </div>\n' +
          '')
      }
    }
  }
}



// 预售列表
function addhtml2_(cent) {
    $('.all').html('')
    $('.pages').show()
    if (cent.length === 0) {
        $('.all').html('您没有预售商品！')
        return false
    } else
      {

        }
        for (var i = 0; i < cent.length; i++) {
            var amount = 0
            var saleNumber = 0
            if (cent.length === 0) {
                $('.all').html('暂无商品！')
                return false
            } else
              {
                var img = cent[i].indexImages.split(',')
                cent[i].produtsTypes.forEach(function (val, key) {
                    amount += val.amount
                })
                amount_.push(amount)
                cent[i].monthSale === null ? saleNumber_ = 0 : saleNumber_ = cent[i].monthSale
                $('.all').append('<div class="details">\n' +
                    '<div class="id_id" style="display: none">' + cent[i].id + '</div>' +
                    '                <div class="details-left">\n' +
                    '                    <img src="' + img[0] + '" alt="">\n' +
                    '                </div>\n' +
                    '                <div class="details-con">\n' +
                    '                    <div class="details-con-top">\n' +
                    cent[i].pname +
                    '                    </div>\n' +
                    '                    <div class="init">   </div>\n' +
                    '                    <div class="price">\n' +
                    '<div class="produt-id" style="display:none">商品编号：<span>' + cent[i].id + '</span></div>' +
                    '<div style="color:red">商品编号：<span style="color:red">' + cent[i].pcode + '</span></div>' +
                    '                        <span class="nums">\n' +
                    '                            剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
                    '                            已卖出：' + saleNumber_ + '\n' +
                    '                        </span>\n' +
                    '                    </div>' +
                    '                </div>\n' +
                    '\n' +
                    '                <div class="details-details">\n' +
                    '                    <div class="">\n' +
                    '                        <span>颜色</span>\n' +
                    '                        <span>尺码</span>\n' +
                    '                        <span>单价</span>\n' +
                    '                        <span>修改单价</span>\n' +
                    '                        <span>库存</span>\n' +
                    '                        <span>增加库存</span>\n' +
                    // '                        <span>已卖出</span>\n' +
                    // '                        <span>shang</span>\n' +'+ allTime[i] +'
                    '                    </div>\n' +
                    '                </div>\n' +
                    '                <div class="details-times"  endTime="'+ cent[i].showDate+'">' +
                    '</div>\n'+
                    '            </div>')
                  $('body').append("<script src='js/times.min.js'></script>")
     }


            for (var k = 0; k < cent[i].produtsTypes.length; k++) {
                $('.details-details').eq(i).append(
                    '<div class="list">\n' +
                    '<span>' + cent[i].produtsTypes[k].color + '</span>\n' +
                    '<span>' + cent[i].produtsTypes[k].size + '</span>\n' +
                    '<span>' + cent[i].produtsTypes[k].discountPrice + '</span>\n' +
                    '<span><span class="id" style="display: none">' + cent[i].produtsTypes[k].id + '</span><input type="text"><span class="sure-price">确定</span></span>\n' +
                    '<span>' + cent[i].produtsTypes[k].amount + '</span>\n' +
                    '<span><span class="id" style="display: none">' + cent[i].produtsTypes[k].id + '</span><input type="text"><span class="sure-nums">确定</span></span>\n' +
                    // '<span>' + cent[i].produtsTypes[k].saleNumber + ' </span>\n' +
                    '<span class="del" style="display: none"><span class="id" style="display: none">' + cent[i].produtsTypes[k].id +
                    '</span><span class="id_id" style="display: none">' + cent[i].id + '</span>下架</span>' +
                    ' </div>\n' +
                    '')
            }
        }
}






$('.body-top ul li').click(function () {
  var id_ = $(this).index()
  pagesindex = $(this).index()
  pages = 0
    var No = 'no'
  $('.all').html('')
  switch (id_) {
    case 0:
      $.post(localhost + '/shopCar/shopcar_by_pro', {
        pageNumber: pages,
        pageSize: 10,
        sellerId: token,
        active: true,
        online_code: onlinecode
      }, function (data) {

        outline(data)
        var content = data.data
        addhtml_(content)
        if (content.length === 0) {
          $('.pages').hide()
        } else {
          $('.pages').show()
        }
      })
      break
    case 1:
      $.post(localhost + '/seller/pro/list', {
        pageNumber: pages,
        pageSize: 10,
        token: token,
        active: false,
        online_code: onlinecode
      }, function (data) {
        outline(data)
        var content = data.data.content
        addhtml4_(content)
        if (content.length === 0) {
          $('.pages').hide()
        } else {
          $('.pages').show()
        }
      })
      break
    case 2:
          $.post(localhost + '/seller/pro/list', {
              pageNumber: pages,
              pageSize: 10,
              token: token,
              active: true,
              online_code: onlinecode,
              showdate:No
          }, function (res) {
            console.log(res)
              var content =res.data.content
              var cent =[];
            cent.push.apply(cent,content)
              if (content.length === 0) {
                  $('.pages').hide()
              } else {
                  $('.pages').show()
              }
              outline(res)
              addhtml2_(cent)
          })
          break
    default:
      break
  }
})

  // 获取已销售信息

  ; (function () {
    $.post(localhost + '/shopCar/shopcar_by_pro', {
      sellerId: token,
      active: true,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      var content = data.data
      nums = data.token - 0
      if (content.length === 0) {
        $('.pages').hide()
      }
      addhtml_(content)
    })
  }())


// 单价
$('body').on('click', '.sure-price', function () {
  var value = $(this).siblings('input').val()
  var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
  if (value !== '' && reg.test(value)) {
    var nums = $(this).siblings('input').val()
    var id = $(this).siblings('.id').html()
    var id_id = $(this).parents('.details').find('.id_id').html()
    var that = $(this)
    $.post(localhost + '/seller/pro/update', {
      token: token,
      ptypeId: id,
      pid: id_id,
      discount: nums,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.message === '操作成功') {
        that.parents('span').siblings('span').eq(2).html(nums)
        that.siblings('input').val('')
      } else {
        alert('未修改成功！')
      }
    })
  }
})
// 库存
$('body').on('click', '.sure-nums', function () {
  var nums = $(this).siblings('input').val()
  if (nums !== '') {
    var id = $(this).siblings('.id').html()
    var that = $(this)
    $.post(localhost + '/protype/update', {
      token: token,
      id: id,
      amount: nums,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.message === '操作成功') {
        that.parents('span').siblings('span').eq(4).html(nums)
        that.siblings('input').val('')
      } else {
        alert('未修改成功！')
      }
    })
  }
})

// 分类商品下架
$('body').on('click', '.del', function () {
  if ($(this).siblings('input') !== '') {
    var id = $(this).find('.id').html()
    var id_id = $(this).find('.id_id').html()
    var ind = $(this).parents('.list').index() - 1
    var ind_ = $(this).parents().parents().parents().index()
    $.post(localhost + '/seller/pro/update', {
      token: token,
      protypeId: id,
      pid: id_id,
      downptype: 'downptype',
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.message === '操作成功') {
        $('.details').eq(ind_).find('.list').eq(ind).remove()
      }
      if ($('.details').eq(ind_).find('.del').length === 0) {
        $.post(localhost + '/seller/pro/update', {
          token: token,
          pid: id_id,
          downpro: 'downpro',
          online_code: onlinecode
        }, function (data) {
          outline(data)
          if (data.message === '操作成功') {
            $('.details').eq(ind_).remove()
          }
        })
      }
      if ($('.details').length === 0) {
        $('.pages').hide()
      }
    })
  }
})

// 商品下架
$('body').on('click', '.down', function () {
  var ind = $(this).parents('.details').find('.produt-id span').text()
  var ind_ = $(this).parents('.details').index()
  $.post(localhost + '/seller/pro/update', {
    token: token,
    pid: ind,
    downpro: 'downpro',
    online_code: onlinecode
  }, function (data) {
    outline(data)
    if (data.message === '操作成功') {
      $('.details').eq(ind_).remove()
    }
  })
})

// 跳转页面进行商品修改
$('body').on('click', '.fix', function () {
  var index = $(this).parents('.details').find('.produt-id span').text()
  localStorage.setItem('fix', index)
  location.href = 'fix.html'
})

// 上架
$('body').on('click', '.shangjia', function () {
  var id = $(this).parents('.details').find('.produt-id span').text()
  var that = $(this)
  $.post(localhost + '/seller/pro/update', {
    token: token,
    pid: id,
    active_pro: 'active_pro',
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.message === '操作成功') {
      alert('上架成功！')
      that.parents('.details').remove()
    }
  })
})



// 下一页
$('.next').click(function () {
  pages++
  if (pagesindex === 0 && pages === nums) {
    $('.message').html('这已经是最后一页了！').fadeIn()
    setTimeout(function () {
      $('.message').fadeOut()
    }, 1000)
    pages--
    return false
  }
  switch (pagesindex) {
    case 0:
      style = '/shopCar/shopcar_by_pro'
      details = {
        pageNumber: pages,
        pageSize: 10,
        sellerId: token,
        active: true,
        online_code: onlinecode
      }
      html_ = addhtml_
      break
    case 1:
      style = '/seller/pro/list'
      details = {
        pageNumber: pages,
        pageSize: 10,
        token: token,
        active: false,
        online_code: onlinecode
      }
      html_ = addhtml4_
      break
  }
  $.post(localhost + style, details, function (data) {
    outline(data)
    if (pagesindex === 0) {
      content = data.data
    } else {
      content = data.data.content
    }
    if (content.length === 0) {
      $('.message').html('这已经是最后一页了！').fadeIn()
      setTimeout(function () {
        $('.message').fadeOut()
      }, 1000)
      pages--
      switch (pagesindex) {
        case 0:
          style = '/shopCar/shopcar_by_pro'
          details = {
            pageNumber: pages,
            pageSize: 10,
            sellerId: token,
            active: true,
            online_code: onlinecode
          }
          html_ = addhtml_
          break
        case 1:
          style = '/seller/pro/list'
          details = {
            pageNumber: pages,
            pageSize: 10,
            token: token,
            active: false,
            online_code: onlinecode
          }
          html_ = addhtml4_
          break
      }
      $.post(localhost + style, details, function (data) {
        outline(data)
        content = data.data.content
        html_(content)
        if (content.length === 0) {
          $('.pages').hide()
        } else {
          $('.pages').show()
        }
      })
    } else {
      if (pagesindex === 0) {
        content = data.data
      } else {
        content = data.data.content
      }
      html_(content)
    }
  })
})

// 上一页
$('.last').click(function () {
  pages--
  if (pages < 0) {
    pages = 0
    $('.message').html('这已经是第一页了！').fadeIn()
    setTimeout(function () {
      $('.message').fadeOut()
    }, 1000)
  } else {
    switch (pagesindex) {
      case 0:
        style = '/shopCar/shopcar_by_pro'
        details = {
          pageNumber: pages,
          pageSize: 10,
          sellerId: token,
          active: true,
          online_code: onlinecode
        }
        html_ = addhtml_
        break
      case 1:
        style = '/seller/pro/list'
        details = {
          pageNumber: pages,
          pageSize: 10,
          token: token,
          active: false,
          online_code: onlinecode
        }
        html_ = addhtml4_
        break
    }
    $.post(localhost + style, details, function (data) {
      outline(data)
      if (pagesindex === 0) {
        content = data.data
      } else {
        content = data.data.content
      }
      html_(content)
      if (content.length === 0) {
        $('.pages').hide()
      } else {
        $('.pages').show()
      }
    })
  }
})
