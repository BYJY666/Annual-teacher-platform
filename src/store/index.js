import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}
const mutations = {
  BECOMESTATE(state, value) {
    state.isCheckDetails = value
  },
  PASSOBJ(state, value) {
    state.CheckDetailsObj = value
  }
}
const state = {
  isCheckDetails: false,
  CheckDetailsObj: {},
  loginName: null
}

const getters = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})