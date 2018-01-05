var amount_ = []
var saleNumber_ = []
var content
var conLeng
var pages = 0
var pagesindex = 0
var showlist = []
var enlist = []
var dename = []
var style, details, html_
var nums = 0
var inputEcl =[]
var allinput =[]
var inputIndex = []

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

// 待付款
function addhtml1_(content) {
    $('.all').html('')
    if (content.length === 0) {
        $('.all').html('您没有未付款订单！')
        return false
    } else {
        $(".all").append('<div class="dBtn"><div class="allInput"><input type="checkbox" id="zongBox"><label for="zongBox">全选</label></div><div class="searchInput">查询订单</div><div class="btnEcl">生成表格</div></div>')
        for (var i = 0; i < content.length; i++) {
            var img = content[i].products[0].indexImages.split(',')[0]
            inputIndex.push(content[i].id)
            var asd=''
            console.log()
            inputEcl.forEach(function (val,key) {
                if(val == content[i].id){
                    asd = 'checked'
                }
            })
            $('.all').append('' +
                '<div class="details">\n' +
                '<div class="data"><input type="checkbox" class="inputBox" value="' + content[i].id + '" '+ asd +'><a> 订单号：' + content[i].orderCode + '</a><span>成交时间：' + content[i].createDate + '</span></div>\n' +
                '    <div class="details-left">\n' +
                '           <img src="' + img + '" alt="">\n' +
                '    </div>\n' +
                '    <div class="details-con width">\n' +
                '    <div class="details-con-top">\n' +
                content[i].products[0].pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].produtsTypes[0].color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].produtsTypes[0].size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge">\n' +
                '标价：￥<span style="color:black;">' + content[i].produtsTypes[0].discountPrice +
                '<span style="color:black;margin-left:30px">总价：￥<span class="price-all" style="color:black;">' + content[i].totalPrice +
                '</span> </span>' +
                '</div>\n' +
                '</div>\n' +
                '<div class="details-right-charge" style="width:50%">\n' +
                '    <div class="address" style="width:45%">\n' +
                content[i].address.receiver + content[i].address.phone + '<br>\n' +
                content[i].address.address +
                '</div>\n' +
                '<div class="id" style="display:none">' + content[i].id + '</div>' +
                '<div class="fahuo revise-price" title="">\n' +
                '修改单价\n' +
                '</div>\n' +
                '<div class="fahuo cacel-price" title="" style="right:150px">\n' +
                '关闭订单\n' +
                '</div>\n' +
                '</div>\n' +
                '    </div>' +
                '')
        }
    }
}
// 已发货
function addhtml2_(content) {
    $('.all').html('')
    if (content.length === 0) {
        $('.all').html('您没有已发货订单！')
        return false
    } else {
        $(".all").append('<div class="dBtn"><div class="allInput"><input type="checkbox" id="zongBox"><label for="zongBox">全选</label></div><div class="searchInput">查询订单</div><div class="btnEcl">生成表格</div></div>')

        for (var i = 0; i < content.length; i++) {
            var img = content[i].products[0].indexImages.split(',')[0]
            inputIndex.push(content[i].id)
            var asd=''
            console.log()
            inputEcl.forEach(function (val,key) {
                if(val == content[i].id){
                    asd = 'checked'
                }
            })
            $('.all').append('' +
                '<div class="details" style="font-size:12px">\n' +
                '<div class="data"><input type="checkbox" class="inputBox" value="' + content[i].id + '" '+ asd +'><a> 订单号：' + content[i].orderCode + '</a><span>成交时间：' + content[i].createDate + '</span></div>\n' +
                '    <div class="details-left">\n' +
                '           <img src="' + img + '" alt="">\n' +
                '    </div>\n' +
                '    <div class="details-con width">\n' +
                '    <div class="details-con-top">\n' +
                content[i].products[0].pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].produtsTypes[0].color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].produtsTypes[0].size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge">\n' +
                '总价：￥' + content[i].totalPrice +
                '    </div>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '    <div class="address">\n' +
                content[i].address.receiver + content[i].address.phone + '<br>\n' +
                content[i].address.address +
                '</div>\n' +
                '<div class="fahuo wuliu-details" title="" >\n' +
                '查看物流详情\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="details-details-cons">' +
                '<div class="details-details-con">' +
                '<div class="details-ul">' +
                '<ul>' +
                '<li>' + content[i].deliver.dname + '</li>' +
                '<li>' + content[i].deliver.dcode + '</li>' +
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
        $('.all').html('您没有未发货订单！')
        return false
    } else {
        $(".all").append('<div class="dBtn"><div class="allInput"><input type="checkbox" id="zongBox"><label for="zongBox">全选</label></div><div class="searchInput">查询订单</div><div class="btnEcl">生成表格</div></div>')
        for (var i = 0; i < content.length; i++) {
            var img = content[i].products[0].indexImages.split(',')[0]
            inputIndex.push(content[i].id)
            var asd=''
            console.log()
            inputEcl.forEach(function (val,key) {
                if(val == content[i].id){
                    asd = 'checked'
                }
            })
            $('.all').append('' +
                '<div class="details">\n' +
                '<div class="data"><input type="checkbox" class="inputBox" value="' + content[i].id + '" '+ asd +'><a> 订单号：' + content[i].orderCode + '</a><span>成交时间：' + content[i].createDate + '</span></div>\n' +
                '    <div class="details-left">\n' +
                '           <img src="' + img + '" alt="">\n' +
                '    </div>\n' +
                '    <div class="details-con width">\n' +
                '    <div class="details-con-top">\n' +
                content[i].products[0].pname +
                '</div>\n' +
                '<div class="style">\n' +
                '<span class="yanse">颜色：' + content[i].produtsTypes[0].color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].produtsTypes[0].size + '</span>\n' +
                '</div>\n' +
                '<div class="price price-charge">\n' +
                '<div class="status">\n' +
                '总价：' + content[i].totalPrice +
                '<span style="margin-left:30px;">数量：' + content[i].amount + '</span></div>\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '    <div class="address">\n' +
                content[i].address.receiver + content[i].address.phone + '<br>\n' +
                content[i].address.address +
                '</div>\n' +
                '<div style="width:70%;font-size:14px;margin-top:5px">买家备注：<span style="color:blue">' +
                content[i].leaveMessage +
                '</span></div>' +
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
                '<div class="beizhu">' +
                '<div class="con">卖家备注：<span style="color:red">' + content[i].leaveMessage_seller +
                '</span></div>' +
                '<div class="id" style="display:none">' + content[i].id + '</div>' +
                '<div class="tianxie">填写备注</div>' +
                '</div>' +
                '</div>'
            )
        }
    }
}

// 已完成
function addhtml4_(content) {
    $('.all').html('')
    if ( content.length === 0) {
        $('.all').html('您没有已完成订单！')
        return false
    } else {
        $(".all").append('<div class="dBtn"><div class="allInput"><input type="checkbox" id="zongBox"><label for="zongBox">全选</label></div><div class="searchInput">查询订单</div><div class="btnEcl">生成表格</div></div>')
        for (var i = 0; i < content.length; i++) {
            var img = content[i].products[0].indexImages.split(',')[0]
            var asd=''
            inputEcl.forEach(function (val,key) {
                if( val == content[i].id){
                    asd = 'checked'
                }
            })
            $('.all').append('' +
                '<div class="details" style="font-size:12px">\n' +
                '<div class="data"><input type="checkbox" class="inputBox" value="' + content[i].id + '" '+ asd +'><a> 订单号：' + content[i].orderCode + '</a><span>成交时间：' + content[i].createDate + '</span></div>\n' +
                '    <div class="details-left">\n' +
                '           <img src="' + img + '" alt="">\n' +
                '    </div>\n' +
                '    <div class="details-con width">\n' +
                '    <div class="details-con-top">\n' +
                content[i].products[0].pname +
                '</div>\n' +
                '<s class="style">\n' +
                '<span class="yanse">颜色：' + content[i].produtsTypes[0].color + '</span>\n' +
                '<span class="chima">尺码：' + content[i].produtsTypes[0].size + '</span>\n' +
                '<span class="price price-charge">\n' +
                ' 总价：' + content[i].totalPrice +
                ' <span>数量：' + content[i].amount + '</span>   </s>\n' +
                '</span>\n' +
                '</div>\n' +
                '<div class="details-right-charge">\n' +
                '    <div class="address">\n' +
                content[i].address.receiver + content[i].address.phone + '<br>\n' +
                content[i].address.address +
                '</div>\n' +
                '<div class="fahuo wuliu-details" title="">\n' +
                '删除订单\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>' +
                '')
        }
    }
}

//一键添加 一键清除
$("body").on('click','#zongBox',function () {
    if(!$(".all").find('.data').find('.inputBox').prop('checked')){
        var  findBox = $(".all").find('.data').find('.inputBox');
        $(".all").find('.data').find('.inputBox').attr({checked:'checked'})
        for(var i = 0;i<findBox.length;i++){
            var Iid  =  findBox[i].attributes[2].nodeValue;
            inputEcl.push(Iid);
        }
    }
    else{
        $(".all").find('.data').find('.inputBox').removeAttr('checked')
    }
})

//查询订单
    $('body').on('click','.searchInput',function () {
        $(".searchBox").animate({top:'200px'})
    })


//提交查询
$('body').on('click','.goSearch',function (content) {
    var id = localStorage.getItem('token')
        var  a = $("#shangpin").val();
        var  b = $("#dingdan").val();
        console.log(b)
        var  c = $("#shangpm").val();
        var  d = $("#dingdanzt option:selected").text();
        var  e = $("#mname").val();
        console.log(d)
    $.ajax({
        type:'POST',
        url:localhost + '/order/query',
        data:{
                sellerId:id,
                ordercode:b,
                pcode:a,
                pname:c,
                state:d,
                wxname:e
        },
        success:function (res) {
            var content=[];
            var searchAll = res.data;
            console.log(searchAll)
            content.push.apply(content,searchAll)
            console.log(searchAll)
            if( a ==="" && b===""&& c===""&& e===""){
                alert("至少填写一种搜索信息")
            }else  if(res.data.length === 0 ){
                alert("无数据")
            }else{
                searchAll.forEach(function (val,key) {
                    if(val.state === "待付款订单"){
                        $(".body-top").find('ul').find('li').eq(0).addClass('li-change').siblings().removeClass('li-change');
                        console.log(1)
                        console.log(val)
                        $('.all').html('')
                        addhtml1_(content)
                        console.log(content.length)
                    }else if(val.state === "待发货订单"){
                        $(".body-top").find('ul').find('li').eq(1).addClass('li-change').siblings().removeClass('li-change');
                        console.log(2)
                        console.log(val)
                        $('.all').html('')
                        addhtml2_(content)
                    }else if(val.state === "待收货订单"){
                        $(".body-top").find('ul').find('li').eq(2).addClass('li-change').siblings().removeClass('li-change');
                        console.log(3)
                        $('.all').html('')
                        addhtml3_(content)
                    }else if(val.state === "已完成订单"){
                        $(".body-top").find('ul').find('li').eq(3).addClass('li-change').siblings().removeClass('li-change');
                        console.log(4)
                        $('.all').html('')
                        addhtml4_(content)
                    }
                })
            }
        }
    })
})
//关闭查询
$('body').on('click','.del',function () {
    $(".searchBox").animate({top:'-700px'})
    $("#myform").find('input[type=text],select,input[type=hidden]').each(function() {$(this).val('');});
})

//生成表格
    $("body").on('click','.btnEcl',function () {
        if(inputEcl.length===0){
            alert('请选择列表!')
        }else {
            $.ajax({
                url:localhost + '/order/excel',
                type:'POST',
                data:{
                    sellerId:token,
                    oids:inputEcl.join('=')
                },
                success:function (res) {
                    console.log(res )
                    if(res.error){
                        alert(res.message)
                    }else {
                        if(res.data!==null){
                            location.href = res.data
                        }else {
                            alert('数据错误！')
                        }
                    }
                }
            })
        }
    })


//checkBox 点击生成数组
    $("body").on('click','.inputBox',function () {
        var value = $(this).val()
        if($(this).prop('checked')){
            inputEcl.push(value)
        }else{
            inputEcl.splice(value.indexOf(inputEcl),1)
        }
    })

// 获取已销售信息

; (function () {
    $.post(localhost + '/order/list', {
        pageNumber: pages,
        pageSize: 10,
        sellerId: token,
        state: '待付款订单',
        active: true,
        online_code: onlinecode
    }, function (data) {
        outline(data)
        var content = data.data.content
        addhtml1_(content)
        if (content.length === 0) {
            $('.pages').hide()
        } else {
            $('.pages').show()
        }
    })
}())


$('.body-top ul li').click(function () {
    var id_ = $(this).index()
    pagesindex = $(this).index()
    pages = 0
    $('.all').html('')
    switch (id_) {
        case 0:
            $.post(localhost + '/order/list', {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '待付款订单',
                active: true,
                online_code: onlinecode
            }, function (data) {
                outline(data)
                var content = data.data.content
                addhtml1_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            break
        case 1:
            $.post(localhost + '/order/list', {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '待发货订单',
                online_code: onlinecode
            }, function (data) {
                outline(data)
                var content = data.data.content
                addhtml3_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            break
        case 2:
            $.post(localhost + '/order/list', {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '待收货订单'
            }, function (data) {
                outline(data)
                var content = data.data.content
                addhtml2_(content)
                if (content.length === 0) {
                    $('.pages').hide()
                } else {
                    $('.pages').show()
                }
            })
            break
        case 3:
            $.post(localhost + '/order/list', {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '已完成订单'
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
        default:
            break
    }
})


// 填写备注
$('body').on('click', '.tianxie', function () {
    $(".con").css({color:'red'})
    var id = $(this).siblings('.id').text()
    var con = prompt('请输入备注内容', '')
    var that = $(this)
    if (con && con !== '') {
        $.post(localhost + '/order/update', {
            id: id,
            leaveMessage_seller: con,
            sellerId: token,
            online_code: onlinecode
        }, function (res) {
            outline(res)
            if (res.message === '操作成功') {
                that.siblings('.con').text('卖家备注：' + con)
            }
        })
    }
})

// 修改总价
$('body').on('click', '.revise-price', function () {
    var id = $(this).siblings('.id').text()
    var price = prompt('请输入总价', '')
    var that = $(this)
    if (price && price !== '') {
        $.post(localhost + '/order/update', {
            id: id,
            totalPrice: price,
            changePrice: 'yes',
            sellerId: token,
            online_code: onlinecode
        }, function (res) {
            outline(res)
            if (res.message === '操作成功') {
                that.parents('.details').find('.price-all').html(price)
            }
        })
    }
})

//取消订单
$('body').on('click', '.cacel-price', function () {
    var id = $(this).siblings('.id').text()
    var index = $(this).parents('.details').index()
    var that = $(this)
    if (confirm("你确定取消订单吗？")) {
        $.post(localhost + '/order/cancel', {
            id: id,
            sellerId: token,
            online_code: onlinecode
        }, function (res) {
            outline(res)
            if (res.message === '操作成功') {
                alert(res.message)
                that.parents('.details').remove()
            }
            if ($('.all').find('.details').length === 0) {
                $('.all').html('您已经没有待付款订单了！')
            }
        })
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
            style = '/order/list'
            details = {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                active: true,
                state: '待付款订单',
                online_code: onlinecode
            }
            html_ = addhtml1_
            break
        case 1:
            style = '/order/list'
            details = {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '待发货订单',
                online_code: onlinecode
            }
            html_ = addhtml3_
            break
        case 2:
            style = '/order/list'
            details = {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '待收货订单',
                online_code: onlinecode
            }
            html_ = addhtml2_
            break
        case 3:
            style = '/order/list'
            details = {
                pageNumber: pages,
                pageSize: 10,
                sellerId: token,
                state: '已完成订单',
                online_code: onlinecode
            }
            html_ = addhtml4_
            break
    }
    $.post(localhost + style, details, function (data) {
        outline(data)
        content = data.data.content
        console.log(content)
        if (content.length === 0) {
            $('.message').html('这已经是最后一页了！').fadeIn()
            setTimeout(function () {
                $('.message').fadeOut()
            }, 1000)
            pages--
            switch (pagesindex) {
                case 0:
                    style = '/order/list'
                    details = {
                        pageNumber: pages,
                        pageSize: 10,
                        sellerId: token,
                        active: true,
                        state: '待付款订单',
                        online_code: onlinecode
                    }
                    html_ = addhtml1_
                    break
                case 1:
                    style = '/order/list'
                    details = {
                        pageNumber: pages,
                        pageSize: 10,
                        sellerId: token,
                        state: '待发货订单',
                        online_code: onlinecode
                    }
                    html_ = addhtml3_
                    break
                case 2:
                    style = '/order/list'
                    details = {
                        pageNumber: pages,
                        pageSize: 10,
                        sellerId: token,
                        state: '待收货订单',
                        online_code: onlinecode
                    }
                    html_ = addhtml2_
                    break
                case 3:
                    style = '/order/list'
                    details = {
                        pageNumber: pages,
                        pageSize: 10,
                        sellerId: token,
                        state: '已完成订单',
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

            content = data.data.content
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
                style = '/order/list'
                details = {
                    pageNumber: pages,
                    pageSize: 10,
                    sellerId: token,
                    active: true,
                    state: '待付款订单',
                    online_code: onlinecode
                }
                html_ = addhtml1_
                break
            case 1:
                style = '/order/list'
                details = {
                    pageNumber: pages,
                    pageSize: 10,
                    sellerId: token,
                    state: '待发货订单',
                    online_code: onlinecode
                }
                html_ = addhtml3_
                break
            case 2:
                style = '/order/list'
                details = {
                    pageNumber: pages,
                    pageSize: 10,
                    sellerId: token,
                    state: '待收货订单',
                    online_code: onlinecode
                }
                html_ = addhtml2_
                break
            case 3:
                style = '/order/list'
                details = {
                    pageNumber: pages,
                    pageSize: 10,
                    sellerId: token,
                    state: '已完成订单',
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
    }


})
