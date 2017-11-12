const mutations = {
  showLeftMenu(state, status) {
    state.showLeftMenu = status
  },
  setMenus(state, menus) {
    state.menus = menus
  },
  setRules(state, rules) {
    state.rules = rules
  },
  setUsers(state, users) {
    state.users = users
  },
  setUserGroups(state, userGroups) {
    state.userGroups = userGroups
  },
  setOrganizes(state, organizes) {
    state.organizes = organizes
  },
  updateMenusList(state, data) {
    state.menusList = data.menusList
    state.menusThreeList = data.menusThreeList
  },
  setMenusUpdate(state, menusUpdate) {
    state.menusUpdate = menusUpdate
  }
}

export default mutations
