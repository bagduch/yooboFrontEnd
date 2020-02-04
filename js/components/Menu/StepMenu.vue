<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left is-expanded">
    <aside-tools :is-main-menu="true">
      <div slot="label">
        <nav-bar-menu class="has-divider has-user-avatar">
          <div class="is-user-name">
              <span class="yoobo-dashboard-icon">
                 {{ userFirstName?userFirstName.substring(0,1):"" }}{{ userLastName?userLastName.substring(0,1):"" }}
              </span>
          </div>
          <div slot="dropdown" class="navbar-dropdown">

            <router-link class="navbar-item" :to="{ name: 'admin.index'}">
              <b-icon icon="account" custom-size="default"></b-icon>
              <span>Admin Setting</span>
            </router-link>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Personal Settings</span>
            </a>
            <!--            <a class="navbar-item">-->
            <!--              <b-icon icon="email" custom-size="default"></b-icon>-->
            <!--              <span>Messages</span>-->
            <!--            </a>-->
            <hr class="navbar-divider">
            <a @click="logout" class="navbar-item">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
      </div>
    </aside-tools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <aside-menu-list
          v-if="typeof menuGroup !== 'string'"
          :key="index"
          @menu-click="menuClick"
          :menu="menuGroup"/>
      </template>
    </div>
  </aside>
</template>

<script>
    import {mapState} from 'vuex'
    import NavBarMenu from '@/components/NavBarMenu'
    import AsideTools from '@/components/AsideTools'

    export default {
        name: 'StepMenu',
        components: {AsideTools, NavBarMenu},
        props: {
            menu: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            ...mapState([
                'isAsideVisible',
                'userName',
                'userFirstName',
                'userLastName',
                'userEmail'
            ])
        },
        methods: {
            logout() {
                document.getElementById('logout-form').submit()
            },
            menuClick(item) {
                //
            }
        }
    }
</script>
