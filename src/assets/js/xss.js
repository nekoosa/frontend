import xss from 'xss'

 // 标签属性白名单
let attrWhiteList = ['class', 'face', 'height', 'size', 'style', 'width']
// css属性白名单
let cssWhiteList = ['background-color', 'color', 'height', 'max-width', 'line-height', 'overflow', 'overflow-x', 'overflow-y', 'text-align', 'width']
let options = {
  whiteList: {},
  css: {
    whiteList: {}
  }
}
options.whiteList.strike = []
// 为iframe添加如下属性白名单，满足富文本编辑器功能
options.whiteList.iframe = ['src', 'frameborder', 'allowfullscreen', 'width', 'height']
options.whiteList.code = ['codemark']
_(xss.whiteList).forEach((res, key) => {
  options.whiteList[key] = (res.concat(attrWhiteList))
})
_(xss.cssFilter.options.whiteList).forEach((res, key) => {
  if (_.findIndex(cssWhiteList, (item) => {
    return item == key
  }) > -1) {
    options.css.whiteList[key] = true
  } else {
    options.css.whiteList[key] = false
  }
})

let myxss = new xss.FilterXSS(options)

export default myxss
