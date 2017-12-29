$('.body-left a').click(function () {
  var ind = $(this).index()
  switch (ind) {
    case 0:
      location.href = 'all_pin.html'
      break
    case 1:
      location.href = 'push_pin.html'
      break
    case 2:
      location.href = 'charge_pin.html'
      break
    case 3:
      location.href = 'set_pin.html'
      break
    case 4:
      location.href = 'seach_pin.html'
      break
    case 5:
      location.href = 'comment_pin.html'
      break
    case 6:
      location.href = 'activity_pin.html'
      break
  }
})
var height = $(window).height()
$('.body-left').css({ height: height })
$('.body-con,.set-con').css({ height: height - 100 + 'px' })
$('.body-con .all,.set-con .all,.comment-con .all').css({ height: height - 185 + 'px' })
$('.set-con,.push-con,.search-con,.activity-pin-con').css({ height: height })
$('.body-top ul .li ').click(function () {
  $(this).addClass('li-change').siblings().removeClass('li-change')
})