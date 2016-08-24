(function($) {

	$.coursetour = function(el, options) {

		var tour = {
			$el: $(el),
			id: $(el).attr('id') ? $(el).attr('id') : $(el).index(),
			options: $.extend({}, $.coursetour.defaults, options)
		};

		/* YouTube API */
		var yt = {

			parseLink: function(url) {

				var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
				var match = url.match(regExp);
				return (match && match[7].length === 11) ? match[7] : url;

			},

			newVid: function(container, vid) {

				function onPlayerReady(event) {

					loader.complete();

				}

				return new YT.Player(container, {
					height: '383',
					width: '100%',
					videoId: vid,
					events: {
						onReady: onPlayerReady
					}
				});
			},

			pauseAll: function(arr) {

				if (arr !== undefined) {

					for (var i = 0; i < arr.length; i++) {

						// If video is playing
						if (arr[i].getPlayerState() === 1) {
							arr[i].pauseVideo();
						}

					}

				}

			}

		};
		/* End YouTube API */

		var loader = {

			init: function(id) {

				this.$el = $('#' + id);

				if (tour.options.loader) {
					this.$el.show();
					this.loadSpinner();
				}

			},

			loadSpinner: function() {

				this.$el.append('<div class="coursetour-loader-spinner"></div>');

				$spinner = this.$el.find('.coursetour-loader-spinner');

				var parentWidth = this.$el.width();
				var width = $spinner.width();

				// var parentHeight = this.$el.height();
				// var height = $spinner.height();

				$spinner.css({
					top: '45%',
					left: parentWidth / 2 - width / 2
				});

			},

			complete: function() {

				this.$el.fadeOut();

			}

		};

		/* construct HTML, load media & descriptions if there are any */
		var createHTML = {

			init: function() {

				this.$el = tour.$el;
				this.id = tour.id;
				this.options = tour.options;

				this.images = [];
				this.description = [];
				this.stats = [];
				this.player = [];

				this.createWrapper();
				this.createLoader();
				this.createNav();
				this.createCarousel();

				var mediaPromise, infoPromise;

				if (this.options.media) {

					if (this.options.images || this.options.videos) {
						mediaPromise = this.getImages().done(function() {

							createHTML.createMedia();
							createHTML.createSliders();

							initSliders();
						});

					} else {

						createHTML.createMedia();
						createHTML.createSliders();

						initSliders();

					}

				}

				if (this.options.info) {

					if (this.options.ajaxInfo) {

						infoPromise = this.getContentAjax().done(function() {
							createHTML.createAside();
						});

					} else {

						this.getContent();
						this.createAside();

					}

				}

				$.when(mediaPromise, infoPromise).done(function() {
					createHTML.checkColumns();

					if (!tour.options.media || !tour.options.videos) {
						loader.complete();
					}

				});

				initCarousel();

			},
			checkColumns: function() {

				$media = this.$el.find('.coursetour-media');
				$aside = this.$el.find('.coursetour-aside');

				for (var i = 0; i < this.options.holes; i++) {

					if (!this.options.media || ((!this.options.images || !this.options.images[i]) && this.options.videos['hole' + (i + 1)] === undefined)) {

						$media.eq(i).hide();
						$aside.eq(i).removeClass('col-md-4').addClass('col-md-12');

					} else if (!this.options.info || (!this.description[i] && !this.stats[i])) {

						$aside.eq(i).hide();
						$media.eq(i).removeClass('col-md-8').addClass('col-md-12');

					}
				}

			},
			createWrapper: function() {

				this.$el.append('<div class="coursetour-wrapper"></div>');
				this.wrapper = this.$el.find('.coursetour-wrapper');

			},
			createLoader: function() {

				this.wrapper.append('<div id="coursetour-' + this.id + '-loader" " class="coursetour-loader"></div>');
				loader.init('coursetour-' + this.id + '-loader');

			},
			createNav: function() {

				this.wrapper.append('<div class="coursetour-nav"></div>');

			},
			createCarousel: function() {

				this.wrapper.append('<div class="coursetour-carousel owl-carousel owl-theme"></div>');
				var $div = this.wrapper.find('.coursetour-carousel');

				for (var i = 1; i <= this.options.holes; i++) {
					$div.append('<div id="hole-' + this.id + '-' + i + '" class="hole-wrapper"><h1 class="text-center">HOLE ' + i + '</h1></div>');
				}

			},
			createMedia: function() {

				if (this.options.images || this.options.videos) {

					if(this.wrapper.find('.hole-wrapper > .coursetour-aside').length === 0) {
						this.wrapper.find('.hole-wrapper').append('<div class="coursetour-media col-xs-12 col-md-8 pull-'+this.options.mediaPos+'"></div>');
					} else {
						this.wrapper.find('.hole-wrapper > .coursetour-aside').before('<div class="coursetour-media col-xs-12 col-md-8 pull-'+this.options.mediaPos+'"></div>');
					}

					var $media = this.wrapper.find('.hole-wrapper > .coursetour-media');
					var vidOnly;

					for (var i = 0; i < $media.length; i++) {

						vidOnly = ''; // Add active class if there's only video

						// Nav Tabs
						$media.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div>');

						// If there are images
						if (this.options.images.length > 0 ? this.options.images[i] : this.options.images) {

							$media.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-' + this.id + '-media-images-' + (i + 1) + '" aria-controls="coursetour-media-images-' + (i + 1) + '" role="tab" data-toggle="tab">Images</a></li>');

							// Images Tabs Pane
							$media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-images" id="coursetour-' + this.id + '-media-images-' + (i + 1) + '"><div id="coursetour-' + this.id + '-images-slider-' + (i + 1) + '" class="flexslider coursetour-images-slider"><ul class="slides"></ul></div><div id="coursetour-' + this.id + '-images-carousel-' + (i + 1) + '" class="flexslider coursetour-images-carousel"><ul class="slides"></ul></div>');

						} else {

							vidOnly = 'active';

						}

						// If there are videos
						if (this.options.videos['hole' + (i + 1)] !== undefined) {

							$media.eq(i).find('.nav-tabs').append('<li role="presentation" class="' + vidOnly + '"><a href="#coursetour-' + this.id + '-media-videos-' + (i + 1) + '" aria-controls="coursetour-media-videos-' + (i + 1) + '" role="tab" data-toggle="tab">Videos</a></li>');

							// Video Tabs Pane
							$media.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane ' + vidOnly + ' coursetour-videos" id="coursetour-' + this.id + '-media-videos-' + (i + 1) + '"><div id="coursetour-' + this.id + '-videos-slider-' + (i + 1) + '" class="flexslider coursetour-videos-slider"><ul class="slides"></ul></div><div id="coursetour-' + this.id + '-videos-carousel-' + (i + 1) + '" class="flexslider coursetour-videos-carousel"><ul class="slides"></ul></div>');

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
				var path = getPath();


				for (var i = 0; i < this.options.holes; i++) {

					var images = this.images['hole' + (i + 1)];

					if (images !== undefined && images.length > 0) {
						for (var j = 0; j < images.length; j++) {
							$imagesSlider.eq(imgCount).append('<li><img src="' + path + '/' + this.options.imagesPath + '/hole' + (i + 1) + '/' + images[j] + '" /></li>');
							$imagesCarousel.eq(imgCount).append('<li><img src="' + path + '/' + this.options.imagesPath + '/hole' + (i + 1) + '/' + images[j] + '" /></li>');
						}

						imgCount++;
					}

					var videos = this.options.videos['hole' + (i + 1)];

					if (videos !== undefined && videos.length > 0) {

						for (var k = 0; k < videos.length; k++) {

							videos[k] = yt.parseLink(videos[k]);

							$videosSlider.eq(videoCount).append('<li><div id="yt-' + this.id + '-' + (i + 1) + '-' + k + '"></div></li>');
							$videosCarousel.eq(videoCount).append('<li><img src="https://i.ytimg.com/vi/' + videos[k] + '/hqdefault.jpg" /></li>');

							this.player.push(yt.newVid('yt-' + this.id + '-' + (i + 1) + '-' + k, videos[k]));
						}

						videoCount++;
					}

				}

				function getPath() {

					var dir = window.location.pathname.split('/');
					return (dir.length > 3 ? '/' + dir[1] + '/' + dir[2] + '/' + dir[3] : '');

				}

			},
			getImages: function() {

				var self = this;

				return $.ajax({
					type: 'GET',
					data: {
						imagesPath: tour.options.imagesPath
					},
					url: 'get_files.php',
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

						if (obj[holder[0]] !== undefined) {
							obj[holder[0]].push(holder[1]);
						}

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

				this.wrapper.find('.hole-wrapper').append('<div class="coursetour-aside col-xs-12 col-md-4 pull-'+this.options.infoPos+'"></div>');
				var $aside = this.wrapper.find('.hole-wrapper > .coursetour-aside');
				var statsOnly;

				for (var i = 0; i < $aside.length; i++) {

					statsOnly = '';

					$aside.eq(i).append('<ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div>');

					if (this.options.description && this.description[i]) {

						$aside.eq(i).find('.nav-tabs').append('<li role="presentation" class="active"><a href="#coursetour-' + this.id + '-aside-desc-' + (i + 1) + '" aria-controls="coursetour-aside-desc-' + (i + 1) + '" role="tab" data-toggle="tab">Description</a></li>');

						// Description Tabs Pane
						$aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane active coursetour-desc" id="coursetour-' + this.id + '-aside-desc-' + (i + 1) + '">' + this.description[i] + '</div>');

					} else {

						// Display tab if Description does not exist
						statsOnly = 'active';

					}

					if (this.options.stats && this.stats[i]) {

						$aside.eq(i).find('.nav-tabs').append('<li role="presentation" class="' + statsOnly + '"><a href="#coursetour-' + this.id + '-aside-stats-' + (i + 1) + '" aria-controls="coursetour-aside-stats-' + (i + 1) + '" role="tab" data-toggle="tab">Stats</a></li>');

						// Stats Tabs Pane
						$aside.eq(i).find('.tab-content').append('<div role="tabpanel" class="tab-pane ' + statsOnly + ' coursetour-stats" id="coursetour-' + this.id + '-aside-stats-' + (i + 1) + '">' + this.stats[i] + '</div>');

					}

				}

			},
			getContent: function() {

				this.stats = [];
				this.description = [];
				var $fck = $('.coursetour-fck');

				for (var i = 1; i <= this.options.holes; i++) {

					this.description.push($fck.find('.hole-desc-' + i).html());
					this.stats.push($fck.find('.hole-stats-' + i).html());

				}

			},
			getContentAjax: function() {

				var deferred = [];

				for (var i = 1; i <= this.options.holes; i++) {
					deferred.push(getDesc(i));
					deferred.push(getStats(i));
				}

				return $.when.apply($, deferred);

				function getDesc(index) {

					return $.ajax({
						url: tour.options.descriptionPath + '/fck_desc_' + index + '.htm',
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
						url: tour.options.descriptionPath + '/fck_stats_' + index + '.htm',
						dataType: 'html',
						success: function(html) {
							createHTML.stats.push(html);
						},
						error: function() {
							console.log('Failed to get stats pages', tour.options.descriptionPath);
							createHTML.options.stats = false;
						}
					});

				}

			}

		};
		/* End createHTML */

		// Carousel
		function initCarousel() {

			// Setup Carousel
			var owl = tour.$el.find(".coursetour-carousel");
			var holeWrap = tour.$el.find('.hole-wrapper h1');
			var navWrap = tour.$el.find('.coursetour-nav');

			owl.owlCarousel({
				items: 1,
				margin: 30,
				smartSpeed: 450,
				nav: true,
				navElement: 'span',
				navText: ['', ''],
				navContainer: holeWrap,
				dotsContainer: navWrap
			});

			// Add classes to prev and next buttons, hide start and end
			tour.$el.find('.owl-prev').addClass('glyphicon glyphicon-chevron-left pull-left').first().hide();
			tour.$el.find('.owl-next').addClass('glyphicon glyphicon-chevron-right pull-right').last().hide();

			// Add Hole # to dots
			tour.$el.find('.owl-dot').each(function(i, el) {
				$span = $(el).find('span');
				$span.append(i + 1);
			});

			// Listener for slider complete change
			owl.on('changed.owl.carousel', function() {

				// Pause any playing if there are any
				yt.pauseAll(createHTML.player);

			});

		}

		/* Sliders & jQuery Listeners */
		function initSliders() {

			// Fix sizing on tab open
			tour.$el.find('.coursetour-media .nav-tabs a').each(function(i, el) {

				$(el).on('click', function(event) {
					event.preventDefault();
					$(el).tab('show');
					$('.coursetour-wrapper .flexslider').resize();
				});

			});

			// Flexslider
			tour.$el.find('.coursetour-images').each(function(i, el) {

				var sliderId = $(el).find('.coursetour-images-slider').attr('id');
				var carouselId = $(el).find('.coursetour-images-carousel').attr('id');

				$('#' + carouselId).flexslider({
					animation: 'slide',
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					itemWidth: 210,
					itemMargin: 5,
					prevText: '',
					nextText: '',
					asNavFor: '#' + sliderId
				});

				$('#' + sliderId).flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					prevText: '',
					nextText: '',
					sync: '#' + carouselId
				});

			});

			tour.$el.find('.coursetour-videos').each(function(i, el) {

				var sliderId = $(el).find('.coursetour-videos-slider').attr('id');
				var carouselId = $(el).find('.coursetour-videos-carousel').attr('id');

				$('#' + carouselId).flexslider({
					animation: "slide",
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					itemWidth: 210,
					itemMargin: 5,
					prevText: '',
					nextText: '',
					asNavFor: '#' + sliderId
				});

				$('#' + sliderId).flexslider({
					animation: 'slide',
					useCSS: false,
					controlNav: false,
					animationLoop: false,
					slideshow: false,
					prevText: '',
					nextText: '',
					sync: '#' + carouselId
				});

			});

			$(tour.$el).find('.coursetour-videos-carousel').on('click', function() {
				yt.pauseAll(createHTML.player);
			});

			$(tour.$el).find('.coursetour-videos-slider').on('click', '.flex-nav-prev', function() {
				yt.pauseAll(createHTML.player);
			});

			$(tour.$el).find('.coursetour-videos-slider').on('click', '.flex-nav-next', function() {
				yt.pauseAll(createHTML.player);
			});

			// Bootstrap
			$(tour.$el).find('.nav-tabs a').on('click', function() {
				// Pause any playing if there are any
				yt.pauseAll(createHTML.player);
			});

		}
		/* End initSliders */

		// Build HTML
		createHTML.init();

	};

	// Course Tour Defaults
	$.coursetour.defaults = {
		holes: 18, // # of holes
		info: true, // aside panel, holds description & stats
		infoPos: 'right', // info panel position
		media: true, // media panel, holds images & video slideshows
		mediaPos: 'left', // media panel position
		videos: false, // videos, can be set to object with an array of youtube videos. ex. { hole1: ['youtube link here'] }
		images: true, // displays images
		description: true, // displays descriptions
		descriptionPath: '.', // description directory
		stats: true, // displays stats
		imagesPath: 'images/coursetour', // path to the image folder, will read folders inside and relate to hole # in ascending order
		loader: true, // display load screen
		ajaxInfo: false // retrieve fck info with ajax
	};

	// Setting Global for Multiple coursetour on load
	var multiVideoTour = [];

	$.fn.coursetour = function(options) {

		options = options || {};

		if (options.videos !== undefined) {

			multiVideoTour.push({
				el: this,
				options: options
			});

			// Get first script tag
			var firstScriptTag = document.getElementsByTagName('script')[0];

			// If the YT api isn't loaded, load it
			if (firstScriptTag.src !== 'https://www.youtube.com/iframe_api') {

				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/iframe_api";
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			}

			// onYouTubeIframeAPIReady function executed after API loads, must be on global scope
			window.onYouTubeIframeAPIReady = function() {

				for (var i = 0; i < multiVideoTour.length; i++) {

					// Load new course tour
					new $.coursetour(multiVideoTour[i].el, multiVideoTour[i].options);

				}

			};

		} else {

			// Load new course tour
			new $.coursetour(this, options);

		}

	};

})(jQuery);
