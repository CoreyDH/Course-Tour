(function($) {

  $.coursetour = function(el, options) {

    var tour = {
      $el: $(el),
      options: $.extend({}, $.coursetour.defaults, options)
    };

    // createHTML methods;
    var createHTML = {

      init: function() {

        this.$el = tour.$el;
        this.options = tour.options;

        this.images = [];
        this.description = [];
        this.stats = [];

        this.createNav();
        this.createCarousel();
        this.createMedia();
        this.getImages();
        this.createSliders();

        this.getContent().done(function() {
          createHTML.createAside();
          initSliders();
        });

      },
      createNav: function() {

        this.$el.append('<div class="coursetour-nav"></div>');
        // var $ul = this.$el.find('.coursetour-nav ul');

        // for(var i=1; i <= this.options.holes; i++) {
        //   $ul.append('<li class="coursetour-nav-holes"><a href="#'+i+'">'+i+'</a></li>');
        // }

      },
      createCarousel: function() {

        this.$el.append('<div class="coursetour-carousel owl-carousel owl-theme"></div>');
        var $div = this.$el.find('.coursetour-carousel');

        for(var i=1; i <= this.options.holes; i++) {
          $div.append('<div id="hole-'+i+'" class="hole-wrapper"><h1 class="text-center">HOLE '+i+'</h1></div>');
        }

      },
      createMedia: function() {

        this.$el.find('.hole-wrapper').append('<media class="col-md-8"></media>');
        var $media = this.$el.find('.hole-wrapper > media');

        for(var i=0; i < $media.length; i++) {

          // Nav Tabs
          $media.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div>');


          // If there are images
          if(true) { // CHANGE LATER

            $media.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-media-images-'+(i+1)+'" aria-controls="coursetour-media-images-'+(i+1)+'" role="tab" data-toggle="tab">Images</a></li>');

            // Images Tabs Pane
            $media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active" id="coursetour-media-images-'+(i+1)+'"><div id="coursetour-images-slider-'+(i+1)+'" class="flexslider coursetour-images"><ul class="slides"></ul></div><div id="coursetour-images-carousel-'+(i+1)+'" class="flexslider coursetour-images-carousel"><ul class="slides"></ul></div>');

          }

          // If there are videos
          if(this.options.videos['hole'+(i+1)] !== undefined) {

            $media.eq(i).find('.nav-tabs').append('<li role="presentation"><a href="#coursetour-media-videos-'+(i+1)+'" aria-controls="coursetour-media-videos-'+(i+1)+'" role="tab" data-toggle="tab">Videos</a></li>');

            // Video Tabs Pane
            $media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane" id="coursetour-media-videos-'+(i+1)+'"><div id="coursetour-videos-slider-'+(i+1)+'" class="flexslider coursetour-videos"><ul class="slides"></ul></div><div id="coursetour-videos-carousel-'+(i+1)+'" class="flexslider coursetour-videos-carousel"><ul class="slides"></ul></div>');

            if(false) { // there are No images
              $('#coursetour-media-videos-'+(i+1)).addClass('active');
            }

          }

        }

      },
      createAside: function() {

        this.$el.find('.hole-wrapper').append('<aside class="col-md-4"><div class="row"></div></aside>');
        var $aside = this.$el.find('.hole-wrapper > aside > .row');

        for(var i=0; i < $aside.length; i++) {

          // Nav Tabs
          $aside.eq(i).append('<ul class="nav nav-tabs" role="tablist"><li role="presentation" class="active"><a href="#coursetour-aside-desc-'+(i+1)+'" aria-controls="coursetour-aside-desc-'+(i+1)+'" role="tab" data-toggle="tab">Description</a></li><li role="presentation"><a href="#coursetour-aside-stats-'+(i+1)+'" aria-controls="coursetour-aside-stats-'+(i+1)+'" role="tab" data-toggle="tab">Stats</a></li></ul><div class="tab-content"></div>');

          // Description Tabs Pane
          $aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-desc" id="coursetour-aside-desc-'+(i+1)+'">'+this.description[i]+'</div>');

          // Stats Tabs Pane
          $aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane coursetour-stats" id="coursetour-aside-stats-'+(i+1)+'">'+this.stats[i]+'</div>');

        }

      },
      createSliders: function() {

        var $imagesSlider = this.$el.find('media .coursetour-images > ul');
        var $imagesCarousel = this.$el.find('media .coursetour-images-carousel > ul');
        var $videosSlider = this.$el.find('media .coursetour-videos > ul');
        var $videosCarousel = this.$el.find('media .coursetour-videos-carousel > ul');

        for(var i=0; i < this.options.holes; i++) {

          var images = this.images['hole'+(i+1)];

          if(images !== undefined) {
            for(var j=0; j < images.length; j++) {
              $imagesSlider.eq(i).append('<li><img src="'+this.options.imagesPath+'/'+images[j]+'" /></li>');
              $imagesCarousel.eq(i).append('<li><img src="'+this.options.imagesPath+'/'+images[j]+'" /></li>');
            }
          }

          var videos = this.options.videos['hole'+(i+1)];
          // console.log(videos);

          if(videos !== undefined) {
            for(var k=0; k < videos.length; k++) {
              $videosSlider.eq(i).append('<li><iframe width="100%" height="383" src="https://www.youtube.com/embed/'+videos[k]+'" frameborder="0" allowfullscreen></iframe></li>');
              $videosCarousel.eq(i).append('<li><img src="https://i.ytimg.com/vi/'+videos[k]+'/hqdefault.jpg" /></li>');
            }
          }

        }

      },
      getImages: function() {

        // Implement with PHP later

        this.images = {
          hole1: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
          hole2: ['3.jpg', '4.jpg', '5.jpg'],
          hole3: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
          hole4: ['1.jpg']
        };

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
              createHTML.description.push(html);
            }
          });
        }

        function getStats(index) {

          return $.ajax({
            url: 'collateral/coursetour-stats-'+index+'.htm',
            dataType: 'html',
            success: function(html) {
              createHTML.stats.push(html);
            }
          });
        }

      }

    };
    // end createHTML

    // Sliders
    function initSliders() {

      // Setup Carousel
      var owl = $(".coursetour-carousel");

      owl.owlCarousel({
        items:1,
        margin:30,
        stagePadding:30,
        smartSpeed:450,
        nav: true,
        navElement: 'span',
        navText: ['',''],
        navContainer: '.hole-wrapper h1',
        dotsContainer: '.coursetour-nav'
      });

      // Add classes to prev and next buttons
      $('.owl-prev').addClass('glyphicon glyphicon-chevron-left pull-left').first().hide();
      $('.owl-next').addClass('glyphicon glyphicon-chevron-right pull-right').last().hide();

      // Add Hole # to dots
      $('.owl-dot').each(function(i, el) {
        $span = $(el).find('span');
        $span.append(i+1);
      });

      // Fix sizing on tab open
      $('media .nav-tabs a').each(function(i, el) {

        var $el = $(el);
        $el.on('click', function (event) {
            event.preventDefault();
            $el.tab('show');
            $('.flexslider').resize();
        });

      });

      // Flexslider
      $('.coursetour-images').each(function(i, el) {

        $('#coursetour-images-carousel-'+(i+1)).flexslider({
          animation: 'slide',
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemWidth: 210,
          itemMargin: 5,
          asNavFor: '#coursetour-images-slider-'+(i+1)
        });

        $('#coursetour-images-slider-'+(i+1)).flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          sync: '#coursetour-images-carousel-'+(i+1)
        });

      });

      $('.coursetour-videos').each(function(i, el) {

        $('#coursetour-videos-carousel-'+(i+1)).flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemWidth: 210,
          itemMargin: 5,
          asNavFor: '#coursetour-videos-slider-'+(i+1)
        });

        $('#coursetour-videos-slider-'+(i+1)).flexslider({
          animation: 'slide',
          useCSS: false,
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          sync: '#coursetour-videos-carousel-'+(i+1)
        });

      });

    }

    createHTML.init();

  };

  $.coursetour.defaults = {
    holes: 18,
    videos: {},
    imagesPath: 'images/coursetour'
  };

  $.fn.coursetour = function(options) {
    new $.coursetour(this, options);
  };

})(jQuery);
