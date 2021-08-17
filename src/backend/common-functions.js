export default {

  getFormattedDate: function (date) {
    var dateFormat = require('dateformat')
    return dateFormat(date, 'mmm dS, yyyy')
  },

  getBetterFormattedDate: function (date) {
    var dateFormat = require('dateformat')
    return dateFormat(date, 'mmmm dd, yyyy')
  },

  getFormattedShortDate: function (date) {
    var dateFormat = require('dateformat')
    return dateFormat(date, 'dddd mmm dS')
  },

  getFormattedDateTime: function (dateTime) {
    var dateFormat = require('dateformat')
    return dateFormat(dateTime, 'mmm dS - h:MM tt')
  },

  getDateTime: function (date, time) {
    if (!time) {
      return null
    }

    date = new Date(date)

    var index = time.indexOf(':')
    var index2 = time.indexOf(' ')

    var hours = time.substring(0, index)
    var minutes = time.substring(index + 1, index2)

    var suf = time.substring(index2 + 1, time.length)

    if (suf === 'pm' && parseInt(hours) !== 12) {
      hours = parseInt(hours) + 12
    }

    if (suf === 'am' && parseInt(hours) === 12) {
      hours = 0
    }

    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds('00')

    return date
  },

  getFormattedDuration: function (start, end) {
    var elapsed = Date.parse(end) - Date.parse(start) // time in milliseconds

    var duration = new Date(elapsed)

    const portions = []

    const msInHour = 1000 * 60 * 60
    const hours = Math.trunc(duration / msInHour)
    if (hours > 0) {
      portions.push(hours + 'h')
      duration = duration - hours * msInHour
    }

    const msInMinute = 1000 * 60
    const minutes = Math.trunc(duration / msInMinute)
    if (minutes > 0) {
      portions.push(minutes + 'm')
      duration = duration - minutes * msInMinute
    }

    const seconds = Math.trunc(duration / 1000)
    if (seconds > 0) {
      portions.push(seconds + 's')
    }

    return portions.join(' ')
  },

  setError: function (error, text) {
    this.error = (error.response && error.response.data && error.response.data.error) || text
  }
}
