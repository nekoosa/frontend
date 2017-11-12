import httpMethod from '../assets/js/http'
let http = httpMethod.methods

const actions = {
  showLeftMenu ({ commit }, status) {
    commit('showLeftMenu', status)
  },
  setMenus({ commit }, menus) {
    commit('setMenus', menus)
  },
  setRules({ commit }, rules) {
    commit('setRules', rules)
  },
  setUsers({ commit }, users) {
    commit('setUsers', users)
  },
  setUserGroups({ commit }, userGroups) {
    commit('setUserGroups', userGroups)
  },
  setOrganizes({ commit }, organizes) {
    commit('setOrganizes', organizes)
  },
  setMenusUpdate({ commit }, menusUpdate) {
    commit('setMenusUpdate', menusUpdate)
  },
  updateMenusList({ commit }) {
    let postData = {
      params: {
        type: 1
      }
    }
    http.apiGet('admin/menus', postData).then((res) => {
      if (res.code == 200) {
        commit('updateMenusList', res.data)
        commit('setMenusUpdate', true)
      } else {
        _g.dealError(this, res)
      }
    })
  }
}

export default actions
