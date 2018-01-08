var amount_ = []
var saleNumber_ = []
var content
var pages = 0
var pagesindex = 0
var showlist = []
var enlist = []
var dename = []
var style_ = '/tuan/product/list'
var reg = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/
var reg1 = /^[0-9]{4}\/[0-1]?[0-9]{1}\/[0-3]?[0-9]{1}$/
var reg2 = /^[0-9]{4}\.[0-1]?[0-9]{1}\.[0-3]?[0-9]{1}$/
var details_ = {
    pageNumber: pages,
    pageSize: 10,
    saleId: token,
    active: true,
    online_code: onlinecode
}
//var html_ = addhtml_
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
function chageStyle(style, html, state) {
    console.log(this)
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
            
            $('.all').append(
				'<div class="details">' + 
					'<div class="details-top">' + 
						'<input type="checkbox" class="checkbox"/>&nbsp;<span>团购号：' + content[i].iterable[0].groupCode + '</span>&nbsp;&nbsp;' + 
						'<span> 个人订单号：' + content[i].iterable[0].code +
					'</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].products.pname +'</p>' + 
							'<div class="produce-style">' +
								'<span class="price">标价：￥' + content[i].products.productsTypes[0].tuanPrice + '</span>&nbsp;&nbsp;&nbsp;' +
								'<span class="yanse">颜色：' + content[i].products.productsTypes[0].color + '</span>&nbsp;&nbsp;&nbsp;' +
                				'<span class="chima">尺码：' + content[i].products.productsTypes[0].size + '</span>&nbsp;&nbsp;&nbsp;' +
							'</div>' + 
							'<div class="num">' + 
				                '剩余库存：' + amount_[0] +
				                '已卖出：' + content[i].products.saleNum  + '\n' +
							'</div>' + 
						'</div>' + 
						/*'<div class="details-con-Buyers">' + 
							'<div class="name-tel">' + 
								tuanOrdersList[k].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + tuanOrdersList[k].tDeliver.phone + 
							'</div>' + 
							'<p class="address"> 地址：' + 
								tuanOrdersList[k].tDeliver.address +
							'</p>' + 
							'<div class="beizhu">买家备注：' + 
								tuanOrdersList[k].leavemsg +
							'</div>' + 
						'</div>' + */
						'<div class="fahuo" title="">\n' + 
		                	'更多\n' +
		                '</div>\n' +
					'</div>' + 
					'<div class="details-details-cons">' +
		                /*'<div class="details-ul">' +
		                	'<input type="text" class="details-ul-input" placeholder="物流公司">' +
		                '</div>' +
	                	'<span class="did" style="display: none">' + tuanOrdersList[k].tDeliver.id + '</span>' +
	                	'<div class="express"><input type="text" placeholder="物流订单号"></div>' +
	                	'<div class="tuan-fahuo-sure">确定发货</div>' +*/
	                '</div>\n' +
				'</div>'
			)
            /*$('.all').append('' +
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
                '')*/
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

                $('.details-details-cons').eq(i).append('<ul><li class="wait-pin">' +
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
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="generateTable">生成表格</div>' + 
    		'</div>'
    	)
        for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            if(content[i].leavemsg == null){
				content[i].leavemsg = "无";
			}
			if(content[i].leavemsg2 == null){
				content[i].leavemsg2 = "无";
			}
            amount_.push(amount)
            $('.all').append(
				'<div class="details">' + 
					'<div class="oNum" style="display:none;">' + content[i].id + '</div>' + 
					'<div class="details-top">' + 
						'<input type="checkbox" class="checkbox"/>&nbsp;' + 
						'<span> 订单号：' + content[i].code + '</span>&nbsp;&nbsp;<span>成交时间：' + content[i].tDeliver.createDate + '</span>' +
					'</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].tProducts.pname +'</p>' + 
							'<div class="produce-style">' +
								'<span class="price">单价：￥' + content[i].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
								'<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
                				'<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
							'</div>' + 
							'<div class="num">' + 
								content[i].amount + '件&nbsp;&nbsp;&nbsp;共' + content[i].totalPrice + '元' + 
							'</div>' + 
							'<div class="seller-beizhu">卖家备注：' + 
								content[i].leavemsg2 +
							'</div>' + 
						'</div>' + 
						'<div class="details-con-Buyers">' + 
							'<div class="name-tel">' + 
								content[i].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + content[i].tDeliver.phone + 
							'</div>' + 
							'<p class="address"> 地址：' + 
								content[i].tDeliver.address +
							'</p>' + 
							'<div class="beizhu">买家备注：' + 
								content[i].leavemsg +
							'</div>' + 
						'</div>' + 
						'<div class="see-wuliu" title="">\n' + 
		                	'查看物流\n' +
		                '</div>\n' +
					'</div>' + 
					'<div class="details-details-cons">' +
		                '<div class="wuliu" >' + 
		                	'<span>物流公司：' + content[i].tDeliver.dname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
		                	'<span>物流单号：' + content[i].tDeliver.dcode + '</span>' + 
	                	'</div>' + 
		            '</div>\n' +
				'</div>'
			)
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
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="generateTable">生成表格</div>' + 
    		'</div>'
    	)
        var amount_ = []
        for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)
            if(content[i].leavemsg == null){
				content[i].leavemsg = "无";
			}
			if(content[i].leavemsg2 == null){
				content[i].leavemsg2 = "无";
			}
            $('.all').append(
				'<div class="details">' + 
					'<div class="oNum" style="display:none;">' + content[i].id + '</div>' + 
					'<div class="details-top">' + 
						'<input type="checkbox" class="checkbox"/>&nbsp;' + 
						'<span> 订单号：' + content[i].code + '</span>&nbsp;&nbsp;<span>成交时间：' + content[i].tDeliver.createDate + '</span>' +
					'</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].tProducts.pname +'</p>' + 
							'<div class="produce-style">' +
								'<span class="price">单价：￥' + content[i].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
								'<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
                				'<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
							'</div>' + 
							'<div class="num">' + 
								content[i].amount + '件&nbsp;&nbsp;&nbsp;共' + content[i].totalPrice + '元' + 
							'</div>' + 
							'<div class="seller-beizhu">' + 
								'<div>卖家备注：</div>' +
								'<p></p>' + 
								'<button class="tianxie">填写备注</button >' +
							'</div>' + 
						'</div>' + 
						'<div class="details-con-Buyers">' + 
							'<div class="name-tel">' + 
								content[i].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + content[i].tDeliver.phone + 
							'</div>' + 
							'<p class="address"> 地址：' + 
								content[i].tDeliver.address +
							'</p>' + 
							'<div class="beizhu">买家备注：' + 
								content[i].leavemsg +
							'</div>' + 
						'</div>' + 
						'<div class="fahuo" title="">\n' + 
		                	'发货\n' +
		                '</div>\n' +
					'</div>' + 
					'<div class="details-details-cons">' +
		                '<div class="details-ul">' +
		                	'<input type="text" class="details-ul-input" placeholder="物流公司">' +
		                '</div>' +
	                	'<span class="did" style="display: none">' + content[i].tDeliver.id + '</span>' +
	                	'<div class="express"><input type="text" placeholder="物流订单号"></div>' +
	                	'<div class="fahuo-sure">确定发货</div>' +
	                '</div>\n' +
				'</div>'
			)

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
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="generateTable">生成表格</div>' + 
    		'</div>'
    	)
        for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            amount_.push(amount)
            if(content[i].leavemsg == null){
				content[i].leavemsg = "无";
			}
			if(content[i].leavemsg2 == null){
				content[i].leavemsg2 = "无";
			}
            $('.all').append(
				'<div class="details">' + 
					'<div class="oNum" style="display:none;">' + content[i].id + '</div>' + 
					'<div class="details-top">' + 
						'<input type="checkbox" class="checkbox"/>&nbsp;' + 
						'<span> 订单号：' + content[i].code + '</span>&nbsp;&nbsp;<span>成交时间：' + content[i].tDeliver.createDate + '</span>' +
					'</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].tProducts.pname +'</p>' + 
							'<div class="produce-style">' +
								'<span class="price">单价：￥' + content[i].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
								'<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
                				'<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
							'</div>' + 
							'<div class="num">' + 
								content[i].amount + '件&nbsp;&nbsp;&nbsp;共' + content[i].totalPrice + '元' + 
							'</div>' + 
							'<div class="seller-beizhu">卖家备注：' + 
								content[i].leavemsg2 +
							'</div>' + 
						'</div>' + 
						'<div class="details-con-Buyers">' + 
							'<div class="name-tel">' + 
								content[i].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + content[i].tDeliver.phone + 
							'</div>' + 
							'<p class="address"> 地址：' + 
								content[i].tDeliver.address +
							'</p>' + 
							'<div class="beizhu">买家备注：' + 
								content[i].leavemsg +
							'</div>' + 
						'</div>' + 
						'<div class="see-wuliu" title="">\n' + 
		                	'查看物流\n' +
		                '</div>\n' +
					'</div>' + 
					'<div class="details-details-cons">' +
		                '<div class="wuliu" >' + 
		                	'<span>物流公司：' + content[i].tDeliver.dname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
		                	'<span>物流单号：' + content[i].tDeliver.dcode + '</span>' + 
	                	'</div>' + 
		            '</div>\n' +
				'</div>'
			)
        }
    }
}

//团购未发货
function addhtml6_(content) {
    $('.all').html('')
    if (content.length === 0 || content === null) {
        $('.all').append('您没有未发货的团购订单')
    } else {
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="tuan-generateTable">生成表格</div>' + 
    		'</div>'
    	)
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
            for (var i = 0; i < groupcode.length; i++) {
            	var tuanOrdersList = val.tuanOrdersList
            	for (var k = 0; k < tuanOrdersList.length; k++) {
            		if (tuanOrdersList[k].groupCode === groupcode[i]) {
            			//买家留言判断，null（没有留言备注）时，把null变为空
            			if(tuanOrdersList[k].leavemsg == null){
		    				tuanOrdersList[k].leavemsg = "无";
		    			}
		    			if(tuanOrdersList[k].leavemsg2 == null){
		    				tuanOrdersList[k].leavemsg2 = "无";
		    			}
            			$('.all').append(
            				'<div class="details">' + 
            					'<div class="oNum" style="display:none;">' + tuanOrdersList[k].id + '</div>' + 
            					'<div class="details-top">' + 
            						'<input type="checkbox" class="checkbox"/>&nbsp;<span>团购号：' + tuanOrdersList[k].groupCode + '</span>&nbsp;&nbsp;' + 
            						'<span> 订单号：' + tuanOrdersList[k].code + '</span>&nbsp;&nbsp;<span>成交时间：' + tuanOrdersList[k].tDeliver.createDate + '</span>' +
            					'</div>' + 
            					'<div class="details-con">' + 
            						'<div class="details-con-img">' + 
            							'<img src="' + img + '" alt="">\n' +
            						'</div>' + 
            						'<div class="details-con-seller">' + 
            							'<p class="pname">' + val.products.pname +'</p>' + 
            							'<div class="produce-style">' +
            								'<span class="price">团价：￥' + tuanOrdersList[k].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
            								'<span class="yanse">颜色：' + tuanOrdersList[k].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
			                				'<span class="chima">尺码：' + tuanOrdersList[k].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
            							'</div>' + 
            							'<div class="num">' + 
            								tuanOrdersList[k].amount + '件&nbsp;&nbsp;&nbsp;共' + tuanOrdersList[k].totalPrice + '元' + 
            							'</div>' + 
            							'<div class="seller-beizhu">' +
            								'<div>卖家备注：</div>' +
            								'<p></p>' + 
            								'<button class="tuan-tianxie">填写备注</button >' +
            							'</div>' + 
            						'</div>' + 
            						'<div class="details-con-Buyers">' + 
            							'<div class="name-tel">' + 
            								tuanOrdersList[k].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + tuanOrdersList[k].tDeliver.phone + 
            							'</div>' + 
            							'<p class="address"> 地址：' + 
            								tuanOrdersList[k].tDeliver.address +
            							'</p>' + 
            							'<div class="beizhu">买家备注：' + 
            								tuanOrdersList[k].leavemsg +
            							'</div>' + 
            						'</div>' + 
            						'<div class="fahuo" title="">\n' + 
					                	'发货\n' +
					                '</div>\n' +
            					'</div>' + 
            					'<div class="details-details-cons">' +
					                '<div class="details-ul">' +
					                	'<input type="text" class="details-ul-input" placeholder="物流公司">' +
					                '</div>' +
				                	'<span class="did" style="display: none">' + tuanOrdersList[k].tDeliver.id + '</span>' +
				                	'<div class="express"><input type="text" placeholder="物流订单号"></div>' +
				                	'<div class="tuan-fahuo-sure">确定发货</div>' +
				                '</div>\n' +
            				'</div>'
            			)
            			
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
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="tuan-generateTable">生成表格</div>' + 
    		'</div>'
    	)
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
            console.log(val)
        	var tuanOrdersList = val.tuanOrdersList
            for (var k = 0; k < tuanOrdersList.length; k++) {
            	//买家留言判断，null（没有留言备注）时，把null变为空
    			if(tuanOrdersList[k].leavemsg == null){
    				tuanOrdersList[k].leavemsg = "无";
    			}
    			if(tuanOrdersList[k].leavemsg2 == null){
    				tuanOrdersList[k].leavemsg2 = "无";
    			}
    			$('.all').append(
    				'<div class="details">' + 
    					'<div class="oNum" style="display:none;">' + tuanOrdersList[k].id + '</div>' + 
    					'<div class="details-top">' + 
    						'<input type="checkbox" class="checkbox"/>&nbsp;<span>团购号：' + tuanOrdersList[k].groupCode + '</span>&nbsp;&nbsp;' + 
    						'<span> 订单号：' + tuanOrdersList[k].code + '</span>&nbsp;&nbsp;<span>成交时间：' + tuanOrdersList[k].tDeliver.createDate + '</span>' +
    					'</div>' + 
    					'<div class="details-con">' + 
    						'<div class="details-con-img">' + 
    							'<img src="' + img + '" alt="">\n' +
    						'</div>' + 
    						'<div class="details-con-seller">' + 
    							'<p class="pname">' + val.products.pname +'</p>' + 
    							'<div class="produce-style">' +
    								'<span class="price">团价：￥' + tuanOrdersList[k].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
    								'<span class="yanse">颜色：' + tuanOrdersList[k].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
	                				'<span class="chima">尺码：' + tuanOrdersList[k].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
    							'</div>' + 
    							'<div class="num">' + 
    								tuanOrdersList[k].amount + '件&nbsp;&nbsp;&nbsp;共' + tuanOrdersList[k].totalPrice + '元' + 
    							'</div>' + 
    							'<p class="seller-beizhu">卖家备注：' + 
    								tuanOrdersList[k].leavemsg2 +
    							'</p>' + 
    						'</div>' + 
    						'<div class="details-con-Buyers">' + 
    							'<div class="name-tel">' + 
    								tuanOrdersList[k].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + tuanOrdersList[k].tDeliver.phone + 
    							'</div>' + 
    							'<p class="address"> 地址：' + 
    								tuanOrdersList[k].tDeliver.address +
    							'</p>' + 
    							'<div class="beizhu">买家备注：' + 
    								tuanOrdersList[k].leavemsg +
    							'</div>' + 
    						'</div>' + 
    						'<div class="see-wuliu" title="">\n' + 
			                	'查看物流\n' +
			                '</div>\n' +
    					'</div>' + 
    					'<div class="details-details-cons">' +
			                '<div class="wuliu" >' + 
			                	'<span>物流公司：' + tuanOrdersList[k].tDeliver.dname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
			                	'<span>物流单号：' + tuanOrdersList[k].tDeliver.dcode + '</span>' + 
		                	'</div>' + 
		                '</div>\n' +
    				'</div>'
    			)
        	}
        })
    }
}

//团购已完成
function addhtml8_(content) {
    $('.all').html('')
    if (content.length === 0 || content === null) {
        $('.all').append('您没有已完成的团购订单')
    } else {
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="tuan-generateTable">生成表格</div>' + 
    		'</div>'
    	)
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
            var tuanOrdersList = val.tuanOrdersList
            for (var k = 0; k < tuanOrdersList.length; k++) {
            	if(tuanOrdersList[k].leavemsg == null){
    				tuanOrdersList[k].leavemsg = "无";
    			}
    			if(tuanOrdersList[k].leavemsg2 == null){
    				tuanOrdersList[k].leavemsg2 = "无";
    			}
            	$('.all').append(
    				'<div class="details">' + 
    					'<div class="oNum" style="display:none;">' + tuanOrdersList[k].id + '</div>' + 
    					'<div class="details-top">' + 
    						'<input type="checkbox" class="checkbox"/>&nbsp;<span>团购号：' + tuanOrdersList[k].groupCode + '</span>&nbsp;&nbsp;' + 
    						'<span> 订单号：' + tuanOrdersList[k].code + '</span>&nbsp;&nbsp;<span>成交时间：' + tuanOrdersList[k].tDeliver.createDate + '</span>' +
    					'</div>' + 
    					'<div class="details-con">' + 
    						'<div class="details-con-img">' + 
    							'<img src="' + img + '" alt="">\n' +
    						'</div>' + 
    						'<div class="details-con-seller">' + 
    							'<p class="pname">' + val.products.pname +'</p>' + 
    							'<div class="produce-style">' +
    								'<span class="price">团价：￥' + tuanOrdersList[k].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
    								'<span class="yanse">颜色：' + tuanOrdersList[k].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
	                				'<span class="chima">尺码：' + tuanOrdersList[k].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
    							'</div>' + 
    							'<div class="num">' + 
    								tuanOrdersList[k].amount + '件&nbsp;&nbsp;&nbsp;共' + tuanOrdersList[k].totalPrice + '元' + 
    							'</div>' + 
    							'<p class="seller-beizhu">卖家备注：' + 
    								tuanOrdersList[k].leavemsg2 +
    							'</p>' + 
    						'</div>' + 
    						'<div class="details-con-Buyers">' + 
    							'<div class="name-tel">' + 
    								tuanOrdersList[k].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + tuanOrdersList[k].tDeliver.phone + 
    							'</div>' + 
    							'<p class="address"> 地址：' + 
    								tuanOrdersList[k].tDeliver.address +
    							'</p>' + 
    							'<div class="beizhu">买家备注：' + 
    								tuanOrdersList[k].leavemsg +
    							'</div>' + 
    						'</div>' + 
    						'<div class="see-wuliu" title="">\n' + 
			                	'查看物流\n' +
			                '</div>\n' +
    					'</div>' + 
    					'<div class="details-details-cons">' +
			                '<div class="wuliu" >' + 
		                	'<span>物流公司：' + tuanOrdersList[k].tDeliver.dname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
		                	'<span>物流单号：' + tuanOrdersList[k].tDeliver.dcode + '</span>' + 
		                '</div>' + 
		                '</div>\n' +
    				'</div>'
    			)
        	}
        })
    }
}

//订单搜索后陈列
function addhtml13_(content){
	$('.all').html('')
    if (content.length === 0 || content === null) {
        $('.all').append('没有搜索到订单')
    } else {
    	$('.all').append(
    		'<div class="choice-query-form">' + 
    			'<div class="allChoice">' + 
    				'<input class="all-choice" type="checkbox" name="allChoice" />全选&nbsp;&nbsp;' + 
    			'</div>' + 
    			'<div class="queryOrder">查询订单</div>' + 
    			'<div class="tuan-generateTable">生成表格</div>' + 
    		'</div>'
    	)
    	for (var i = 0; i < content.length; i++) {
            var img = content[i].tProducts.indexPic.split(',')[0]
            var amount = 0
            content[i].tProducts.productsTypes.forEach(function (val, key) {
                amount += val.amount
            })
            if(content[i].leavemsg == null){
				content[i].leavemsg = "无";
			}
			if(content[i].leavemsg2 == null){
				content[i].leavemsg2 = "无";
			}
            amount_.push(amount)
            $('.all').append(
				'<div class="details">' + 
					'<div class="oNum" style="display:none;">' + content[i].id + '</div>' + 
					'<div class="details-top">' + 
						'<input type="checkbox" class="checkbox"/>&nbsp;' + 
						'<span> 订单号：' + content[i].code + '</span>&nbsp;&nbsp;<span>成交时间：' + content[i].tDeliver.createDate + '</span>' +
					'</div>' + 
					'<div class="details-con">' + 
						'<div class="details-con-img">' + 
							'<img src="' + img + '" alt="">\n' +
						'</div>' + 
						'<div class="details-con-seller">' + 
							'<p class="pname">' + content[i].tProducts.pname +'</p>' + 
							'<div class="produce-style">' +
								'<span class="price">单价：￥' + content[i].tProductsTypes.newPrice + '</span>&nbsp;&nbsp;&nbsp;' +
								'<span class="yanse">颜色：' + content[i].tProductsTypes.color + '</span>&nbsp;&nbsp;&nbsp;' +
                				'<span class="chima">尺码：' + content[i].tProductsTypes.size + '</span>&nbsp;&nbsp;&nbsp;' +
							'</div>' + 
							'<div class="num">' + 
								content[i].amount + '件&nbsp;&nbsp;&nbsp;共' + content[i].totalPrice + '元' + 
							'</div>' + 
							'<div class="seller-beizhu">卖家备注：' + 
								content[i].leavemsg2 +
							'</div>' + 
						'</div>' + 
						'<div class="details-con-Buyers">' + 
							'<div class="name-tel">' + 
								content[i].tDeliver.receiver +'&nbsp;&nbsp;&nbsp;' + content[i].tDeliver.phone + 
							'</div>' + 
							'<p class="address"> 地址：' + 
								content[i].tDeliver.address +
							'</p>' + 
							'<div class="beizhu">买家备注：' + 
								content[i].leavemsg +
							'</div>' + 
						'</div>' + 
						'<div class="see-wuliu" title="">\n' + 
		                	'查看物流\n' +
		                '</div>\n' +
		                '<div class="order-style">' + 
		                	content[i].state + 
		                '</div>' + 
					'</div>' + 
					'<div class="details-details-cons">' +
		                '<div class="wuliu" >' + 
		                	'<span>物流公司：' + content[i].tDeliver.dname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
		                	'<span>物流单号：' + content[i].tDeliver.dcode + '</span>' + 
	                	'</div>' + 
		            '</div>\n' +
				'</div>'
			)
            if(content[i].groupCode != undefined){
            	$('<span>团购号：'+ content[i].groupCode + '</span>&nbsp;&nbsp;').insertBefore('.details-top span:eq(0)')
            }
        }
    }
}



//订单查询
function queryOrder(){
	$('body').append(
		'<div class="search-con">' + 
			'<div class="input option">' + 
				'<span>订单类型：（必填）</span>' + 
				'<select><option></option><option value="2">团购订单</option><option value="1">个人订单</option></select>' + 
			'</div>' + 
			'<div class="input number">' + 
				'<span>订单编号：</span><input type="text" placeholder="订单编号">' +
			'</div>' +
			'<div class="input nickname">' + 
				'<span>买家昵称：</span><input type="text" placeholder="买家昵称">' +
			'</div>' + 
			'<div class="input-time">' + 
				'<span>成交时间：</span><input type="text" placeholder="开始时间"><span>——</span><input type="text" placeholder="结束时间">' + 
			'</div>' + 
			'<div class="search-sure">' + 
				'<input type="button" value="开始搜索" class="begin">&nbsp;&nbsp;&nbsp;&nbsp;' + 
				'<input type="button" value="取消" class="dele">' + 
			'</div>' + 
		'</div>'
	)
}

$('.all').on('click','.queryOrder',function(){
	queryOrder()
	$('.search-con').hide()
	$('.search-con').slideDown('fast')
})
$(document).on('click','.search-con .dele',function(){
	console.log(123)
	$(this).parents('.search-con').remove()
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
        addhtml13_(content)
        $('.body-top .li:eq(4)').addClass('li-change').siblings().removeClass('li-change')
      }
    })
  } else {
    alert('开始日期与结束日期必须全部填写完整或或全部不填')
  }
}

$(document).on('click','.search-con select',function () {
  var type = $('select option:selected').val()
  order_type = type
})

$(document).on('click','.search-sure .begin',function () {
  search()
  $(this).parents('.search-con').remove()
})

$('body').on('keydown', function (e) {
  if (e.keyCode === 13) {
    search()
  }
})




//待退货









// 点击切换
$('.body-top ul li').click(function () {
    var id_ = $(this).index()
    pages = 0
    $('.all').html('')
    switch (id_) {
        case 0:
            $.post(localhost + '/tuan/tuanorders/tuaning_list', {
                saleId: token,
                online_code: onlinecode
            }, function (data) {
                outline(data)
                var content = data.data
                addhtml1_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
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
        case 1:
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
        /*case 4:
            $.post(localhost + '/tuan/tuanorders/list', {
                saleId: token,
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
            break*/
    }
    return false
})

//个人订单点击事件
$('body').on('click', '.person', function () {
    var ind = $(this).parents('li').index()
    pages = 0
    console.log($(this))
    switch (ind) {
        case 1:
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
        $.post(localhost + '/tuan/tuanorders/tuaning_list', {
                saleId: token,
                online_code: onlinecode
            }, function (data) {
                outline(data)
                var content = data.data
                addhtml1_(content)
                if (content.length === 0) {
                    $('.pages').hide()

                
                } else {
                    $('.pages').show()
                }
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

//全选选择
$('.all').on('click', 'input.all-choice', function(){
	if($(this).is(":checked")){
		$(this).parents('.all').find('.details .checkbox').prop('checked',true)
	}else{
		$(this).parents('.all').find('.details .checkbox').prop('checked',false)
	}
})
$('.all').on('click','.details .checkbox',function(){
	if(!$(this).is(":checked")){
		$(this).parents('.all').find('input.all-choice').prop('checked',false)
	}
})

//个人订单生成表格
$('.all').on('click', '.generateTable', function(){
	//将订单号添加至一个数组中
	var xlsxs = []
	$(this).parents(".all").find(".details .checkbox").each(function(){
		if($(this).is(":checked")){
			xlsxs.push($(this).parents(".details").find(".oNum").text())
		}
	})
	console.log(xlsxs)
	if(xlsxs.length===0){
		alert("请选择订单")
	}else{
		$.post(localhost + '/tuan/torders/excel',{
				saleId: token,
				oids: xlsxs.join("=")
			},function(res){
				if(res.error){
                    alert(res.message)
                }else {
                    if(res.data!==null){
                        location.href = res.data
                    }else {
                        alert('数据错误！')
                    }
                }
			})
	}
})


//团购生成表格
$('.all').on('click', '.tuan-generateTable', function(){
	//将订单号添加至一个数组中
	var xlsxs = []
	$(this).parents(".all").find(".details .checkbox").each(function(){
		if($(this).is(":checked")){
			xlsxs.push($(this).parents(".details").find(".oNum").text())
		}
	})
	if(xlsxs.length===0){
		alert("请选择订单")
	}else{
		$.post(localhost + '/tuan/tuanorders/excel',{
				saleId: token,
				oids: xlsxs.join("=")
			},function(res){
				if(res.error){
                    alert(res.message)
                }else {
                    if(res.data!==null){
                        location.href = res.data
                    }else {
                        alert('数据错误！')
                    }
                }
			})
	}
})




// 点击发货按钮下拉事件
$('body').on('click', '.fahuo', function () {
    if ($(this).attr('title') === '') {
        $(this).parents('.details').find('.details-details-cons').stop(true).slideDown()
        $(this).prop('title', '发货')
    } else {
        $(this).parents('.details').find('.details-details-cons').stop(true).slideUp()
        $(this).prop('title', '')
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


// 点击查看物流详情
$('body').on('click', '.see-wuliu', function () {
    if ($(this).attr('title') === '') {
        $(this).parents('.details').find('.details-details-cons').stop(true).slideDown()
        $(this).prop('title', '查看物流')
    } else {
        $(this).parents('.details').find('.details-details-cons').stop(true).slideUp()
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


// 普通订单发货点击确认按钮，成功后更改订单状态
$('body').on('click', '.fahuo-sure', function () {
    var dename_ = []
    var oid = $(this).parents('.details').find('.oNum').html()
    var dcode = $(this).siblings('.express').find('input').val()
    var dname = $(this).siblings('.details-ul').find('input').val()
    var id = $(this).parents('.details').find('.did').html()
    var that = $(this)
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
                        	that.parents('.details').remove()
                        }
                    }
                })
            }
        }
    })
})

//团购未发货订单卖家备注填写
$('.all').on("click", '.tuan-tianxie', function(){
	var oid = $(this).parents('.details').find('.oNum').html()
	var leavemsg
	var that = $(this)
	leavemsg = prompt('请填写备注');
	
	$.post(localhost + '/tuan/tuanorders/leavemsg',{
		oid: oid,
		saleId: token,
		leavemsg: leavemsg,
		online_code: onlinecode
	}, function(res){
		outline(res)
		if(res.message === '操作成功'){
			that.parents('.details').find('.seller-beizhu p').text(leavemsg)
		}
	})
	
	
})
//普通订单卖家备注填写
$('.all').on("click", '.tianxie', function(){
	var oid = $(this).parents('.details').find('.oNum').html()
	var leavemsg
	var that = $(this)
	leavemsg = prompt('请填写备注');
	$.post(localhost + '/tuan/torders/leavemsg',{
		oid: oid,
		saleId: token,
		leavemsg: leavemsg,
		online_code: onlinecode
	}, function(res){
		outline(res)
		if(res.message === '操作成功'){
			that.parents('.details').find('.seller-beizhu p').text(leavemsg)
		}
	})
	
	
})

//团购订单发货 
$('.all').on('click', '.tuan-fahuo-sure', function () {
    var oid = $(this).parents('.details').find('.oNum').html()
    var did = $(this).siblings('.did').text()
    var dcode = $(this).siblings('.express').find('input').val()
    var dname = $(this).siblings('.details-ul').find('input').val()
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
            console.log(res)
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
                            that.parents('.details').remove()
                            /*that.parents('.details-details-cons-tuan-cons').find('.details-details-cons-tuan-con').eq(index).remove()
                            if (that.parents('.details-details-cons-tuan-cons').find('.details-details-cons-tuan-con').length === 0) {
                                that.parents('.details-details-cons-tuan-cons').remove()
                            }*/
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