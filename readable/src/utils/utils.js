export const capitalize = (str = '') => {
  return typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1)
}

export const date = (timestamp) => {
  let pubDate = new Date(timestamp)
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let monthname = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let formattedDate = weekday[pubDate.getDay()] + ' ' +
      monthname[pubDate.getMonth()] + ' ' + pubDate.getDate() + ', ' +
      pubDate.getFullYear()
  return formattedDate
}

export const username = (str = '') => {
  return typeof str !== 'string' ? '' : str.substring(0, 2).toUpperCase()
}

export const uuid = () => {
  return Math.random().toString(36).substring(2) +
      (new Date()).getTime().toString(36)
}

export const sortLists = (sorting, posts) => {
  return posts.sort((a, b) => {
    if (sorting === 'new') {
      return b.timestamp - a.timestamp
    }
    if (sorting === 'hot') {
      return b.voteScore - a.voteScore
    }
  })
}