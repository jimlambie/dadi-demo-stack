var path = require('path')
var url = require('url')
var moment = require('moment')
var _ = require('underscore')

var config = require('@dadi/web').Config

var Event = function (req, res, data, callback) {

  data.host = req.headers.host
  data.params = url.parse(req.url, true).query

  _.extend(data.params, req.params)

  data.pathname = ''

  if (url.parse(req.url, true).pathname.length) {
    data.pathname = url.parse(req.url, true).pathname
  }

  data.pathNoPage = data.pathname.replace(/\/[0-9]+\/?$/, '').replace(/\/$/, '')

  data.timestamp = new Date().getTime()

  callback(null)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
