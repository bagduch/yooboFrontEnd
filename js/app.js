// Axios & Echo global
require('./bootstrap');

/* Core */
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import Buefy from 'buefy'
/* Router & Store */
import router from './router'
import store from './store'
/* Vue. Main component */
import App from './App.vue'
/* Vue. Component in recursion */
import AsideMenuList from '@/components/AsideMenuList'


Vue.use(VueProgressBar, {
  color: '#132541',
  failedColor: 'red',
  height: '30px',
  thickness: "5px"
})


store.dispatch('load').then(() => {
  // ...
  /* Collapse mobile aside menu on route change */
  router.beforeEach((to, from, next) => {
    const auth = to.matched.some(record => {
      return record.meta.auth && store.state.id;
    });
    const firstTime = to.matched.some(record => {
      return record.meta.firstTime && store.state.firstTime;
    });
    if (auth) {
      if (firstTime) {
        next('/register/step');
      } else {
        next();
      }
    } else {
      next('login');
    }
  })
  router.afterEach(() => {
    store.commit('asideMobileStateToggle', false)
  })

  Vue.config.productionTip = false

  /* These components are used in recursion algorithm */
  Vue.component('AsideMenuList', AsideMenuList)

  /* Main component */
  Vue.component('App', App)

  /* Buefy */
  Vue.use(Buefy)

  /* This is main entry point */

  new Vue({
    store,
    router,
    render: h => h(App),
    mounted() {
      document.documentElement.classList.remove('has-spinner-active')
    }
  }).$mount('#app')
})
