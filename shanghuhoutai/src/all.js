var pageNumber = 0
$.post(localhost + '/seller/sort', {
    all: 'all',
    token: token,
    online_code: onlinecode
}, function (data) {
    if (data.code !== 102) {
        if (data.data.length > 0) {
            for (var i = 0; i < data.data.length; i++) {
                $('.all').append(' <ul>\n' +
                    '                    <li>' + data.data[i].createDate + '</li>\n' +
                    '                    <li>' + data.data[i].turnover + '</li>\n' +
                    '                    <li>' + data.data[i].visitors + '</li>\n' +
                    '                    <li>' + data.data[i].buyers + '</li>\n' +
                    '                    <li>' + data.data[i].views + '</li>\n' +
                    '                </ul>')
            }
        } else {
            $('.all').append('<div>暂无商品数据！</div>')
        }
    } else {
        alert(data.message)
        location.href = 'index.html'
    }
})

