(function($) {

  $(".owl-carousel").owlCarousel({
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
});

  $('#coursetour-images-carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '#coursetour-images-slider'
  });

  $('#coursetour-images-slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#coursetour-images-carousel"
  });

  $('#coursetour-videos-carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '#coursetour-videos-slider'
  });

  $('#coursetour-videos-slider').flexslider({
    animation: 'slide',
    useCSS: false,
    controlNav: false,
    animationLoop: false,
    sync: "#coursetour-videos-carousel"
  });

})(jQuery);
