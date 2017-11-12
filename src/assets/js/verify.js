const verify = {
  isNumber(value) {
    return !value || (/^[0-9\.]+$/g).test(value)
  },
  isEnglish(value) {
    return !value || (/^.[A-Za-z]+$/g).test(value)
  },
  isPhone(value) {
    return !value || (/^1(3|4|5|7|8)\d{9}$/).test(value)
  },
  isEngAndNum(value) {
    return !value || (/^[A-Za-z0-9\_]+$/g).test(value)
  },
  isChinese(value) {
    return !value || (/[\u4e00-\u9fa5]/).test(value)
  },
  isDecimal(value) {
    return !value || (/\d+\.\d+$/).test(value)
  },
  isIdCard(value) {
    let vcity = {
      11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古',
      21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏',
      33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南',
      42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆',
      51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃',
      63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
    }
    let isCardNo = (value) => {  // 检查号码是否符合规范，包括长度，类型
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/
      return value == '' || reg.test(value)
    }
    let checkProvice = (value) => {
      // 取身份证前两位,校验省份
      let provice = value.substr(0, 2)
      return vcity[provice] != undefined
    }
    let checkBirthday = (value) => {
      let len = value.length
      // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
      if (len == 15) {
        let regFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
        let arrData = value.match(regFifteen)
        if (arrData) {
          let year = arrData[2]
          let month = arrData[3]
          let day = arrData[4]
          let birthday = new Date(`19${year}-${month}-${day}`)
          return verifyBirthday(`19${year}`, month, day, birthday)
        }
      }
      // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
      if (len == 18) {
        let regEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
        let arrData = value.match(regEighteen)
        if (arrData) {
          let year = arrData[2]
          let month = arrData[3]
          let day = arrData[4]
          let birthday = new Date(`${year}-${month}-${day}`)
          return verifyBirthday(year, month, day, birthday)
        }
      }
      return false
    }
    let verifyBirthday = (year, month, day, birthday) => { // 校验日期
      let now = new Date()
      var nowYear = now.getFullYear()
      if (birthday.getFullYear() == year &&
         (birthday.getMonth() + 1) == month &&
          birthday.getDate() == day) { // 检查年月日是否合理
        let time = nowYear - year
        // 判断年份的范围（3岁到100岁之间)
        return time >= 3 && time <= 100
      }
      return false
    }
    let checkParity = (value) => { // 15位转18位
      let card = changeFivteenToEighteen(value)
      let len = card.length
      if (len == '18') {
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let cardTemp = 0
        for (let i = 0; i < 17; i++) {
          cardTemp += card.substr(i, 1) * arrInt[i]
        }
        let valnum = arrCh[cardTemp % 11]
        return valnum == card.substr(17, 1)
      }
      return false
    }
    let changeFivteenToEighteen = (value) => { // 15位转18位身份证号
      if (value.length == '15') {
        let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        let cardTemp = 0
        value = value.substr(0, 6) + '19' + value.substr(6, value.length - 6)
        for (let i = 0; i < 17; i++) {
          cardTemp += value.substr(i, 1) * arrInt[i]
        }
        value += arrCh[cardTemp % 11]
        return value
      }
      return value
    }
    return isCardNo(value) && checkProvice(value) && checkBirthday(value) && checkParity(value)
  },
  /**
   * @params
   * size(Number): 文件限制大小
   * unitCode(Number): 文件单位代码，10: KB, 20: MB
   * fileSize(Number): 当前文件大小(KB)
   */
  checkFileSize(size, unitCode, fileSize) {
    let maxSize = 0
    let mul = 1024 * (unitCode == 10 ? 1 : 1024)  // 10：KB，20：MB
    maxSize = ~~size * mul
    if (fileSize <= maxSize) {
      return true
    }
    return false
  },
  /**
   * @params
   * type(String): 当前文件类型
   * limit(Array): 文件限制可上传类型
   */
  checkFileType(type, limit) {
    let typeArr = [
      ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff'],
      ['rar', 'zip', '7z'],
      ['doc', 'docx'],
      ['xls', 'xlsx', 'csv'],
      ['ppt', 'pptx'],
      ['pdf']
    ]
    let isCheck = false
    _(limit).forEach((item) => {
      _(typeArr[~~(item / 10) - 1 ]).forEach((res) => {
        if (type.indexOf(res) > -1) {
          isCheck = true
          return
        }
      })
      if (isCheck) {
        return
      }
    })
    return isCheck
  }
}

export default verify
