var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    loop: true,
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  }),
  bnner_list = ['images/1banner.png', 'images/2banner.png', 'images/2banner.png']

for (var k = 0; k < bnner_list.length; k++) {
  $('.swiper-slide').append('<img src="' + bnner_list[k] + '" alt="" width="100%">')
}
