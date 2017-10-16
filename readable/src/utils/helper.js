export const capitalize = (str = '') => {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export const date = (timestamp) => {
  let pubDate = new Date(timestamp)
  var weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
  var monthname = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
  var formattedDate = weekday[pubDate.getDay()] + ' '
    + monthname[pubDate.getMonth()] + ' '
    + pubDate.getDate() + ', ' + pubDate.getFullYear()
  return formattedDate
}


export const username = (str = '') => {
  return typeof str !== 'string'
    ? ''
    : str.substring(0, 2).toUpperCase();
}