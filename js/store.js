import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* User */
    id: null,
    userName: null,
    userFirstName: null,
    userLastName: null,
    userEmail: null,
    time: null,

    update: 0,
    profileVerified: null,
    userAddress: null,
    firstTime: null,
    user: null,

    userCompanies: null,

    project: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,

  },
  mutations: {
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value
    },
    time(state, payload) {
      state.time = payload
    },

    updated(state) {
      state.update++;
    },
    /* User */
    user(state, payload) {
      if (payload.first_name) {

        state.id = payload.id
        state.userName = payload.first_name + " " + payload.last_name
        state.userFirstName = payload.first_name
        state.userLastName = payload.last_name
        state.profileVerified = payload.profile_verified
        state.userCompanies = payload.companies.length > 0 ? payload.companies : 0
        state.firstTime = payload.profile_verified && payload.address_id && payload.companies.length > 0 ? 0 : 1
        state.userAddress = payload.address_id == null ? 0 : 1
      }
      if (payload.email) {
        state.userEmail = payload.email
      }

    },
    project(state, payload) {
      state.project = payload
    },


    getName(state) {
      return this.state.userFirstName;
    },

    /* Aside Mobile */
    asideMobileStateToggle(state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    }
  },
  actions: {
    updated (context) {
      context.commit('updated')
    },
    load(context) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/user')
          .then(r => {
            context.commit('user', r.data.success);
            resolve()
          })
          .catch(err => {

          })

      });
    }
  }
})
