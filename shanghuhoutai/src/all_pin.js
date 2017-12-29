var pageNumber = 0
$.post(localhost + '/tuan/tdictionary/list', {
  saleId: token,
  online_code: onlinecode
}, function (data) {
  outline(data)
  var content = data.data.content;
  if (content.length > 0) {
    for (var i = 0; i < content.length; i++) {
      $('.all').append(' <ul>\n' +
        '                    <li>' + content[i].createDate + '</li>\n' +
        '                    <li>' + content[i].turnover + '</li>\n' +
        '                    <li>' + content[i].visitors + '</li>\n' +
        '                    <li>' + content[i].buyers + '</li>\n' +
        '                    <li>' + content[i].views + '</li>\n' +
        '                </ul>')
    }
  } else {
    $('.all').append('<div>暂无商品数据！</div>')
  }
})
