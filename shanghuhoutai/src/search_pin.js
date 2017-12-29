var order_type = '2'
var reg = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/
var reg1 = /^[0-9]{4}\/[0-1]?[0-9]{1}\/[0-3]?[0-9]{1}$/
var reg2 = /^[0-9]{4}\.[0-1]?[0-9]{1}\.[0-3]?[0-9]{1}$/
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

// 待拼单
function addhtml1_(val) {
  var amount_ = []
  var img = val.tProducts.indexPic.split(',')[0]
  var amount = 0
  var message = ''
  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  var endtime = val.endDate;
  endtime = new Date(Date.parse(endtime.replace(/-/g, "/")));
  endtime = endtime.getTime();
  var msg = function (endtime) {
    var nowtime = Date.now();
    var date2 = endtime
    var date = date2 - nowtime
    var h = Math.floor(date / (3600 * 1000))
    var last = date - (h * 3600 * 1000)
    var s = Math.floor(last / (60 * 1000))
    var last2 = last - (s * 60 * 1000)
    var ts = last2 / 1000
    var time = h.toString() + ": " + s.toString() + ": " + ts.toFixed(1)
    return time
  }
  message = val.isover? '已过期订单' : '正在拼团团购订单'
  var time_ = message === '已过期订单' ? val.endDate : msg(endtime)
  var message_ = message === '已过期订单' ? '截止时间' : '剩余时间'
  $('.all').append('' +
    '<div class="details">\n' +
    '    <div class="details-left">\n' +
    '           <img src="' + img + '" alt="">\n' +
    '    </div>\n' +
    '    <div class="details-con width">\n' +
    '    <div class="details-con-top">\n' +
    '<div>订单号：' + val.code + '</div>\n' +
    val.tProducts.pname +
    '</div>\n' +
    '<div class="style">\n' +
    '<span class="yanse">颜色：' + val.tProducts.productsTypes[0].color + '</span>\n' +
    '<span class="chima">尺码：' + val.tProducts.productsTypes[0].size + '</span>\n' +
    '</div>\n' +
    '<div class="price price-charge">\n' +
    '标价：￥<span style="color:black;text-decoration: none">' + val.tProducts.productsTypes[0].tuanPrice +
    '</div>\n' +
    '    <span class="nums num">\n' +
    '剩余库存：' + amount_[0] +
    '    已卖出： ' + val.tProducts.saleNum + '\n' +
    '</span>\n' +
    '</div>\n' +
    '<div class="details-right-charge">\n' +
    '<span style="font-size:20px;color:red">' + message + '</span>' +
    '<div class="fahuo revise-price" title="">\n' +
    '更多\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="details-details-cons">' +
    '<div class="details-details-con">' +
    '<div class="details-ul-wait-pin">' +
    '<ul><li class="wait-pin">' +
    '<div>本订单所有人：' + val.tDeliver.receiver + '    <br>微信昵称：' + val.wxname + '</div>' +
    '<div>拼主：<span>' + val.owner + '</span></div>' +
    '<div>还差<span style="color:red">' + (val.startNum - val.joinNum) + '</span>人</div>' +
    '<div>' + message_ + '：<span style="color:red">' + time_ + '</span></div>' +
    '</li></ul>' +
    '</div>' +
    '</div>' +
    '</div>\n' +
    '    </div>' +
    '')
}

// 已发货
function addhtml2_(val) {
  var img = val.tProducts.indexPic.split(',')[0]
  var amount = 0
  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  $('.all').append('' +
    '<div class="details">\n' +
    '    <div class="details-left">\n' +
    '           <img src="' + img + '" alt="">\n' +
    '    </div>\n' +
    '    <div class="details-con width">\n' +
    '    <div class="details-con-top">\n' +
    '<div>订单号：' + val.code + '</div>\n' +
    val.tProducts.pname +
    '</div>\n' +
    '<div class="style">\n' +
    '<span class="yanse">颜色：' + val.tProductsTypes.color + '</span>\n' +
    '<span class="chima">尺码：' + val.tProductsTypes.size + '</span>\n' +
    '</div>\n' +
    '<div class="price price-charge">\n' +
    '售价：￥' + val.totalPrice +
    '    </div>\n' +
    '    <span class="nums num">\n' +
    '剩余库存：' + amount_[0] +
    '已卖出： ' + val.tProducts.saleNum + '\n' +
    '</span>\n' +
    '</div>\n' +
    '<div class="details-right-charge">\n' +
    '    <div class="address">\n' +
    val.tDeliver.receiver + val.tDeliver.phone + '<br>\n' +
    val.tDeliver.address +
    '</div>\n' +
    '<div class="status">\n' +
    '待签收 ' + val.amount + '件 总价：' + val.totalPrice +
    '</div>\n' +
    '<div class="data">\n' +
    val.createDate +
    '</div>\n' +
    '<span style="font-size:20px;">已发货个人订单</span>' +
    '<div class="fahuo wuliu-details" title="">\n' +
    '查看物流详情\n' +
    '</div>\n' +
    '</div>\n' +
    '<div class="details-details-cons">' +
    '<div class="details-details-con">' +
    '<div class="details-ul">' +
    '<ul>' +
    '<li>' + val.tDeliver.dname + '</li>' +
    '<li>' + val.tDeliver.dcode + '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>\n' +
    '    </div>' +
    '')
}
// 未发货
function addhtml3_(val) {
  var amount_ = []
  var img = val.tProducts.indexPic.split(',')[0]
  var amount = 0
  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)

  $('.all').append('' +
    '<div class="details">\n' +
    '    <div class="details-left">\n' +
    '           <img src="' + img + '" alt="">\n' +
    '    </div>\n' +
    '    <div class="details-con width">\n' +
    '    <div class="details-con-top">\n' +
    '<div>订单号：' + val.code + '</div>\n' +
    val.tProducts.pname +
    '</div>\n' +
    '<div class="style">\n' +
    '<span class="yanse">颜色：' + val.tProductsTypes.color + '</span>\n' +
    '<span class="chima">尺码：' + val.tProductsTypes.size + '</span>\n' +
    '</div>\n' +
    '<div class="price price-charge">\n' +
    '<div class="status">\n' +
    '总价：' + val.totalPrice +
    '</div>\n' +
    '    </div>\n' +
    '    <span class="nums num">\n' +
    '剩余库存：' + amount_[0] +
    '<span style="margin-left: 30px">已卖出：' + val.tProducts.saleNum + '</span>\n' +
    '</span>\n' +
    '</div>\n' +
    '<div class="details-right-charge">\n' +
    '    <div class="address">\n' +
    '<span class="deliverId" style="display:none">' + val.tDeliver.id + '</span>' +
    val.tDeliver.receiver + val.tDeliver.phone + '<br>\n' +
    val.tDeliver.address +
    '</div>\n' +
    '<div class="data">\n' +
    val.createDate +
    '<br><span>待发货数量：' + val.amount + '</span>' +
    '</div>\n' +
    '<span style="font-size:20px;color:red">未发货个人订单</span>' +
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
    '<span class="oid" style="display: none">' + val.id + '</span>' +
    '<div class="express"><input type="text" placeholder="物流订单号"></div>' +
    '<div class="express-sure">确定发货</div>' +
    '</div>' +
    '</div>\n' +
    '</div>'
  )
}

// 已完成
function addhtml5_(val) {
  var img = val.tProducts.indexPic.split(',')[0]
  var amount = 0
  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  $('.all').append('' +
    '<div class="details">\n' +
    '    <div class="details-left">\n' +
    '           <img src="' + img + '" alt="">\n' +
    '    </div>\n' +
    '    <div class="details-con width">\n' +
    '    <div class="details-con-top">\n' +
    '<div>订单号：' + val.code + '</div>\n' +
    val.tProducts.pname +
    '</div>\n' +
    '<div class="style">\n' +
    '<span class="yanse">颜色：' + val.tProductsTypes.color + '</span>\n' +
    '<span class="chima">尺码：' + val.tProductsTypes.size + '</span>\n' +
    '</div>\n' +
    '<div class="price price-charge" style="color:red">\n' +
    '售价：￥' + val.totalPrice +
    '  &nbsp&nbsp<span style="text-decoration: line-through;color:#999;">' + val.tProductsTypes.newPrice + '</span>' +
    '    </div>\n' +

    '    <span class="nums num">\n' +
    '剩余库存：' + amount_[0] +
    '已卖出： ' + val.tProducts.saleNum + '\n' +
    '</span>\n' +
    '</div>\n' +
    '<div class="details-right-charge">\n' +
    '    <div class="address">\n' +
    val.tDeliver.receiver + val.tDeliver.phone + '<br>\n' +
    val.tDeliver.address +
    '</div>\n' +
    '<div class="data">\n' +
    val.createDate +
    '<div class="status">\n' +
    '已完成 ' + val.amount + '件 总价：' + val.totalPrice +
    '<br><span style="font-size:20px;color:red">已完成个人订单</span>' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '    </div>' +
    '')
}
//团购未发货
function addhtml6_(val) {
  var amount = 0
  var amount_ = []
  var ordersList = val.tuanOrdersList

  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  var img = val.tProducts.indexPic.split(',')[0]
  $('.all').append('<div class="details">' +
    '<div class="details-left">' +
    '<img src="' + img + '" alt="">' +
    ' </div>' +
    ' <div class="details-con width">' +
    '<div class="details-con-top">' +
    val.tProducts.pname +
    '</div>' +
    '<div class="price price-charge price-tuan">' +
    ' ￥' + val.tProducts.productsTypes[0].tuanPrice +
    ' <span>￥' + val.tProducts.productsTypes[0].newPrice + '</span>' +
    '</div>' +
    '<span class="nums num">' +
    '剩余库存：' + amount_[0] + ' 已卖出：' + val.tProducts.saleNum +
    ' </span>' +
    '  <div>团购号：' + val.groupCode + '</div>' +
    '   <span>订单号：' + val.code + '</span>' +
    '</div>' +
    '<span style="font-size:20px;color:red">未发货团购订单</span>' +
    '<div class="fahuo-tuan" title="">' +
    ' <input type="button" value="填写物流单号" name="true">' +
    ' </div>' +
    '<div class="details-details-cons-tuan">' +
    ' <div class="ordernumber-tuan">' +
    '<div class="order-img" title="true">' +
    ' <img src="images/arrow-down.png" alt="" width="100%">' +
    '</div>' +
    '</div>' +
    '<div class="details-details-cons-tuan-cons">' +
    '  <div class="details-details-cons-tuan-con">' +
    '<div class="order-datails">' +
    ' <div class="order-details-con">' +
    '<span>' + val.tDeliver.receiver + val.tDeliver.phone + '</span>' +
    ' <span>' + val.tDeliver.address + '</span>' +
    '<span class="dliverid" style="display:none">' + val.tDeliver.id + '</span>' +
    '<span class="tuanid" style="display:none">' + val.id + '</span>' +
    ' </div>' +
    '<div class="order-details-con">' +
    ' <span>颜色：' + val.tProducts.tProductsTypes.color + ' 尺码：' + val.tProducts.tProductsTypes.size + '</span>' +
    ' <span>待发货 ' + val.amount + '件 总价' + val.totalPrice + '</span>' +
    ' </div>' +
    ' </div>' +
    ' <span class="order-creattime">' + val.tDeliver.createDate + '</span>' +
    ' <div class="express-tuan">' +
    ' <div class="express-tuan-con">' +
    '  <span>联系物流</span>' +
    '   <input type="text" placeholder="运单号">' +
    '  <input type="text" placeholder="物流公司">' +
    ' <div class="fahuo-geren">' +
    '    发货' +
    ' </div>' +
    ' </div>' +
    ' </div>' +
    ' </div>' +
    '</div>' +
    ' </div>' +
    '</div>')
}
//团购已发货
function addhtml7_(val) {
  var groupcode = []
  var json = {}
  var amount = 0
  var amount_ = []
  var ordersList = val.tuanOrdersList
  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  var img = val.tProducts.indexPic.split(',')[0]
  $('.all').append('<div class="details">' +
    '<div class="details-left">' +
    ' <img src="' + img + '" alt="">' +
    '</div>' +
    '<div class="details-con width">' +
    ' <div class="details-con-top">' +
    val.tProducts.pname +
    ' </div>' +
    ' <div class="price price-charge price-tuan">' +
    val.tProducts.productsTypes[0].tuanPrice +
    '<span>￥' + val.tProducts.productsTypes[0].newPrice + '</span>' +
    '</div>' +
    '   <span>待收货 ' + val.amount + '件 总价' + val.totalPrice + '</span><br>' +
    '<span class="nums num">' +
    '  剩余库存：' + amount_[0] + ' 已卖出：' + val.tProducts.saleNum +
    ' </span>' +
    '  <div>团购号：' + val.groupCode + '</div>' +
    '   <span>订单号：' + val.code + '</span>' +
    ' </div>' +
    '<span style="font-size:20px;color:red">已发货团购订单</span>' +
    ' <div class="fahuo-tuan-ready" title="true">' +
    '   <input type="button" value="查看详情" name="true">' +
    ' </div>' +
    ' <div class="details-details-cons-tuan-ready">' +
    '<div class="details-details-cons-tuan-con">' +
    '   <div class="order-datails">' +
    '  <div class="order-details-con">' +
    '  <span>' + val.tDeliver.receiver + '   ' + val.tDeliver.phone +
    '</span>' +
    '    <span>' + val.tDeliver.address + '</span>' +
    ' </div>' +
    ' <div class="order-details-con">' +
    ' <span>颜色：' + val.tProductsTypes.color + ' 尺码：' + val.tProductsTypes.size + '</span><br>' +
    '   <span>待收货 ' + val.amount + '件 总价' + val.totalPrice + '</span>' +
    ' </div>' +
    ' </div>' +
    ' <span class="order-creattime">下单时间：' + val.tDeliver.createDate + '</span>' +
    ' </div>' +
    ' <div class="order-number-ready">' +
    '   运单号：<span class="dcode">' + val.tDeliver.dcode +
    '</span> </div>' +
    ' <div class="order-number-ready">' +
    '   快递公司：<span class="dcode">' + val.tDeliver.dname +
    '</span> </div>' +
    // '<div>物流跟踪：</div>' +
    // '<ul>' +

    // ' </ul>' +
    ' </div>' +
    ' </div>' +
    '</div>')
}

//团购已完成
function addhtml8_(val) {
  var groupcode = []
  var json = {}
  var amount = 0
  var amount_ = []
  var ordersList = val.tuanOrdersList

  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  var img = val.tProducts.indexPic.split(',')[0]
  $('.all').append('<div class="details">' +
    '<div class="details-left">' +
    ' <img src="' + img + '" alt="">' +
    '</div>' +
    '<div class="details-con width">' +
    ' <div class="details-con-top">' +
    val.tProducts.pname +
    ' </div>' +
    ' <div class="price price-charge price-tuan">' +
    val.tProducts.productsTypes[0].tuanPrice +
    '<span>￥' + val.tProducts.productsTypes[0].newPrice + '</span>' +
    '</div>' +
    '<span>已完成 ' + val.amount + '件 总价' + val.totalPrice + '</span><br>' +
    '<span class="nums num">' +
    '  剩余库存：' + amount_[0] + ' 已卖出：' + val.tProducts.saleNum +
    ' </span>' +
    '  <div>团购号：' + val.groupCode + '</div>' +
    '   <span>订单号：' + val.code + '</span>' +
    ' </div>' +
    '<span style="font-size:20px;color:red">已完成团购订单</span>' +
    ' <div class="fahuo-tuan-ready" title="true">' +
    '   <input type="button" value="查看详情" name="true">' +
    ' </div>' +

    ' <div class="details-details-cons-tuan-ready">' +
    '<div class="details-details-cons-tuan-con">' +
    '   <div class="order-datails">' +
    '  <div class="order-details-con">' +
    '  <span>' + val.tDeliver.receiver + '   ' + val.tDeliver.phone +
    '</span>' +
    '    <span>' + val.tDeliver.address + '</span>' +
    ' </div>' +
    ' <div class="order-details-con">' +
    ' <span>颜色：' + val.tProductsTypes.color + ' 尺码：' + val.tProductsTypes.size + '</span><br>' +
    '   <span>已完成 ' + val.amount + '件 总价' + val.totalPrice + '</span>' +
    ' </div>' +
    ' </div>' +
    ' <span class="order-creattime">下单时间：' + val.tDeliver.createDate + '</span>' +
    ' </div>' +
    ' <div class="order-number-ready">' +
    '   运单号：' + val.tDeliver.dcode +
    ' </div>' +
    ' <div class="order-number-ready">' +
    '   快递公司：' + val.tDeliver.dname +
    ' </div>' +
    // '<div>物流跟踪：</div>' +
    // '<ul>' +

    // ' </ul>' +
    ' </div>' +
    ' </div>' +
    '</div>')
}

//团购待付款
function addhtml9_(val) {
  var groupcode = []
  var json = {}
  var amount = 0
  var amount_ = []
  if (val.tProducts.productsTypes.length !== 0) {
    val.tProducts.productsTypes.forEach(function (val, key) {
      amount += val.amount
    })
    amount_.push(amount)
    var img = val.tProducts.indexPic.split(',')[0]
    $('.all').append('<div class="details">' +
      '<div class="details-left">' +
      ' <img src="' + img + '" alt="">' +
      '</div>' +
      '<div class="details-con width">' +
      ' <div class="details-con-top">' +
      val.tProducts.pname +
      ' </div>' +
      ' <div class="price price-charge price-tuan">' +
      val.tProducts.productsTypes[0].tuanPrice +
      '<span>￥' + val.tProducts.productsTypes[0].newPrice + '</span>' +
      '</div>' +
      '<span>待付款 ' + val.amount + '件 总价' + val.totalPrice + '</span><br>' +
      '<span class="nums num">' +
      '  剩余库存：' + amount_[0] + ' 已卖出：' + val.tProducts.saleNum +
      ' </span>' +
      '  <div>团购号：' + val.groupCode + '</div>' +
      '   <span>订单号：' + val.code + '</span>' +
      ' </div>' +
      '<span style="font-size:20px;color:red">待付款团购订单</span>' +
      ' <div class="fahuo-tuan-ready" title="true">' +
      '   <input type="button" value="查看详情" name="true">' +
      ' </div>' +

      ' <div class="details-details-cons-tuan-ready">' +
      '<div class="details-details-cons-tuan-con">' +
      '   <div class="order-datails">' +
      '  <div class="order-details-con">' +
      '  <span>' + val.tDeliver.receiver + '   ' + val.tDeliver.phone +
      '</span>' +
      '    <span>' + val.tDeliver.address + '</span>' +
      ' </div>' +
      ' <div class="order-details-con">' +
      ' <span>颜色：' + val.tProductsTypes.color + ' 尺码：' + val.tProductsTypes.size + '</span><br>' +
      '   <span>待付款 ' + val.amount + '件 总价' + val.totalPrice + '</span>' +
      ' </div>' +
      ' </div>' +
      ' <span class="order-creattime">下单时间：' + val.tDeliver.createDate + '</span>' +
      ' </div>' +
      ' </div>' +
      '</div>')
  }
}
//待付款
function addhtml10_(val) {
  var img = val.tProducts.indexPic.split(',')[0]
  var amount = 0
  val.tProducts.productsTypes.forEach(function (val, key) {
    amount += val.amount
  })
  amount_.push(amount)
  $('.all').append('' +
    '<div class="details">\n' +
    '    <div class="details-left">\n' +
    '           <img src="' + img + '" alt="">\n' +
    '    </div>\n' +
    '    <div class="details-con width">\n' +
    '    <div class="details-con-top">\n' +
    '<div>订单号：' + val.code + '</div>\n' +
    val.tProducts.pname +
    '</div>\n' +
    '<div class="style">\n' +
    '<span class="yanse">颜色：' + val.tProductsTypes.color + '</span>\n' +
    '<span class="chima">尺码：' + val.tProductsTypes.size + '</span>\n' +
    '</div>\n' +
    '<div class="price price-charge" style="color:red">\n' +
    '售价：￥' + val.totalPrice +
    '  &nbsp&nbsp<span style="text-decoration: line-through;color:#999;">' + val.tProductsTypes.newPrice + '</span>' +
    '    </div>\n' +

    '    <span class="nums num">\n' +
    '剩余库存：' + amount_[0] +
    '已卖出： ' + val.tProducts.saleNum + '\n' +
    '</span>\n' +
    '</div>\n' +
    '<div class="details-right-charge">\n' +
    '    <div class="address">\n' +
    val.tDeliver.receiver + val.tDeliver.phone + '<br>\n' +
    val.tDeliver.address +
    '</div>\n' +
    '<div class="data">\n' +
    val.createDate +
    '<div class="status">\n' +
    '待付款 ' + val.amount + '件 总价：' + val.totalPrice +
    '<br><span style="font-size:20px;color:red">待付款个人订单</span>' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '    </div>' +
    '')
}
//拼团失败订单
function addhtml11_(val) {
  if (val.tProducts.productsTypes.length !== 0) {
    var amount_ = []
    var img = val.tProducts.indexPic.split(',')[0]
    var amount = 0
    var message = "拼团失败订单"
    val.tProducts.productsTypes.forEach(function (val, key) {
      amount += val.amount
    })
    amount_.push(amount)
    $('.all').append('' +
      '<div class="details">\n' +
      '    <div class="details-left">\n' +
      '           <img src="' + img + '" alt="">\n' +
      '    </div>\n' +
      '    <div class="details-con width">\n' +
      '    <div class="details-con-top">\n' +
      '<div>订单号：' + val.code + '</div>\n' +
      val.tProducts.pname +
      '</div>\n' +
      '<div class="style">\n' +
      '<span class="yanse">颜色：' + val.tProducts.productsTypes[0].color + '</span>\n' +
      '<span class="chima">尺码：' + val.tProducts.productsTypes[0].size + '</span>\n' +
      '</div>\n' +
      '<div class="price price-charge">\n' +
      '标价：￥<span style="color:black;text-decoration: none">' + val.tProducts.productsTypes[0].tuanPrice +
      '</div>\n' +
      '    <span class="nums num">\n' +
      '剩余库存：' + amount_[0] +
      '    已卖出： ' + val.tProducts.saleNum + '\n' +
      '</span>\n' +
      '</div>\n' +
      '<div class="details-right-charge">\n' +
      '<span style="font-size:20px;">' + message + '</span>' +
      '<div class="fahuo revise-price" title="">\n' +
      '更多\n' +
      '</div>\n' +
      '</div>\n' +
      '<div class="details-details-cons">' +
      '<div class="details-details-con">' +
      '<div class="details-ul-wait-pin">' +
      '<ul><li class="wait-pin">' +
      '<div>本订单所有人：' + val.tDeliver.receiver + '<br>微信昵称：' + val.wxname + '</div>' +
      '<div>拼主：<span>' + val.owner + '</span></div>' +
      '<div>开始时间：<span style="color:red">' + val.startDate + '</span></div>' +
      '<div>截止时间：<span style="color:red">' + val.endDate + '</span></div>' +
      '</li></ul>' +
      '</div>' +
      '</div>' +
      '</div>\n' +
      '    </div>' +
      '')
  }
}

// 单价
$('body').on('click', '.sure-price', function () {
  var value = $(this).siblings('input').val()
  var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
  if (value !== '' && reg.test(value)) {
    var id = $(this).siblings('.id').html()
    var active = $(this).parents('.details').find('.active').html()
    var amount = $(this).parents('.details').find('.amount').html()
    var that = $(this)
    $.post(localhost + '/tuan/produttypes/update', {
      saleId: token,
      id: id,
      active: active,
      newPrice: value,
      amount: amount,
      online_code: onlinecode
    }, function (data) {
      outline(data)
      if (data.message === '操作成功') {
        that.parents('.list').find('.newPrice').text(value)
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
    var active = $(this).parents('.details').find('.active').html()
    var newPrice = $(this).parents('.details').find('.newPrice').html()
    var that = $(this)
    $.post(localhost + '/tuan/produttypes/update', {
      saleId: token,
      id: id,
      active: active,
      amount: nums,
      newPrice: newPrice,
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
  var ind = $(this).parents('.details').find('.produt-id span').text()
  var ind_ = $(this).parents('.details').index()
  var index = $(this).parents('.list').index() - 1
  var id = $(this).find('.id').html()
  var amount = $(this).parents('.list').find('.amount').html()
  var newPrice = $(this).parents('.list').find('.newPrice').html()
  var that = $(this)
  $.post(localhost + '/tuan/produttypes/update', {
    saleId: token,
    id: id,
    active: false,
    amount: amount,
    newPrice: newPrice,
    online_code: onlinecode
  }, function (data) {
    outline(data)
    if (data.message === '操作成功') {
      $('.details').eq(ind_).find('.list').eq(index).remove()
    }
    if ($('.details').eq(ind_).find('.del').length === 0) {
      $.post(localhost + '/tuan/product/update', {
        saleId: token,
        id: ind,
        active: false,
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
})

// 商品下架
$('body').on('click', '.down', function () {
  var ind = $(this).parents('.details').find('.produt-id span').text()
  var ind_ = $(this).parents('.details').index()
  $.post(localhost + '/tuan/product/update', {
    saleId: token,
    id: ind,
    active: false,
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
  var active = $(this).parents('.details').find('.active').text()
  localStorage.setItem('fix', index)
  localStorage.setItem('isactive', active)
  location.href = 'fix_pin.html'
})

// 上架
$('body').on('click', '.shangjia', function () {
  var id = $(this).parents('.details').find('.id_id').text()
  var that = $(this)
  $.post(localhost + '/tuan/product/update', {
    saleId: token,
    id: id,
    active: true,
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.message === '操作成功') {
      alert('上架成功！')
      that.parents('.details').remove()
    }
  })
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

// 团购点击发货按钮
$('.all').on('click', '.fahuo-tuan input', function () {
  var stu = eval($(this).prop('name')) === true ? true : false
  $(this).prop('name', !stu)
  if (stu) {
    $(this).val('隐藏')
    $(this).parents('.details').find('.details-details-cons-tuan').slideDown()
  } else {
    $(this).val('填写物流单号')
    $(this).parents('.details').find('.details-details-cons-tuan').slideUp()
  }
})

// 点击箭头查看发货
$('.all').on('click', '.order-img', function () {
  var stu = eval($(this).prop('title')) === true ? true : false
  $(this).prop('title', !stu)
  if (stu) {
    $(this).css({
      'transform': 'rotate(180deg)'
    })
    $(this).parent('.ordernumber-tuan').next('.details-details-cons-tuan-cons').slideDown()
  } else {
    $(this).css({
      'transform': ' rotate(0deg)'
    })
    $(this).parent('.ordernumber-tuan').next('.details-details-cons-tuan-cons').slideUp()
  }
})

// 团购点击物流状态
$('.all').on('click', '.fahuo-tuan-ready input', function () {
  var stu = eval($(this).prop('name')) === true ? true : false
  var dcode = $(this).parents('.details').find('.dcode').text()
  var that = $(this)
  $(this).prop('name', !stu)
  if (stu) {
    $(this).val('隐藏')
    $(this).parents('.details').find('.details-details-cons-tuan-ready').slideDown()
  } else {
    $(this).val('查看详情')
    $(this).parents('.details').find('.details-details-cons-tuan-ready').slideUp()
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


// 普通订单发货点击确认按钮，成功后更改订单状态
$('body').on('click', '.express-sure', function () {
  var dename_ = []
  var index = $(this).parents('.details').index()
  var oid = $(this).siblings('.oid').text()
  var dcode = $(this).siblings('.express').find('input').val()
  var dname = $(this).siblings('.details-ul').find('input').val()
  var id = $(this).parents('.details').find('.deliverId').html()
  $.post(localhost + '/tuan/tdeliver/update', {
    id: id,
    oid: oid,
    saleId: token,
    dcode: dcode,
    dname: dname,
    online_code: onlinecode
  }, function (data) {
    outline(data)
    if (data.error == true) {
      alert(data.message)
    } else {
      if (data.message === '操作成功') {
        alert(data.message)
        $.post(localhost + '/tuan/torders/changestate', {
          oid: oid,
          state: '待收货订单',
          saleId: token,
          online_code: onlinecode
        }, function (data) {
          outline(data)
          if (data.error == true) {
            alert(data.message)
          } else {
            if (data.message === '操作成功') {
              $('.all').find('.details').eq(index).remove()
            }
          }
        })
      }
    }
  })
})

//团购订单发货 
$('.all').on('click', '.fahuo-geren', function () {
  var did = $(this).parents('.details-details-cons-tuan-con').find('.dliverid').html()
  var oid = $(this).parents('.details-details-cons-tuan-con').find('.tuanid').html()
  var dcode = $(this).parents('.express-tuan-con').find('input').eq(0).val()
  var dname = $(this).parents('.express-tuan-con').find('input').eq(1).val()
  var index = $(this).parents('.details-details-cons-tuan-con').index()
  var that = $(this)
  $.post(localhost + '/tuan/tdeliver/update_tuan', {
    id: did,
    dcode: dcode,
    dname: dname,
    saleId: token,
    oid: oid,
    online_code: onlinecode
  }, function (res) {
    outline(res)
    if (res.error) {
      alert(res.message)
    } else {
      if (res.message === '操作成功') {
        $.post(localhost + '/tuan/tuanorders/changestate', {
          oid: oid,
          state: '待收货团购订单',
          saleId: token,
          online_code: onlinecode
        }, function (res) {
          outline(res)
          if (res.error) {
            alert(res.message)
          } else {
            if (res.message === '操作成功') {
              alert('发货成功')
              that.parents('.details-details-cons-tuan-cons').find('.details-details-cons-tuan-con').eq(index).remove()
              if (that.parents('.details-details-cons-tuan-cons').find('.details-details-cons-tuan-con').length === 0) {
                that.parents('.details-details-cons-tuan-cons').remove()
              }
            } else {
              alert(res.message)
            }
          }
        })
      }
    }
  })
})

//查询方法
function search() {
  var code = $('.number input').val()
  var startDate = $('.input-time input').eq(0).val()
  var endDate = $('.input-time input').eq(1).val()
  var wxname = $('.nickname input').val()
  if ((endDate === '' && startDate === '') || (endDate !== '' && startDate !== '')) {
    if (startDate !== '' && endDate !== '') {
      if (!reg.test(startDate)) {
        if (reg2.test(startDate)) {
          startDate = startDate.split('.').join('-')
        } else if (reg1.test(startDate)) {
          startDate = startDate.split('/').join('-')
        } else {
          alert('日期格式为  年-月-日')
          return false
        }
      }
      if (!reg.test(endDate)) {
        if (reg2.test(endDate)) {
          endDate = endDate.split('.').join('-')
        } else if (reg1.test(endDate)) {
          endDate = endDate.split('/').join('-')
        } else {
          alert('日期格式为  年-月-日')
          return false
        }
      }
    }
    $.post(localhost + '/tuan/torders/query', {
      code: code,
      startDate: startDate,
      endDate: endDate,
      wxname: wxname,
      order_type: order_type,
      saleId: token,
      online_code: onlinecode
    }, function (res) {
      outline(res)
      $('.all').html('')
      if (res.data !== null) {
        var content = res.data
        content.forEach(function (val, key) {
          var state = val.state
          switch (state) {
            case "已完成团购订单":
              addhtml8_(val)
              break;
            case "待收货团购订单":
              addhtml7_(val)
              break;
            case "待付款团购订单":
              addhtml9_(val)
              break;
            case "待发货团购订单":
              addhtml6_(val)
              break;
            case "正在拼团团购订单":
              addhtml1_(val)
              break;
            case "拼团失败订单":
              addhtml11_(val)
              break;
            case "待付款订单":
              addhtml10_(val)
              break;
            case "待发货订单":
              addhtml3_(val)
              break;
            case "已完成订单":
              addhtml5_(val)
              break;
            case "待收货订单":
              addhtml2_(val)
              break;
            default:
              break;
          }
        });
      }
    })
  } else {
    alert('开始日期与结束日期必须全部填写完整或或全部不填')
  }
}

$('select').click(function () {
  var type = $('select option:selected').val()
  order_type = type
})

$('.search-sure input').click(function () {
  search()
})

$('body').on('keydown', function (e) {
  if (e.keyCode === 13) {
    search()
  }
})