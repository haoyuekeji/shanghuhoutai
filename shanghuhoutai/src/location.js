$('.body-left a').click(function () {
  var ind = $(this).index()
    console.log(ind)
  switch (ind) {
    case 0:
      location.href = 'all.html'
      break
    case 1:
      location.href = 'push.html'
      break
    case 2:
      location.href = 'charge.html'
      break
    case 3:
      location.href = 'deal.html'
      break
    case 4:
      location.href = 'set.html'
      break
    case 5:
      location.href = 'cj.html'
      break
    case 6:
      location.href = 'comment.html'
      break
  }
})
var height = $(window).height()
$('.body-left').css({
  height: height
})
$('.body-con,.set-con').css({
  height: height - 100 + 'px'
})
$('.body-con .all,.set-con .all,.cj-con .all').css({
  height: height - 185 + 'px'
})
$('.set-con,.push-con').css({
  height: height
})
$('.body-top ul li ').click(function () {
  $(this).addClass('li-change').siblings().removeClass('li-change')
})