(function($) {

  $("coursetour .owl-carousel").owlCarousel({
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
  });

  $('media .nav-tabs a').each(function() {
    var $this = $(this);
    $this.click(function (e) {
        e.preventDefault();
        $this.tab('show');
        $($this.attr('href')).find('.flexslider').resize();
    });
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

  $('#coursetour-videos-slider')
    .flexslider({
      animation: 'slide',
      useCSS: false,
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      sync: "#coursetour-videos-carousel"
    });


    $('#coursetour-images-carousel-2').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: 210,
      itemMargin: 5,
      asNavFor: '#coursetour-images-slider-2'
    });

    $('#coursetour-images-slider-2').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      sync: "#coursetour-images-carousel-2"
    });

    $('#coursetour-videos-carousel-2').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: 210,
      itemMargin: 5,
      asNavFor: '#coursetour-videos-slider-2'
    });

    $('#coursetour-videos-slider-2')
      .flexslider({
        animation: 'slide',
        useCSS: false,
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#coursetour-videos-carousel-2"
      });

})(jQuery);
