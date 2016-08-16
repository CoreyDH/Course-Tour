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
                this.mediaCol = this.options.description ? 8 : 12;
                this.asideCol = this.options.media ? 4 : 12;

                this.createWrapper();
                this.createNav();
                this.createCarousel();

                if(this.options.media) {
                  this.getImages().done(function() {
                      createHTML.createMedia();
                      createHTML.createSliders();
                      initSliders();
                  });
                }

                if(this.options.description) {
                  this.getContent().done(function() {
                      createHTML.createAside();
                  });
                }

                initCarousel();

            },
            createWrapper: function() {

                this.$el.append('<div class="coursetour-wrapper"></div>');
                this.wrapper = this.$el.find('.coursetour-wrapper');

            },
            createNav: function() {

                this.wrapper.append('<div class="coursetour-nav"></div>');

            },
            createCarousel: function() {

                this.wrapper.append('<div class="coursetour-carousel owl-carousel owl-theme"></div>');
                var $div = this.wrapper.find('.coursetour-carousel');

                for (var i = 1; i <= this.options.holes; i++) {
                    $div.append('<div id="hole-' + i + '" class="hole-wrapper"><h1 class="text-center">HOLE ' + i + '</h1></div>');
                }

            },
            createMedia: function() {

              if(this.options.images || this.options.videos) {
                this.wrapper.find('.hole-wrapper').append('<div class="coursetour-media col-md-'+this.mediaCol+'"></div>');
                var $media = this.wrapper.find('.hole-wrapper > .coursetour-media');
                var vidOnly = this.options.images ? '' : 'active';  // Add active class if there's only video

                for (var i = 0; i < $media.length; i++) {

                    // Nav Tabs
                    $media.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div>');


                    // If there are images
                    if (this.options.images) {

                        $media.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-media-images-' + (i + 1) + '" aria-controls="coursetour-media-images-' + (i + 1) + '" role="tab" data-toggle="tab">Images</a></li>');

                        // Images Tabs Pane
                        $media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-images" id="coursetour-media-images-' + (i + 1) + '"><div id="coursetour-images-slider-' + (i + 1) + '" class="flexslider coursetour-images-slider"><ul class="slides"></ul></div><div id="coursetour-images-carousel-' + (i + 1) + '" class="flexslider coursetour-images-carousel"><ul class="slides"></ul></div>');

                    }

                    // If there are videos
                    if (this.options.videos['hole' + (i + 1)] !== undefined) {

                      $media.eq(i).find('.nav-tabs').append('<li role="presentation" class="'+vidOnly+'"><a href="#coursetour-media-videos-' + (i + 1) + '" aria-controls="coursetour-media-videos-' + (i + 1) + '" role="tab" data-toggle="tab">Videos</a></li>');

                      // Video Tabs Pane
                      $media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane '+vidOnly+' coursetour-videos" id="coursetour-media-videos-' + (i + 1) + '"><div id="coursetour-videos-slider-' + (i + 1) + '" class="flexslider coursetour-videos-slider"><ul class="slides"></ul></div><div id="coursetour-videos-carousel-' + (i + 1) + '" class="flexslider coursetour-videos-carousel"><ul class="slides"></ul></div>');

                    }

                  }

                }

            },
            createAside: function() {

                this.wrapper.find('.hole-wrapper').append('<div class="coursetour-aside col-md-'+this.asideCol+'"><div class="row"></div></div>');
                var $aside = this.wrapper.find('.hole-wrapper > .coursetour-aside > .row');

                for (var i = 0; i < $aside.length; i++) {

                    // Nav Tabs
                    $aside.eq(i).append('<ul class="nav nav-tabs" role="tablist"><li role="presentation" class="active"><a href="#coursetour-aside-desc-' + (i + 1) + '" aria-controls="coursetour-aside-desc-' + (i + 1) + '" role="tab" data-toggle="tab">Description</a></li><li role="presentation"><a href="#coursetour-aside-stats-' + (i + 1) + '" aria-controls="coursetour-aside-stats-' + (i + 1) + '" role="tab" data-toggle="tab">Stats</a></li></ul><div class="tab-content"></div>');

                    // Description Tabs Pane
                    $aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-desc" id="coursetour-aside-desc-' + (i + 1) + '">' + this.description[i] + '</div>');

                    // Stats Tabs Pane
                    $aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane coursetour-stats" id="coursetour-aside-stats-' + (i + 1) + '">' + this.stats[i] + '</div>');

                }

            },
            createSliders: function() {

                var $imagesSlider = this.wrapper.find('.coursetour-media .coursetour-images-slider > ul');
                var $imagesCarousel = this.wrapper.find('.coursetour-media .coursetour-images-carousel > ul');
                var $videosSlider = this.wrapper.find('.coursetour-media .coursetour-videos-slider > ul');
                var $videosCarousel = this.wrapper.find('.coursetour-media .coursetour-videos-carousel > ul');
                var sliderCount = 0; // Counter for Slider/Carousel arrays

                for (var i = 0; i < this.options.holes; i++) {

                    var images = this.images['hole' + (i + 1)];

                    if (images !== undefined) {
                        for (var j = 0; j < images.length; j++) {
                            $imagesSlider.eq(sliderCount).append('<li><img src="' + this.options.imagesPath + '/hole' + (i + 1) + '/' + images[j] + '" /></li>');
                            $imagesCarousel.eq(sliderCount).append('<li><img src="' + this.options.imagesPath + '/hole' + (i + 1) + '/' + images[j] + '" /></li>');
                        }
                    }

                    var videos = this.options.videos['hole' + (i + 1)];

                    if (videos !== undefined) {

                        for (var k = 0; k < videos.length; k++) {

                            videos[k] = parse_ytLink(videos[k]);

                            $videosSlider.eq(sliderCount).append('<li><iframe width="100%" height="383" src="https://www.youtube.com/embed/' + videos[k] + '" frameborder="0" allowfullscreen></iframe></li>');
                            $videosCarousel.eq(sliderCount).append('<li><img src="https://i.ytimg.com/vi/' + videos[k] + '/hqdefault.jpg" /></li>');
                        }
                    }

                    if(images !== undefined || videos !== undefined)
                      sliderCount++;

                }

                function parse_ytLink(url){
                    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    return (match&&match[7].length==11)? match[7] : url;
                }

            },
            getImages: function() {

                var self = this;

                return $.ajax({
                    type: 'GET',
                    data: {
                        imagesPath: tour.options.imagesPath
                    },
                    url: 'js/get_files.php',
                    success: function(files) {

                      if(files) {
                        self.images = sortImages(files);
                      } else {
                        self.options.images = false;
                      }

                    }
                });

                function sortImages(files) {

                    var file = files.split(',');
                    var hole = [];
                    var img = [];
                    var obj = setHoleKeys();

                    for (var i = 0; i < file.length; i++) {

                        var holder = file[i].split('/');
                        obj[holder[0]].push(holder[1]);
                        //img.push(holder[1]);

                    }

                    console.log(obj);

                    return obj;
                }

                function setHoleKeys() {

                    var obj = {};

                    for (var i = 1; i <= self.options.holes; i++) {
                        obj['hole' + i] = [];
                    }

                    return obj;
                }

            },
            getContent: function(callback) {

                var deferred = [];

                for (var i = 1; i <= this.options.holes; i++) {
                    deferred.push(getDesc(i));
                    deferred.push(getStats(i));
                }

                return $.when.apply($, deferred);

                function getDesc(index) {

                    return $.ajax({
                        url: 'collateral/coursetour-desc-' + index + '.htm',
                        dataType: 'html',
                        success: function(html) {
                            createHTML.description.push(html);
                        }
                    });
                }

                function getStats(index) {

                    return $.ajax({
                        url: 'collateral/coursetour-stats-' + index + '.htm',
                        dataType: 'html',
                        success: function(html) {
                            createHTML.stats.push(html);
                        }
                    });
                }

            }

        };
        // end createHTML

        // Carousel
        function initCarousel() {

          // Setup Carousel
          var owl = $(".coursetour-carousel");

          owl.owlCarousel({
              items: 1,
              margin: 30,
              stagePadding: 30,
              smartSpeed: 450,
              nav: true,
              navElement: 'span',
              navText: ['', ''],
              navContainer: '.hole-wrapper h1',
              dotsContainer: '.coursetour-nav'
          });

          // Add classes to prev and next buttons
          $('.owl-prev').addClass('glyphicon glyphicon-chevron-left pull-left').first().hide();
          $('.owl-next').addClass('glyphicon glyphicon-chevron-right pull-right').last().hide();

          // Add Hole # to dots
          $('.owl-dot').each(function(i, el) {
              $span = $(el).find('span');
              $span.append(i + 1);
          });

        }

        // Sliders
        function initSliders() {

            // Fix sizing on tab open
            $('.coursetour-media .nav-tabs a').each(function(i, el) {

                var $el = $(el);
                $el.on('click', function(event) {
                    event.preventDefault();
                    $el.tab('show');
                    $('.flexslider').resize();
                });

            });

            // Flexslider
            $('.coursetour-images').each(function(i, el) {

              var sliderId = $(el).find('.coursetour-images-slider').attr('id');
              var carouselId = $(el).find('.coursetour-images-carousel').attr('id');

                $('#'+carouselId).flexslider({
                    animation: 'slide',
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: 210,
                    itemMargin: 5,
                    asNavFor: '#'+sliderId
                });

                $('#'+sliderId).flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    sync: '#'+carouselId
                });

            });

            $('.coursetour-videos').each(function(i, el) {

              var sliderId = $(el).find('.coursetour-videos-slider').attr('id');
              var carouselId = $(el).find('.coursetour-videos-carousel').attr('id');

                $('#'+carouselId).flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: 210,
                    itemMargin: 5,
                    asNavFor: '#'+sliderId
                });

                $('#'+sliderId).flexslider({
                    animation: 'slide',
                    useCSS: false,
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: '#'+carouselId
                });

            });

        }

        createHTML.init();

    };

    $.coursetour.defaults = {
        holes: 18,
        description: true,
        media: true,
        videos: false,
        images: true,
        imagesPath: 'images/coursetour'
    };

    $.fn.coursetour = function(options) {
        new $.coursetour(this, options);
    };

})(jQuery);
