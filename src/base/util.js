class Util {
  constructor(){}
  normalizeDate(date) {
    let y= date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    return `${y}-${m < 10 ? "0" + m: m}-${d < 10 ? "0" + d: d}`
  }
  parseDateDesc(dateDesc) {
    let dateStr
    if(dateDesc == "today") {
      dateStr = util.normalizeDate(new Date())
    } else if (dateDesc == "yesterday") {
      dateStr = util.normalizeDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
    } else {
      dateStr = dateDesc
    }
    return dateStr
  }
  normalizeFloat(number) {
    let n, i
    i = number.toString().indexOf(".")
    if(i > -1) {
      n = number.toString().substr(0, i + 3)
      return parseFloat(n)
    } else {
      return number
    }
  }
  parseQueryString(query) {
    let obj = {}
    if(query.charAt(0) == "?") {
      query = query.substr(1)
    }
    let paramArray = query.split("&")
    let tempArray
    paramArray.forEach(function(item ,i) {
      tempArray = item.split("=")
      obj[tempArray[0]] = decodeURIComponent(tempArray[1])
    })
    return obj
  }
}

let util = new Util()

export default util
