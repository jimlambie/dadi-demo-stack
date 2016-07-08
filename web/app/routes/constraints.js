var url = require('url');

module.exports.nextIfReview = function (req, res, callback) {

	if (req.params && req.params.edition && (req.params.edition === 'review' || req.params.edition === 'reviews_ajax')) {
			return callback(false);
	}

	return callback(true);
};


module.exports.redirectToReview = function (req, res, callback) {

	var location;
	var pathname = url.parse(req.url).pathname;

	if (/^\/[\w\-]*\/[\w\-]*\/[\w\-]*\/?$/.test(pathname)) {
		var suffix = '/review';
		if (pathname.slice(-1) === '/') {
			suffix = 'review';
		}

		location = 'http' + '://' + req.headers.host + pathname + suffix;

		res.writeHead(301, {
			Location : location
		});

		return res.end();
	}

	return callback(true);
};

module.exports.nextIfNewsOrAdvice = function (req, res, callback) {
  var pathname = url.parse(req.url).pathname;
  // Does it have 2 parts?
  if (/^\/[\w\-]*\/[\w\-]*\/?$/.test(pathname)) {
    // Is it advice or news?
    if (!(/^\/advice\/[\w\-]*\/?$/.test(pathname)) && !(/^\/news\/[\w\-]*\/?$/.test(pathname))) {
      return callback(false);
    } else {
      return callback(true);
    }
  }
}
