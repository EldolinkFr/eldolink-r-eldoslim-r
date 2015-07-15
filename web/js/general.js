(function( $ ) {

	/**
	 *  jQuery minimum version computing
	 *  Version 1.6 - $.promise
	 *  Version 1.4.3 - $.type
	 *  Version 1.2.7 - $.scrollTop
	 *  Version 1.2.3 - $.removeData
	 *  Version 1.2 - $.inArray
	 * 	Version 1.0 - $.trim | $.width | $.height | $.fn.jquery | $.extend | $.each | $.ajax | $.find | $.html | $.trigger
	**/

	var debug = false;
	var trace = true;

	var version = 1.0;
	var baseUrl = 'dev.tools.eldolink.com/app_dev.php';
	var contentPath = 'api/tools/';
	var analyticPath = 'api/analytics/';
	var containerClass = 'lDo';
	var appName = "EldoLink";
	var pluginName = "eldolink";
	var jqueryVersion = "1.4.3";
	var availablesTypes = ["banner"];

	var affiliate = '';
	var defaultOptions = {
		force_ssl: false,
		height: 0,
		width: 0,
		id: '',
		trackers: [],
	};

	// Check jQuery existing
	if (!$) {
		// Init empty params for no broke
		$.eldolink = function() { };
		$.fn.eldolink = function() { };
		console.error(appName + ": Jquery not loaded.");
		return;
	}

	// Check version
	var version = $.fn.jquery.split('.');
	var minVersion = jqueryVersion.split('.');
	var check = [
		parseInt(version[0]) < parseInt(minVersion[0]),
		version[0] == minVersion[0] && parseInt(version[1]) < parseInt(minVersion[1]),
		version[0] == minVersion[0] && version[1] == minVersion[1] && parseInt(version[2]) < parseInt(minVersion[2])
	];
	if (check[0] || check[1] || check[2]) {
		// Init empty params for no broke
		$.eldolink = function() { };
		$.fn.eldolink = function() { };
		console.error(appName + ": Insufficient jQuery version. Use greather than " + jqueryVersion + " version.");
		return;
	}

	// Add var for head object
	var $head = $("head");
	var $window = $(window);
	var $headLastLink = $head.find("link[rel='stylesheet']:last");

	$[pluginName] = function (affiliateValue, options) {
		// Check affiliate string
		if (!affiliateValue && $.trim(affiliateValue) == '') {
			console.error(appName + ': Invalid account value');
			return;
		}
		affiliate = affiliateValue
		// Merge default options with set's options
		defaultOptions = $.extend({}, defaultOptions, options);
	};

	$.fn[pluginName] = function( type, options ) {

		var $this = $(this);

		// Check already set account value
		if (!affiliate) {
			console.error(appName + ": Begin set your affiliate id with $." + pluginName + "('MyAffiliateId')");
			return;
		}
		// If client want destory content
		if (type === 'destroy') {
			var hash = $(this).data('hash');
			if (!hash) {
				console.warn(appName + ": DOM not loaded content.");
				return;
			}
			$this.html('').promise().done(function() {
				$this.trigger('destroyed.' + pluginName);
			});
			return;
		}
		// Check type of content
		if ($.inArray(type, availablesTypes) === -1) {
			console.error(appName + ": Type " + type + " not present in availables types " + availablesTypes.join(", ") + ".");
			return;
		}

		// Override options for this selectors
		var options = $.extend({}, defaultOptions, options);
		// Each on all element's
		return this.each(function() {
			var $that = $(this);
			// Override options with datas attributes
			var params = $.extend({}, options, $that.data());
			// If dimensions not set's
			if (!params.width) {
				params.width = $that.width();
			}
			if (!params.height) {
				params.height = $that.height();
			}
			// Convert tracker string
			if ($.type(params.trackers) === 'string') {
				params.trackers = params.trackers.split(',');
			}

			// Compute url
			var protocol = params.force_ssl ? 'https:' : window.location.protocol;
			var url = protocol + '//' + baseUrl + '/' + contentPath;

			// Prepare data
			var data = {
				i: params.id,
				p: type,
				w: params.width,
				h: params.height,
				a: affiliate,
				t: params.trackers,
			};

			// Request content on server
			$.ajax({
				url: url,
				method: 'GET',
				dataType: 'JSON',
				async: true,
				data: data
			})
			.done(function(response) {
				$that.trigger('contentRequestSuccess.' + pluginName);

				// When content loaded in DOM
				$that.on('loaded.' + pluginName, function() {
					trace && console.log('loaded.' + pluginName);
					// Add class on object
					$that.addClass(containerClass);
					// Eval specific javascript
					if ('javascript' in response && response.javascript) {
						$.globalEval(response.javascript);
					}
					// Bind event trigger's
					$that.on('resize.' + pluginName, function() {
						debug && console.log('resize.' + pluginName);
						$that.trigger('check.' + pluginName);
					});
					$that.on('scroll.' + pluginName, function() {
						debug && console.log('scroll.' + pluginName);
						$that.trigger('check.' + pluginName);
					})
					// Check if content is visible
					$that.on('check.' + pluginName, function() {
						debug && console.log('check.' + pluginName);
						var viewport_top = $window.scrollTop()
						var viewport_height = $window.height()
						var viewport_bottom = viewport_top + viewport_height
						var top = $(this).offset().top
						var height = $(this).height()
						var bottom = top + height

						if (top >= viewport_top && top < viewport_bottom) {
							$(this).trigger('show.' + pluginName);
							return;
						}
						if (bottom > viewport_top && bottom <= viewport_bottom) {
							$(this).trigger('show.' + pluginName);
							return
						}
						if (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom) {
							$(this).trigger('show.' + pluginName);
							return;
						}
						$(this).trigger('hide.' + pluginName);
					});
					// Bind when content is hidden
					$that.on('hide.' + pluginName, function(event) {
						debug && console.log('hide.' + pluginName);
						// Check if content is already hidden
						var visible = $(this).data('visible');
						if (!visible) {
							return;
						}
						$(this).data('visible', false);
						$(this).trigger('hidden.' + pluginName);
					})
					// Bind when content is visible
					$that.on('show.' + pluginName, function(event) {
						debug && console.log('show.' + pluginName);
						// Check if content is already visible
						var visible = $(this).data('visible');
						if (visible) {
							return;
						}
						$(this).data('visible', true);
						$(this).trigger('shown.' + pluginName);
					});
					// When destroy content
					$that.on('destroyed.' + pluginName, function() {
						trace && console.log('destroyed.' + pluginName);
						$(this).off('.' + pluginName);
						$(this).removeData('hash');
					});
					// Bind when change visible status to show
					$that.on('shown.' + pluginName, function() {
						trace && console.log('shown.' + pluginName);
						// Compute analytics url
						var protocol = params.force_ssl ? 'https:' : window.location.protocol;
						var url = protocol + '//' + baseUrl + '/' + analyticPath;
						
						console.log($(this));
						
						// Compute data
						var data = {
							type: 'visible',
							params: $(this).data('hash'),
						};
						// Post stats
						$.ajax({
							url: url,
							method: 'POST',
							dataType: 'JSON',
							async: true,
							data: data,
						});
					});
					// Bind when content has clicked
					$that.on('click.' + pluginName, function() {
						trace && console.log('click.' + pluginName);
						// Compute analytics url
						var protocol = params.force_ssl ? 'https:' : window.location.protocol;
						var url = protocol + '//' + baseUrl + '/' + analyticPath;
						// Compute data
						var data = {
							type: 'click',
							params: $(this).data('hash'),
						};
						// Post stats
						$.ajax({
							url: url,
							method: 'POST',
							dataType: 'JSON',
							async: true,
							data: data,
						});
					});
					// Execute first check
					$that.trigger('check.' + pluginName);
				});

				// Set styles in head
				if ('styles' in response && response.styles) {
					$.each(response.styles, function(index, value) {
						var content = "<link rel='stylesheet' href='" + value + "' type='text/css' media='screen' />";
						if ($headLastLink.length) {
							$headLastLink
								.after(content)
								.promise()
									.done(function() {
										$that.trigger('stylesheetLoaded.' + pluginName);
									});
							return true;
						}
						$head
							.append(content)
							.promise()
								.done(function() {
									$that.trigger('stylesheetLoaded.' + pluginName);
								});
					});
				}

				// Set content in container
				$that
					// Set hash (identity of content) params for analytics request
					.data('hash', response.hash)
					.html(response.content)
					.promise()
						.done(function() {
							$that.trigger('loaded.' + pluginName);
						});

			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$that.trigger('contentRequestError.' + pluginName, jqXHR);
				console.error(appName + ': Error in request to server for get content');
				return;
			})
		});
	}

	$(window).on('resize', function() {
		debug && console.log('resize');
		$('.' + containerClass).trigger('resize.' + pluginName);
	});
	$(window).on('scroll', function() {
		debug && console.log('scroll');
		$('.' + containerClass).trigger('resize.' + pluginName);
	});

} (jQuery) );