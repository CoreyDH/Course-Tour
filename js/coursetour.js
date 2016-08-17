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

				this.createWrapper();
				this.createNav();
				this.createCarousel();

				var mediaPromise, infoPromise;

				if (this.options.media) {
					mediaPromise = this.getImages().done(function() {
						createHTML.createMedia();
						createHTML.createSliders();
						console.log('hit');
						initSliders();
					});
				}

				if (this.options.info) {
					infoPromise = this.getContent().done(function() {
						createHTML.createAside();
						console.log('hit');
					});
				}

				$.when(mediaPromise, infoPromise).done(function() {
					createHTML.checkColumns();
				});

				initCarousel();

			},
			checkColumns: function() {

				$media = $('.coursetour-media');
				$aside = $('.coursetour-aside');

				for (var i = 0; i < this.options.holes; i++) {

					if ((!this.options.images || !this.options.images[i]) && this.options.videos['hole' + (i + 1)] === undefined) {

						$media.eq(i).hide();
						$aside.eq(i).removeClass('col-md-4').addClass('col-md-12');

					} else if (!this.description[i] && !this.stats[i]) {
						$aside.eq(i).hide();
						$media.eq(i).removeClass('col-md-8').addClass('col-md-12');
					}
				}

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

				if (this.options.images || this.options.videos) {
					this.wrapper.find('.hole-wrapper').append('<div class="coursetour-media col-md-8"></div>');
					var $media = this.wrapper.find('.hole-wrapper > .coursetour-media');
					var vidOnly;

					for (var i = 0; i < $media.length; i++) {

						vidOnly = ''; // Add active class if there's only video

						// Nav Tabs
						$media.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div>');

						// If there are images
						if (this.options.images.length > 0 ? this.options.images[i] : this.options.images) {

							$media.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-media-images-' + (i + 1) + '" aria-controls="coursetour-media-images-' + (i + 1) + '" role="tab" data-toggle="tab">Images</a></li>');

							// Images Tabs Pane
							$media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-images" id="coursetour-media-images-' + (i + 1) + '"><div id="coursetour-images-slider-' + (i + 1) + '" class="flexslider coursetour-images-slider"><ul class="slides"></ul></div><div id="coursetour-images-carousel-' + (i + 1) + '" class="flexslider coursetour-images-carousel"><ul class="slides"></ul></div>');

						} else {

							vidOnly = 'active';

						}

						// If there are videos
						if (this.options.videos['hole' + (i + 1)] !== undefined) {

							$media.eq(i).find('.nav-tabs').append('<li role="presentation" class="' + vidOnly + '"><a href="#coursetour-media-videos-' + (i + 1) + '" aria-controls="coursetour-media-videos-' + (i + 1) + '" role="tab" data-toggle="tab">Videos</a></li>');

							// Video Tabs Pane
							$media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane ' + vidOnly + ' coursetour-videos" id="coursetour-media-videos-' + (i + 1) + '"><div id="coursetour-videos-slider-' + (i + 1) + '" class="flexslider coursetour-videos-slider"><ul class="slides"></ul></div><div id="coursetour-videos-carousel-' + (i + 1) + '" class="flexslider coursetour-videos-carousel"><ul class="slides"></ul></div>');

						}

					}

				}

			},
			createSliders: function() {

				var $imagesSlider = this.wrapper.find('.coursetour-media .coursetour-images-slider > ul');
				var $imagesCarousel = this.wrapper.find('.coursetour-media .coursetour-images-carousel > ul');
				var $videosSlider = this.wrapper.find('.coursetour-media .coursetour-videos-slider > ul');
				var $videosCarousel = this.wrapper.find('.coursetour-media .coursetour-videos-carousel > ul');
				var videoCount = 0; // Counter for Slider/Carousel arrays
				var imgCount = 0;

				for (var i = 0; i < this.options.holes; i++) {

					var images = this.images['hole' + (i + 1)];

					if (images !== undefined && images.length > 0) {
						for (var j = 0; j < images.length; j++) {
							$imagesSlider.eq(imgCount).append('<li><img src="' + this.options.imagesPath + '/hole' + (i + 1) + '/' + images[j] + '" /></li>');
							$imagesCarousel.eq(imgCount).append('<li><img src="' + this.options.imagesPath + '/hole' + (i + 1) + '/' + images[j] + '" /></li>');
						}

						imgCount++;
					}

					var videos = this.options.videos['hole' + (i + 1)];

					if (videos !== undefined && videos.length > 0) {

						for (var k = 0; k < videos.length; k++) {

							videos[k] = parse_ytLink(videos[k]);

							$videosSlider.eq(videoCount).append('<li><iframe width="100%" height="383" src="https://www.youtube.com/embed/' + videos[k] + '" frameborder="0" allowfullscreen></iframe></li>');
							$videosCarousel.eq(videoCount).append('<li><img src="https://i.ytimg.com/vi/' + videos[k] + '/hqdefault.jpg" /></li>');
						}

						videoCount++;
					}

				}

				function parse_ytLink(url) {

					var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
					var match = url.match(regExp);
					return (match && match[7].length === 11) ? match[7] : url;

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

						if (files) {
							self.images = sortImages(files);
							self.options.images = checkImages(self.images);
						} else {
							self.options.images = false;
						}

					}
				});

				function checkImages(imgObj) {

					var arr = [];

					for (var prop in imgObj) {

						arr.push(imgObj[prop].length > 0 ? true : false);

					}

					return arr;

				}

				function sortImages(files) {

					var file = files.split(',');
					var hole = [];
					var img = [];
					var obj = setHoleKeys();

					for (var i = 0; i < file.length; i++) {

						var holder = file[i].split('/');
						obj[holder[0]].push(holder[1]);

					}

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
			createAside: function() {

				this.wrapper.find('.hole-wrapper').append('<div class="coursetour-aside col-md-4"><div class="row"></div></div>');
				var $aside = this.wrapper.find('.hole-wrapper > .coursetour-aside > .row');
				var statsOnly;

				for (var i = 0; i < $aside.length; i++) {

					statsOnly = '';

					$aside.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div>');

					if (this.options.description && this.description[i]) {

						$aside.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-aside-desc-' + (i + 1) + '" aria-controls="coursetour-aside-desc-' + (i + 1) + '" role="tab" data-toggle="tab">Description</a></li>');

						// Description Tabs Pane
						$aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-desc" id="coursetour-aside-desc-' + (i + 1) + '">' + this.description[i] + '</div>');

					} else {

						statsOnly = 'active';

					}

					if (this.options.stats && this.stats[i]) {

						$aside.eq(i).find('.nav-tabs').append('<li role="presentation" class="' + statsOnly + '"><a href="#coursetour-aside-stats-' + (i + 1) + '" aria-controls="coursetour-aside-stats-' + (i + 1) + '" role="tab" data-toggle="tab">Stats</a></li>');

						// Stats Tabs Pane
						$aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane ' + statsOnly + ' coursetour-stats" id="coursetour-aside-stats-' + (i + 1) + '">' + this.stats[i] + '</div>');

					}

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
						},
						error: function() {
							console.log('Failed to get description pages');
							createHTML.options.description = false;
						}
					});

				}

				function getStats(index) {

					return $.ajax({
						url: 'collateral/coursetour-stats-' + index + '.htm',
						dataType: 'html',
						success: function(html) {
							createHTML.stats.push(html);
						},
						error: function() {
							console.log('Failed to get stats pages');
							createHTML.options.stats = false;
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

				$('#' + carouselId).flexslider({
					animation: 'slide',
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					itemWidth: 210,
					itemMargin: 5,
					asNavFor: '#' + sliderId
				});

				$('#' + sliderId).flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					sync: '#' + carouselId
				});

			});

			$('.coursetour-videos').each(function(i, el) {

				var sliderId = $(el).find('.coursetour-videos-slider').attr('id');
				var carouselId = $(el).find('.coursetour-videos-carousel').attr('id');

				$('#' + carouselId).flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					itemWidth: 210,
					itemMargin: 5,
					asNavFor: '#' + sliderId
				});

				$('#' + sliderId).flexslider({
					animation: 'slide',
					useCSS: false,
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					sync: '#' + carouselId
				});

			});

		}

		createHTML.init();

	};

	// Course Tour Defaults
	$.coursetour.defaults = {
		holes: 18,
		info: true,
		media: true,
		videos: false,
		images: true,
		description: true,
		stats: true,
		imagesPath: 'images/coursetour'
	};

	$.fn.coursetour = function(options) {
		new $.coursetour(this, options);
	};

})(jQuery);
