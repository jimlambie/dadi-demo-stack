var _ = require('underscore')

var Event = function (req, res, data, callback) {
  return callback(null)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
