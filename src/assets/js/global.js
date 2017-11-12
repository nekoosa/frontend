const commonFn = {
  j2s(obj) {
    return JSON.stringify(obj)
  },
  goBack() {
    router.go(-1)
  },
  toastMsg(obj, type, msg) {
    switch (type) {
      case 'normal':
        obj.$message(msg)
        break
      case 'success':
        obj.$message({
          message: msg,
          type: 'success',
          duration: 1500
        })
        break
      case 'warning':
        obj.$message({
          message: msg,
          type: 'warning',
          duration: 1500
        })
        break
      case 'error':
        // obj.$message.error(msg)
        // 缩短提示时间
        obj.$message({
          message: msg,
          type: 'error',
          duration: 1500
        })
        break
    }
  },
  clearVuex(cate) {
    store.dispatch(cate, [])
  },
  showJsonData(target) {
    console.log('target = ', this.j2s(target))
  },
  dealError(obj, res) {
    switch (res.code) {
      case 101:
        // 当失效时，清空cookies中的tokenKey,防止其他设备自动登录
        Cookies.remove('tokenKey')
        if (Cookies.get('rememberPwd')) {
          let data = {
            rememberKey: Lockr.get('rememberKey')
          }
          this.reAjax('base/relogin', data).then((res) => {
            if (res.code == 200) {
              this.resetCommonData(obj, res.data)
            } else {
              this.toastMsg(obj, 'error', res.error)
            }
          })
        } else {
          this.toastMsg(obj, 'error', res.error)
          setTimeout(() => {
            router.replace('/')
          }, 1500)
        }
        break
      case 103:
        this.toastMsg(obj, 'error', res.error)
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        break
      default :
        this.toastMsg(obj, 'error', res.error)
    }
  },
  catchError(obj, func, msg) {
    try {
      func()
    } catch (e) {
      console.error('error in compoment: ' + obj.componentName)
      console.error(e)
      if (!msg) {
        msg = '系统异常，请联系开发人员进行修复'
      }
      this.toastMsg(obj, 'error', msg)
      return true
    }
    return false
  },
  dataTypeError(obj, duck, data, msg) {
    return this.catchError(obj, () => {
      let result = duck.errors(data)
      if (result != false) {
        console.error(result)
        throw new Error('数据类型不正确！')
      }
    }, msg)
  },
  getHasRule(val) {
    const moduleRule = 'admin'
    let userInfo = Lockr.get('userInfo')
    if (userInfo.id == 1) {
      return true
    } else {
      let authList = moduleRule + Lockr.get('authList')
      return _.includes(authList, val)
    }
  },
  reAjax(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
        alert('连接超时，请检查网络连接')
      })
    })
  },
  resetCommonData(obj, data) {
    _(data.menusList).forEach((res, key) => {
      if (key == 0) {
        res.selected = true
      } else {
        res.selected = false
      }
    })
    Lockr.set('menus', data.menusList)              // 菜单数据
    Lockr.set('menusThreeList', data.menusThreeList)// 三级菜单数据
    Lockr.set('rememberKey', data.rememberKey)      // 记住密码的加密字符串
    Lockr.set('authList', data.authList)            // 权限节点列表
    Lockr.set('userInfo', data.userInfo)            // 用户信息
    Lockr.set('token', data.token)                  // 接口认证凭证
    var base64 = window.btoa((new Date()).getTime())
    var token = Lockr.get('token') + '%' + base64
    window.axios.defaults.headers.token = token
    // 记住token，不改密码7天可自动登录
    Cookies.set('tokenKey', Lockr.get('token'), { expires: 7 })
    let routerUrl = this.getExistMenuUrl(data.menusList)
    if (routerUrl) {
      setTimeout(() => {
        let path = obj.$route.path.slice(1)
        if (routerUrl != path) {
          router.replace(routerUrl)
        } else {
          location.reload()
        }
      }, 1000)
    } else {
      _g.toastMsg(obj, 'error', '系统菜单出错')
    }
  },
  getExistMenuUrl(arr) {
    let routerUrl = null
    _(arr).forEach((item) => {
      if (!item.child && item.url) {
        routerUrl = item.url
        store.dispatch('showLeftMenu', true)
        return false
      } else if (item.child && item.child.length) {
        routerUrl = this.getExistMenuUrl(item.child)
        if (routerUrl) {
          store.dispatch('showLeftMenu', false)
          return false
        }
      }
    })
    return routerUrl
  },
  reloadPage(obj) {
    let toParams = {
      name: obj.$route.name,
      params: obj.$route.params,
      query: obj.$route.query
    }
    router.replace({ name: 'reload', params: toParams })
  },
  updateMenus() {
    store.dispatch('updateMenusList')
  },
  parseFormula(value) { // 解析时间公式
    if (value) {
      let valueTrim = value.trim().replace(/\s/g, '') // 去空格
      let formulaArr = valueTrim.split('&')
      let result = moment(new Date())
      _(formulaArr).forEach((formula) => {
        let hasPlus = formula.indexOf('+') > -1
        let hasMinus = formula.indexOf('-') > -1
        let unit = ''
        if (formula.indexOf('Y') > -1) { // 年
          unit = 'years'
        } else if (formula.indexOf('M') > -1) { // 月
          unit = 'months'
        } else if (formula.indexOf('D') > -1) { // 日
          unit = 'days'
        } else if (formula.indexOf('h') > -1) { // 时
          unit = 'hours'
        } else if (formula.indexOf('m') > -1) { // 分
          unit = 'minutes'
        } else if (formula.indexOf('s') > -1) { // 秒
          unit = 'seconds'
        }
        if (unit) {
          let splitResult = ''
          let number = 0
          let times = 1
          if (hasPlus) {
            splitResult = formula.split('+')
            times = 1
          } else if (hasMinus) {
            splitResult = formula.split('-')
            times = -1
          }
          if (hasPlus || hasMinus) {
            _(splitResult).forEach((res) => { // 遍历切割的数组，把数字减掉
              if ((/^[0-9\.]+$/g).test(res)) {
                number += parseFloat(res) * times
              }
            })
          }
          result.add(number, unit)
        }
      })
      return new Date(result)
    } else {
      return ''
    }
  },
  updateHttpHeader() { // 更新http头部信息
    let headerObject = {}
    // 给当前token加上当前时间，base解析
    let base64 = window.btoa((new Date()).getTime())
    let token = Lockr.get('token') + '%' + base64
    // 组成对象数据返回
    headerObject.token = token
    return headerObject
  },
  isRealEmpty(value) { // 判断是否真的为空
    // value为以下值时返回true：undefined,null,'',空数组,空对象
    return value === '' ||
           _.isUndefined(value) ||
           _.isNull(value) ||
           ((_.isArray(value) || _.isObject(value)) && _.isEmpty(value))
  },
  moveUpOrDown(arr, index, index2) { // 上移 下移
    let tempArr = arr
    // 第三个参数 向数组添加的新项目
    tempArr[index] = tempArr.splice(index2, 1, tempArr[index])[0]
    return tempArr
  }
}

export default commonFn
