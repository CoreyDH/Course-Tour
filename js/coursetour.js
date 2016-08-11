(function($) {

  $.coursetour = function(el, options) {

    var tour = {
      $el: $(el),
      options: $.extend({}, $.coursetour.defaults, options)
    };
    console.log(tour);

    // createHTML methods;
    var createHTML = {

      init: function() {

        this.$el = tour.$el;
        this.options = tour.options;
        this.description = [];
        this.stats = [];



        this.createNav();
        this.createCarousel();
        this.createMedia();

        this.getContent().done(function() {
          createHTML.createAside();
        });
        
      },
      createNav: function() {

        this.$el.append('<div class="coursetour-nav"><ul></ul></div>');
        var $ul = this.$el.find('.coursetour-nav ul');

        for(var i=1; i <= this.options.holes; i++) {
          $ul.append('<li class="coursetour-nav-holes"><a href="#'+i+'">'+i+'</a></li>');
        }

      },
      createCarousel: function() {

        this.$el.append('<div class="coursetour-carousel"></div>');
        var $div = this.$el.find('.coursetour-carousel');

        for(var i=1; i <= this.options.holes; i++) {
          $div.append('<div id="hole-'+i+'" class="hole-wrapper"><h1 class="text-center"><span class="glyphicon glyphicon-chevron-left pull-left"></span>HOLE '+i+'<span class="glyphicon glyphicon-chevron-right pull-right"></span></h1></div>');
        }

      },
      createMedia: function() {

        this.$el.find('.hole-wrapper').append('<media class="col-md-8"></media>');
        var $media = this.$el.find('.hole-wrapper > media');

        for(var i=0; i < $media.length; i++) {

          // Nav Tabs
          $media.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul>');


          // If there are images
          if(this.getImages()) {

            $media.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-media-images-'+i+'" aria-controls="coursetour-media-images-'+i+'" role="tab" data-toggle="tab">Images</a></li>');

            // Images Tabs Pane
            $media.eq(i).append('<div class="tab-content"><div role="tabpanel" class="tab-pane active" id="coursetour-media-images-'+i+'"><div id="coursetour-images-slider-'+i+'" class="flexslider coursetour-images"><ul class="slides"></ul></div><div id="coursetour-images-carousel-'+i+'" class="flexslider"><ul class="slides"></ul></div></div>');

          }

          // If there are videos
          if(this.options.videos.length > 0) {

            $media.eq(i).find('.nav-tabs').append('<li role="presentation"><a href="#coursetour-media-videos-'+i+'" aria-controls="coursetour-media-videos-'+i+'" role="tab" data-toggle="tab">Videos</a></li>');

            // Video Tabs Pane
            $media.eq(i).append('<div class="tab-content"><div role="tabpanel" class="tab-pane active" id="coursetour-media-videos-'+i+'"><div id="coursetour-videos-slider-'+i+'" class="flexslider coursetour-videos"><ul class="slides"></ul></div><div id="coursetour-videos-carousel-'+i+'" class="flexslider"><ul class="slides"></ul></div></div>');

          }

        }

      },
      createAside: function() {

        this.$el.find('.hole-wrapper').append('<aside class="col-md-4"><div class="row"></div></aside>');
        var $aside = this.$el.find('.hole-wrapper > aside > .row');
        console.log(this.description);

        for(var i=0; i < $aside.length; i++) {

          // Nav Tabs
          $aside.eq(i).append('<ul class="nav nav-tabs" role="tablist"><li role="presentation" class="active"><a href="#coursetour-aside-desc-'+i+'" aria-controls="coursetour-aside-desc-'+i+'" role="tab" data-toggle="tab">Description</a></li><li role="presentation"><a href="#coursetour-aside-stats-'+i+'" aria-controls="coursetour-aside-stats-'+i+'" role="tab" data-toggle="tab">Stats</a></li></ul>');

          // Description Tabs Pane
          $aside.eq(i).append('<div class="tab-content"><div role="tabpanel" class="tab-pane active" id="coursetour-media-images-'+i+'"><div id="coursetour-images-slider-'+i+'" class="flexslider coursetour-images"><ul class="slides"></ul></div><div id="coursetour-images-carousel-'+i+'" class="flexslider"><ul class="slides"></ul></div></div>');

          // Stats Tabs Pane
          $aside.eq(i).append('<div class="tab-content"><div role="tabpanel" class="tab-pane active" id="coursetour-media-videos-'+i+'"><div id="coursetour-videos-slider-'+i+'" class="flexslider coursetour-videos"><ul class="slides"></ul></div><div id="coursetour-videos-carousel-'+i+'" class="flexslider"><ul class="slides"></ul></div></div>');

        }

      },
      createSliders: function() {

      },
      getImages: function() {

      },
      getContent: function(callback) {

        var deferred = [];

        for(var i=1; i <= this.options.holes; i++) {
          deferred.push(getDesc(i));
          deferred.push(getStats(i));
        }

        return $.when.apply($, deferred);

        function getDesc(index) {

          return $.ajax({
            url: 'collateral/coursetour-desc-'+index+'.htm',
            dataType: 'html',
            success: function(html) {
              console.log('hit', index);
              createHTML.description.push(html);
            }
          });
        }

        function getStats(index) {

          return $.ajax({
            url: 'collateral/coursetour-stats-'+index+'.htm',
            dataType: 'html',
            success: function(html) {
              console.log('hit', index);
              createHTML.stats.push(html);
            }
          });
        }

      }

    };
    // end createHTML

    // Sliders
    function initSliders() {

      $(".coursetour-carousel").owlCarousel({
        items:1,
        margin:30,
        stagePadding:30,
        smartSpeed:450
      });

      $('.coursetour-nav ul li').click(function(){
        $('.coursetour-carousel').trigger('to.owl.carousel', 1);
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

      $('#coursetour-videos-slider').flexslider({
        animation: 'slide',
        useCSS: false,
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#coursetour-videos-carousel"
      });
    }

    createHTML.init();
  };

  $.coursetour.defaults = {
    holes: 18,
    videos: [],
    imageDir: 'images/coursetour'
  };

  $.fn.coursetour = function(options) {
    new $.coursetour(this, options);
  };

})(jQuery);
