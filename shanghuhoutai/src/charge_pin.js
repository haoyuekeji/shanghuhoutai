var amount_ = []
var saleNumber_ = []
var content
var pages = 0
var pagesindex = 0
var showlist = []
var enlist = []
var dename = []
var style_ = '/tuan/product/list'
var details_ = {
    pageNumber: pages,
    pageSize: 10,
    saleId: token,
    active: true,
    online_code: onlinecode
}
var html_ = addhtml_
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
        $(this).parents('.details').find('.details-details').stop(true).slideDown()
        $(this).prop('title', '编辑')
    } else {
        $(this).parents('.details').find('.details-details').stop(true).slideUp()
        $(this).prop('title', '')
    }
})
function chageStyle(style, html, state) {
    console.log(style)
    if (arguments.length === 2) {
        this.style_ = style
        this.details_ = {
            pageNumber: pages,
            pageSize: 10,
            saleId: token,
            active: true,
            online_code: onlinecode
        }
        this.html_ = html
    } else {
        this.style_ = style
        this.details_ = {
            pageNumber: pages,
            pageSize: 10,
            saleId: token,
            active: true,
            state: state,
            online_code: onlinecode
        }
        this.html_ = html
    }
}
// 正在销售
function addhtml_(content) {
    $('.all').html('')
    $('.pages').show()
    if (content.length === 0) {
        $('.all').html('您没有发布任何商品！<a href="push_pin.html" style="color:red">点击发布</a>')
        return false
    } else {
        for (var i = 0; i < content.length; i++) {
            console.log(content)
            var amount = 0;
            var img = content[i].indexPic.split(',')[0]
            content[i].productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)

            $('.all').append(
            	'<div class="details">' + 
					'<div class="id_id" style="display:none;">' + content[i].id + '</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].pname +'</p>' + 
							'<div class="produt-id" style="color:red;">商品编号：<span>' + content[i].id + '</span></div>' +
							'<div class="surplus">' +
								'<span class="nums" style="color:#888888; font-size:10px">\n' +
					                '剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
					                '已卖出：' +  content[i].saleNum + 
				                '</span>\n' +
							'</div>' + 
						'</div>' + 
					'</div>' + 
					'<div class="details-slidedown">' + 
						'<div class="edit" title="">编辑</div>\n' +
	                	'<div class="down" title="">下架</div>\n' +
	                	'<div class="fix" title="">修改</div>\n' +
					'</div>' + 
	                '<div class="details-details">\n' +
		                '<div class="">\n' +
			                '<span>颜色</span>\n' +
			                '<span>尺码</span>\n' +
			                '<span>单价</span>\n' +
			                '<span>修改单价</span>\n' +
			                '<span>库存</span>\n' +
			                '<span>增加库存</span>\n' +
			                '<span>下架</span>\n' +
			                '<span class="active" style="display:none">' + content[i].active + '</span>' +
		                '</div>\n' +
	                '</div>\n' +
				'</div>'
            	/*'<div class="details">\n' +
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
                // '<div style="color:red">商品编号：<span style="color:red">' + content[i].pcode + '</span></div>' +
                '                        <span class="nums">\n' +
                '                            剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
                '                            已卖出：' +  content[i].saleNum + '\n' +
                '                        </span>\n' +
                '                    </div>' +

                '                </div>\n' +
                '                <div class="edit" title="">编辑</div>\n' +
                '                <div class="down" title="">下架</div>\n' +
                '                <div class="fix" title="">修改</div>\n' +
                // '                <div class="shopcar-count" title="">已加购物车人数：' + content[i].shopcar_count + '</div>\n' +
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
                '<span class="active" style="display:none">' + content[i].active + '</span>' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>'*/
            )

            for (var k = 0; k < content[i].productsTypes.length; k++) {
                $('.details-details').eq(i).append(
                    '<div class="list">\n' +
                    '<span>' + content[i].productsTypes[k].color + '</span>\n' +
                    '<span>' + content[i].productsTypes[k].size + '</span>\n' +
                    '<span class="newPrice">' + content[i].productsTypes[k].newPrice + '</span>\n' +
                    '<span><span class="id" style="display: none">' + content[i].productsTypes[k].id + '</span><input type="text"><span class="sure-price">确定</span></span>\n' +
                    '<span class="amount">' + content[i].productsTypes[k].amount + '</span>\n' +
                    '<span><span class="id" style="display: none">' + content[i].productsTypes[k].id + '</span><input type="text"><span class="sure-nums">确定</span></span>\n' +
                    // '<span>' + content[i].productsTypes[k].saleNumber + '</span>\n' +
                    '<span class="del"><span class="pid" style="display: none">' + content[i].id + '</span><span class="id" style="display: none">' + content[i].productsTypes[k].id + '</span><span class="pactive" style="display: none">' + content[i].productsTypes[k].isActive + '</span>下架</span>' +
                    ' </div>\n' +
                    '')
            }
        }
    }
}

// 待拼单
function addhtml1_(content) {
    $('.all').html('')
    if (content.length === 0) {
        $('.all').html('您没有待拼订单！')
        return false
    } else {
        var amount_ = []
        for (var i = 0; i < content.length; i++) {
            var img = content[i].products.indexPic.split(',')[0]
            var amount = 0
            content[i].products.productsTypes.forEach(function (val, key) {
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
                '<div>团购订单号：' + content[i].iterable[0].groupCode + '  </br>  ' + '个人订单号：' + content[i].iterable[0].code + '</div>\n' +
                content[i].products.pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].products.productsTypes[0].color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].products.productsTypes[0].size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge">\n' +
                '标价：￥<span style="color:black;text-decoration: none">' + content[i].products.productsTypes[0].tuanPrice +
                '</div>\n' +
                '    <span class="nums num">\n' +
                '剩余库存：' + amount_[0] +
                '    已卖出： ' + content[i].products.saleNum  + '\n' +
                '</span>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '<div class="fahuo revise-price" title="">\n' +
                '更多\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="details-details-cons">' +
                '<div class="details-details-con">' +
                '<div class="details-ul-wait-pin">' +

                '</div>' +
                '</div>' +
                '</div>\n' +
                '    </div>' +
                '')
            var iterable = content[i].iterable

            for (var k = 0; k < iterable.length; k++) {
                var endtime = iterable[k].endDate;
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
                    var time = h.toString() + ": " + s.toString() + ": " + ts.toFixed(2)
                    return time
                }

                $('.details-ul-wait-pin').eq(i).append('<ul><li class="wait-pin">' +
                    '<div>拼主：<span>' + iterable[k].owner + '</span></div>' +
                    '<div>还差<span style="color:red">' + (iterable[k].startNum - iterable[k].joinNum) + '</span>人</div>' +
                    '<div>剩余时间：<span style="color:red">' + msg(endtime) + '</span></div>' +
                    '</li></ul>')
            }
        }
    }
}

// 已发货
function addhtml2_(content) {
    $('.all').html('')
    if (content.length === 0) {
        $('.all').html('您没有已发货个人订单！')
        return false
    } else {
        for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
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
                '<div>订单号：' + content[i].code + '</div>\n' +
                content[i].tProducts.pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge">\n' +
                '售价：￥' + content[i].totalPrice +
                '    </div>\n' +
                '    <span class="nums num">\n' +
                '剩余库存：' + amount_[0] +
                '已卖出： ' + content[i].saleNum  + '\n' +
                '</span>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '    <div class="address">\n' +
                content[i].tDeliver.receiver + content[i].tDeliver.phone + '<br>\n' +
                content[i].tDeliver.address +
                '</div>\n' +
                '<div class="status">\n' +
                '待签收 ' + content[i].amount + '件 总价：' + content[i].totalPrice +
                '</div>\n' +
                '<div class="data">\n' +
                content[i].createDate +
                '</div>\n' +
                '<div class="fahuo wuliu-details" title="">\n' +
                '查看物流详情\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="details-details-cons">' +
                '<div class="details-details-con">' +
                '<div class="details-ul">' +
                '<ul>' +
                '<li>' + content[i].tDeliver.dname + '</li>' +
                '<li>' + content[i].tDeliver.dcode + '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>\n' +
                '    </div>' +
                '')
        }
    }
}

// 未发货
function addhtml3_(content) {
    $('.all').html('')
    if (content.length === 0) {
        $('.all').html('您没有未发货个人订单！')
        return false
    } else {
        var amount_ = []
        for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
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
                '<div>订单号：' + content[i].code + '</div>\n' +
                content[i].tProducts.pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge">\n' +
                '<div class="status">\n' +
                '总价：' + content[i].totalPrice +
                '</div>\n' +
                '    </div>\n' +
                '    <span class="nums num">\n' +
                '剩余库存：' + amount_[0] +
                '<span style="margin-left: 30px">已卖出：' + content[i].tProducts.saleNum + '</span>\n' +
                '</span>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '    <div class="address">\n' +
                '<span class="deliverId" style="display:none">' + content[i].tDeliver.id + '</span>' +
                content[i].tDeliver.receiver + content[i].tDeliver.phone + '<br>\n' +
                content[i].tDeliver.address +
                '</div>\n' +
                '<div class="data">\n' +
                content[i].createDate +
                '<br><span>待发货数量：' + content[i].amount + '</span>' +
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

// 仓库
function addhtml4_(content) {
    $('.all').html('')
    $('.pages').show()
    if (content.length === 0) {
        $('.all').html('您没有已下架商品！')
        return false
    } else {
        for (var i = 0; i < content.length; i++) {
            var amount = 0
            var saleNumber = 0
            var amount = []
            var img = content[i].indexPic.split(',')[0]
            content[i].productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)
            $('.all').append(
            	'<div class="details">' + 
					'<div class="id_id" style="display:none;">' + content[i].id + '</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].pname +'</p>' + 
							'<div class="produt-id" style="color:red;">商品编号：<span>' + content[i].id + '</span></div>' +
							'<div class="surplus">' +
								'<span class="nums" style="color:#888888; font-size:10px">\n' +
					                '剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
					                '已卖出：' +  content[i].saleNum + 
				                '</span>\n' +
							'</div>' + 
						'</div>' + 
					'</div>' + 
					'<div class="details-slidedown">' + 
						'<div class="edit" title="">编辑</div>\n' +
		                '<div class="shangjia" title="">上架</div>\n' +
		                '<div class="fix" title="">修改</div>\n' +
					'</div>' + 
				
                '                <div class="details-details">\n' +
                '                    <div class="">\n' +
                '                        <span>颜色</span>\n' +
                '                        <span>尺码</span>\n' +
                '                        <span>单价</span>\n' +
                '                        <span>修改单价</span>\n' +
                '                        <span>库存</span>\n' +
                '                        <span>增加库存</span>\n' +
                '                        <span>下架</span>\n' +
                '<span class="active" style="display:none">' + content[i].active + '</span>' +
                '                    </div>\n' +
                '                </div>\n' +
				'</div>'
            	
            	/*'<div class="details">\n' +
                '<div class="id_id" style="display: none">' + content[i].id + '</div>' +
                '                <div class="details-left">\n' +
                '                    <img src="' + img + '" alt="">\n' +
                '                </div>\n' +
                '                <div class="details-con">\n' +
                '                    <div class="details-con-top">\n' +
                content[i].pname +
                '                    </div>\n' +
                '<div class="produt-id" style="display:none"><span>' + content[i].id + '</span></div>' +
                '                    <div class="init">   </div>\n' +
                '                    <div class="price">\n' +
                '                        <span class="nums">\n' +
                '                            剩余库存：' + amount_[i] + '&nbsp&nbsp&nbsp\n' +
                '                            已卖出：' + content[i].saleNum + '\n' +
                '                        </span>\n' +
                '                    </div>' +
                '                </div>\n' +
                '                <div class="edit" title="">编辑</div>\n' +
                '                <div class="shangjia" title="">上架</div>\n' +
                '                <div class="fix" title="">修改</div>\n' +
                '<span class="active" style="display:none">' + content[i].active + '</span>' +
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
                '            </div>'*/
            )

            for (var k = 0; k < content[i].productsTypes.length; k++) {
                $('.details-details').eq(i).append(
                    '<div class="list">\n' +
                    '<span>' + content[i].productsTypes[k].color + '</span>\n' +
                    '<span>' + content[i].productsTypes[k].size + '</span>\n' +
                    '<span class="newPrice">' + content[i].productsTypes[k].newPrice + '</span>\n' +
                    '<span><span class="id" style="display: none">' + content[i].productsTypes[k].id + '</span><input type="text"><span class="sure-price">确定</span></span>\n' +
                    '<span class="amount">' + content[i].productsTypes[k].amount + '</span>\n' +
                    '<span><span class="id" style="display: none">' + content[i].productsTypes[k].id + '</span><input type="text"><span class="sure-nums">确定</span></span>\n' +
                    // '<span>' + content[i].productsTypes[k].saleNumber + '</span>\n' +
                    '<span class="del"><span class="pid" style="display: none">' + content[i].id + '</span><span class="id" style="display: none">' + content[i].productsTypes[k].id + '</span><span class="pactive" style="display: none">' + content[i].productsTypes[k].isActive + '</span>下架</span>' +
                    ' </div>\n' +
                    '')
            }
        }
    }
}

// 已完成
function addhtml5_(content) {
    $('.all').html('')
    if (content.length === 0) {
        $('.all').html('您没有已完成的个人订单！')
        return false
    } else {
        for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
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
                '<div>订单号：' + content[i].code + '</div>\n' +
                content[i].tProducts.pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge" style="color:red">\n' +
                '售价：￥' + content[i].totalPrice +
                '  &nbsp&nbsp<span style="text-decoration: line-through;color:#999;">' + content[i].tProductsTypes.newPrice + '</span>' +
                '    </div>\n' +

                '    <span class="nums num">\n' +
                '剩余库存：' + amount_[0] +
                '已卖出： ' + content[i].tProducts.saleNum + '\n' +
                '</span>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '    <div class="address">\n' +
                content[i].tDeliver.receiver + content[i].tDeliver.phone + '<br>\n' +
                content[i].tDeliver.address +
                '</div>\n' +
                '<div class="data">\n' +
                content[i].createDate +
                '<div class="status">\n' +
                '已完成 ' + content[i].amount + '件 总价：' + content[i].totalPrice +
                '</div>\n' +
                '</div>\n' +
                '</div>\n' +
                '    </div>' +
                '')
        }
    }
}

//团购未发货
function addhtml6_(content) {
    $('.all').html('')
    if (content.length === 0 || content === null) {
        $('.all').append('您没有未发货的团购订单')
    } else {
        content.forEach(function (val, key) {
            var groupcode = []
            var json = {}
            var amount = 0
            var amount_ = []
            var ordersList = val.tuanOrdersList
            ordersList.forEach(function (val, key) {
                if (!json[val.groupCode]) {
                    groupcode.push(val.groupCode)
                    json[val.groupCode] = 1
                }
            })
            val.products.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)
            var img = val.products.indexPic.split(',')[0]
            $('.all').append('<div class="details">' +
                '<div class="details-left">' +
                '<img src="' + img + '" alt="">' +
                ' </div>' +
                ' <div class="details-con width">' +
                '<div class="details-con-top">' +
                val.products.pname +
                '</div>' +
                '<div class="price price-charge price-tuan">' +
                ' ￥' + val.products.productsTypes[0].tuanPrice +
                ' <span>￥' + val.products.productsTypes[0].newPrice + '</span>' +
                '</div>' +
                '<span class="nums num">' +
                '剩余库存：' + amount_[0] + ' 已卖出：' + val.products.saleNum +
                ' </span>' +
                '</div>' +
                '<div class="fahuo-tuan" title="">' +
                ' <input type="button" value="填写物流单号" name="true">' +
                ' </div>' +
                '<div class="details-details-cons-tuan">' +
                ' </div>' +
                '</div>')

            for (var i = 0; i < groupcode.length; i++) {
                $('.details-details-cons-tuan').eq(key).append(' <div class="ordernumber-tuan">' +
                    ' <div>团购号：' + groupcode[i] + '</div>' +
                    '<div class="order-img" title="true">' +
                    ' <img src="images/arrow-down.png" alt="" width="100%">' +
                    '</div>' +
                    '</div>' +
                    '<div class="details-details-cons-tuan-cons">' +
                    '</div>')
                var tuanOrdersList = val.tuanOrdersList
                for (var k = 0; k < tuanOrdersList.length; k++) {
                    if (tuanOrdersList[k].groupCode === groupcode[i]) {
                        $('.details-details-cons-tuan').eq(key).find('.details-details-cons-tuan-cons').eq(i).append(
                            '  <div class="details-details-cons-tuan-con">' +
                            '<div class="order-datails">' +
                            ' <div class="order-details-con">' +
                            ' <span>订单号：' + tuanOrdersList[k].code + '</span>' +
                            '<span>' + tuanOrdersList[k].tDeliver.receiver + tuanOrdersList[k].tDeliver.phone + '</span>' +
                            ' <span>' + tuanOrdersList[k].tDeliver.address + '</span>' +
                            '<span class="dliverid" style="display:none">' + tuanOrdersList[k].tDeliver.id + '</span>' +
                            '<span class="tuanid" style="display:none">' + tuanOrdersList[k].id + '</span>' +
                            ' </div>' +
                            '<div class="order-details-con">' +
                            ' <span>颜色：' + tuanOrdersList[k].tProductsTypes.color + ' 尺码：' + tuanOrdersList[k].tProductsTypes.size + '</span>' +
                            ' <span>待发货 ' + tuanOrdersList[k].amount + '件 总价' + tuanOrdersList[k].totalPrice + '</span>' +
                            ' </div>' +
                            ' </div>' +
                            ' <span class="order-creattime">' + tuanOrdersList[k].tDeliver.createDate + '</span>' +
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
                            ' </div>')
                    }
                }
            }
        })
    }
}

//团购已发货
function addhtml7_(content) {
    $('.all').html('')
    if (content.length === 0 || content === null) {
        $('.all').append('您没有已发货的团购订单')
    } else {
        content.forEach(function (val, key) {
            var groupcode = []
            var json = {}
            var amount = 0
            var amount_ = []
            var ordersList = val.tuanOrdersList
            ordersList.forEach(function (val, key) {
                if (!json[val.groupCode]) {
                    groupcode.push(val.groupCode)
                    json[val.groupCode] = 1
                }
            })
            val.products.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)
            var img = val.products.indexPic.split(',')[0]
            $('.all').append('<div class="details">' +
                '<div class="details-left">' +
                ' <img src="' + img + '" alt="">' +
                '</div>' +
                '<div class="details-con width">' +
                ' <div class="details-con-top">' +
                val.products.pname +
                ' </div>' +
                ' <div class="price price-charge price-tuan">' +
                val.products.productsTypes[0].tuanPrice +
                '<span>￥' + val.products.productsTypes[0].newPrice + '</span>' +
                '</div>' +
                '<span class="nums num">' +
                '  剩余库存：' + amount_[0] + ' 已卖出：' + val.products.saleNum +
                ' </span>' +
                ' </div>' +
                ' <div class="fahuo-tuan-ready" title="true">' +
                '   <input type="button" value="更多" name="true">' +
                ' </div>' +

                ' <div class="details-details-cons-tuan-ready">' +
                ' </div>' +
                '</div>')
            for (var i = 0; i < groupcode.length; i++) {
                $('.details-details-cons-tuan-ready').eq(key).append(' <div class="ordernumber-tuan">' +
                    '  <div>团购号：' + groupcode[i] + '</div>' +
                    '<div class="order-img" title="true" style="margin-right:15px;">' +
                    ' <img src="images/arrow-down.png" alt="" width="100%">' +
                    '</div>' +
                    '</div>' +
                    ' <div class="details-details-cons-tuan-cons">' +


                    ' </div>')

                var tuanOrdersList = val.tuanOrdersList

                for (var k = 0; k < tuanOrdersList.length; k++) {
                    $('.details-details-cons-tuan-ready').eq(key).find('.details-details-cons-tuan-cons').eq(i).append(
                        '<div class="details-details-cons-tuan-con">' +
                        '   <div class="order-datails">' +
                        '  <div class="order-details-con">' +
                        '   <span>订单号：' + tuanOrdersList[k].code + '</span>' +
                        '  <span>' + tuanOrdersList[k].tDeliver.receiver + '   ' + tuanOrdersList[k].tDeliver.phone +
                        '</span>' +
                        '    <span>' + tuanOrdersList[k].tDeliver.address + '</span>' +
                        ' </div>' +
                        ' <div class="order-details-con">' +
                        ' <span>颜色：' + tuanOrdersList[k].tProductsTypes.color + ' 尺码：' + tuanOrdersList[k].tProductsTypes.size + '</span>' +
                        '   <span>已发货 ' + tuanOrdersList[k].amount + '件 总价' + tuanOrdersList[k].totalPrice + '</span>' +
                        ' </div>' +
                        ' </div>' +
                        ' <span class="order-creattime">' + tuanOrdersList[k].tDeliver.createDate + '</span>' +
                        ' </div>' +
                        '<div class="show-express">' +
                        '  <input type="button" value="查看物流" name="true">' +
                        '</div>' +
                        '<div class="details-details-cons-tuan-express-con">' +
                        ' <div class="order-number-ready">' +
                        '   运单号：<span class="dcode">' + tuanOrdersList[k].tDeliver.dcode +
                        ' </span></div>' +
                        ' <div class="order-number-ready">' +
                        '   快递公司：<span class="dcode">' + tuanOrdersList[k].tDeliver.dname +
                        ' </span></div>' +
                        '<ul>' +
                        ' </ul>' +
                        ' </div>' +
                        ' </div>'
                    )
                }
            }
        })
    }
}

function addhtml8_(content) {
    $('.all').html('')
    if (content.length === 0 || content === null) {
        $('.all').append('您没有已完成的团购订单')
    } else {
        content.forEach(function (val, key) {
            var groupcode = []
            var json = {}
            var amount = 0
            var amount_ = []
            var ordersList = val.tuanOrdersList
            ordersList.forEach(function (val, key) {
                if (!json[val.groupCode]) {
                    groupcode.push(val.groupCode)
                    json[val.groupCode] = 1
                }
            })
            val.products.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)
            var img = val.products.indexPic.split(',')[0]
            $('.all').append('<div class="details">' +
                '<div class="details-left">' +
                ' <img src="' + img + '" alt="">' +
                '</div>' +
                '<div class="details-con width">' +
                ' <div class="details-con-top">' +
                val.products.pname +
                ' </div>' +
                ' <div class="price price-charge price-tuan">' +
                val.products.productsTypes[0].tuanPrice +
                '<span>￥' + val.products.productsTypes[0].newPrice + '</span>' +
                '</div>' +
                '<span class="nums num">' +
                '  剩余库存：' + amount_[0] + ' 已卖出：' + val.products.saleNum +
                ' </span>' +
                ' </div>' +
                ' <div class="fahuo-tuan-ready" title="true">' +
                '   <input type="button" value="更多" name="true">' +
                ' </div>' +

                ' <div class="details-details-cons-tuan-ready">' +
                ' </div>' +
                '</div>')
            for (var i = 0; i < groupcode.length; i++) {
                $('.details-details-cons-tuan-ready').eq(key).append(' <div class="ordernumber-tuan">' +
                    '  <div>团购号：' + groupcode[i] + '</div>' +
                    '<div class="order-img" title="true" style="margin-right:15px;">' +
                    ' <img src="images/arrow-down.png" alt="" width="100%">' +
                    '</div>' +
                    '</div>' +
                    ' <div class="details-details-cons-tuan-cons">' +


                    ' </div>')

                var tuanOrdersList = val.tuanOrdersList

                for (var k = 0; k < tuanOrdersList.length; k++) {
                    $('.details-details-cons-tuan-ready').eq(key).find('.details-details-cons-tuan-cons').eq(i).append(
                        '<div class="details-details-cons-tuan-con">' +
                        '   <div class="order-datails">' +
                        '  <div class="order-details-con">' +
                        '   <span>订单号：' + tuanOrdersList[k].code + '</span>' +
                        '  <span>' + tuanOrdersList[k].tDeliver.receiver + '   ' + tuanOrdersList[k].tDeliver.phone +
                        '</span>' +
                        '    <span>' + tuanOrdersList[k].tDeliver.address + '</span>' +
                        ' </div>' +
                        ' <div class="order-details-con">' +
                        ' <span>颜色：' + tuanOrdersList[k].tProductsTypes.color + ' 尺码：' + tuanOrdersList[k].tProductsTypes.size + '</span>' +
                        '   <span>已完成 ' + tuanOrdersList[k].amount + '件 总价' + tuanOrdersList[k].totalPrice + '</span>' +
                        ' </div>' +
                        ' </div>' +
                        ' <span class="order-creattime">' + tuanOrdersList[k].tDeliver.createDate + '</span>' +
                        ' </div>' +
                        '<div class="show-express">' +
                        '  <input type="button" value="查看物流" name="true">' +
                        '</div>' +
                        '<div class="details-details-cons-tuan-express-con">' +
                        ' <div class="order-number-ready">' +
                        '   运单号：<span class="dcode">' + tuanOrdersList[k].tDeliver.dcode +
                        ' </span></div>' +
                        ' <div class="order-number-ready">' +
                        '   快递公司：<span class="dcode">' + tuanOrdersList[k].tDeliver.dname +
                        ' </span></div>' +
                        '<ul>' +
                        ' </ul>' +
                        ' </div>' +
                        ' </div>'
                    )
                }
            }
        })
    }
}

// 点击切换
$('.body-top ul li').click(function () {
    var id_ = $(this).index()
    pages = 0
    $('.all').html('')
    switch (id_) {
        case 0:
            $.post(localhost + '/tuan/product/list', {
                pageNumber: pages,
                pageSize: 10,
                saleId: token,
                active: true,
                online_code: onlinecode
            }, function (data) {
                outline(data)
                var content = data.data.content
                for (var len = content.length - 1; len >= 0; len--) {
                    if (content[len].productsTypes.length === 0) {
                        content.splice(len, 1)
                    }
                }
                addhtml_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/product/list', addhtml_)
            break
        /*case 1:
            $.post(localhost + '/tuan/tuanorders/tuaning_list', {
                saleId: token,
                online_code: onlinecode
            }, function (data) {
                outline(data)
                var content = data.data
                addhtml4_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            break*/
        case 1:
            $.post(localhost + '/tuan/product/list', {
                saleId: token,
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
            chageStyle('/tuan/product/list', addhtml4_)
            details_.active = false
            break
        default:
            break
    }
})

// 团购订单点击事件
$('body').on('click', '.tuan', function (e) {
    var ind = $(this).parents('li').index()
    pages = 0
    switch (ind) {
        case 2:
            $.post(localhost + '/tuan/tuanorders/list', {
                saleId: token,
                state: '待收货团购订单',
                online_code: onlinecode
            }, function (res) {
                outline(res)
                var content = res.data
                addhtml7_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/tuanorders/list', addhtml7_, '待收货团购订单')
            return false
            break
        case 3:
            $.post(localhost + '/tuan/tuanorders/list', {
                saleId: token,
                state: '待发货团购订单',
                online_code: onlinecode
            }, function (res) {
                outline(res)
                var content = res.data
                addhtml6_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/tuanorders/list', addhtml6_, '待发货团购订单')
            break
        case 5:
            $.post(localhost + '/tuan/tuanorders/list', {
                saleId: token,
                state: '已完成团购订单',
                showsale: true,
                online_code: onlinecode
            }, function (res) {
                outline(res)
                var content = res.data
                addhtml8_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/tuanorders/list', addhtml8_, '已完成团购订单')
            break
        default:
            break
    }
    return false
})

//个人订单点击事件
$('body').on('click', '.person', function () {
    var ind = $(this).parents('li').index()
    pages = 0
    switch (ind) {
        case 2:
            $.post(localhost + '/tuan/torders/list', {
                saleId: token,
                state: '待收货订单',
                online_code: onlinecode
            }, function (res) {
                outline(res)
                var content = res.data.content
                addhtml2_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/torders/list', addhtml2_, '待收货订单')
            break
        case 3:
            $.post(localhost + '/tuan/torders/list', {
                saleId: token,
                state: '待发货订单',
                online_code: onlinecode
            }, function (res) {
                outline(res)
                var content = res.data.content
                addhtml3_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/torders/list', addhtml3_, '待发货订单')
            break
        case 5:
            $.post(localhost + '/tuan/torders/list', {
                saleId: token,
                state: '已完成订单',
                showsale: true,
                online_code: onlinecode
            }, function (res) {
                outline(res)
                var content = res.data.content
                addhtml5_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            chageStyle('/tuan/torders/list', addhtml5_, '已完成订单')
            break
        default:
            break
    }
})

    // 获取已销售信息
    ; (function () {
        $.post(localhost + '/tuan/product/list', {
            saleId: token,
            active: true,
            online_code: onlinecode
        }, function (data) {
            outline(data)
            var content = data.data.content
            for (var len = content.length - 1; len >= 0; len--) {
                if (content[len].productsTypes.length === 0) {
                    content.splice(len, 1)
                }
            }
            nums = data.token - 0
            if (content.length === 0) {
                $('.pages').hide()
            }
            addhtml_(content)
        })
    }())

// 修改总价
// $('body').on('click', '.revise-price', function () {
//   var id = $(this).siblings('.id').text()
//   var price = prompt('请输入总价', '')
//   var that = $(this)
//   if (price && price !== '') {
//     $.post(localhost + '/order/update', {
//       id: id,
//       totalPrice: price,
//       changePrice: 'yes',
//       saleId: token,
//       online_code: onlinecode
//     }, function (res) {
//       if (res.message === '操作成功') {
//         that.parents('.details').find('.price-all').html(price)
//         that.parents('.details').find('.status span').html(price)
//       }
//     })
//   }
// })

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
    console.log(index)
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
    $(this).prop('name', !stu)
    if (stu) {
        $(this).val('隐藏')
        $(this).parents('.details').find('.details-details-cons-tuan-ready').slideDown()
    } else {
        $(this).val('更多')
        $(this).parents('.details').find('.details-details-cons-tuan-ready').slideUp()
    }
})

// 点击查看物流详情
$('.all').on('click', '.show-express input', function () {
    var stu = eval($(this).prop('name')) === true ? true : false
    $(this).prop('name', !stu)
    var dcode = $(this).parent('.show-express').siblings('.details-details-cons-tuan-express-con').find('.dcode').text()
    if (stu) {
        $(this).parents('.show-express').next('.details-details-cons-tuan-express-con').slideDown()
    } else {
        $(this).parents('.show-express').next('.details-details-cons-tuan-express-con').slideUp()
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

// 下一页
$('.next').click(function () {
    pages++
    details_.pageNumber = pages
    $.post(localhost + style_, details_, function (data) {
        outline(data)
        content = data.data.content === undefined ? data.data : data.data.content
        if (content.length === 0) {
            $('.message').html('这已经是最后一页了！').fadeIn()
            setTimeout(function () {
                $('.message').fadeOut()
            }, 1000)
            pages--
            details_.pageNumber = pages
            $.post(localhost + style_, details_, function (data) {
                outline(data)
                content = data.data.content === undefined ? data.data : data.data.content
                html_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
        } else {
            content = data.data.content === undefined ? data.data : data.data.content
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
        details_.pageNumber = pages
        $.post(localhost + style_, details_, function (data) {
            outline(data)
            content = data.data.content === undefined ? data.data : data.data.content
            html_(content)
            if (content.length === 0) {
                $('.pages').hide()
            } else {
                $('.pages').show()
            }
        })
    }
})
