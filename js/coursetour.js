(function($) {

  $('#coursetour-carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '#coursetour-slider'
  });

  $('#coursetour-slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#coursetour-carousel"
  });

})(jQuery);
