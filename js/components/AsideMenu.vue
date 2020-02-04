<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left is-expanded" :class="{dark:dark}">
    <aside-tools :is-main-menu="true">
      <div slot="label">
        <nav-bar-menu class="has-divider has-user-avatar">
          <div class="is-user-name">
              <span class="yoobo-dashboard-icon">
                 {{ userFirstName.substring(0,1) }}{{ userLastName!==null?userLastName.substring(0,1):"" }}
              </span>
            <span v-if="contentMenu=='main'">Dashborad</span>
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
      <div v-if="contentMenu=='main'">
        <div v-for="(menuGroup, index) in currentMenu">
          <aside-menu-list
            v-if="typeof menuGroup !== 'string'"
            :key="index"
            :dark="dark"
            @menu-click="menuClick"
            :menu="menuGroup"/>
        </div>
      </div>
      <div class="component-menu" v-else-if="contentMenu=='component'">
        <component-aside-menu></component-aside-menu>
      </div>
      <div class="file-menu" v-else-if="contentMenu=='file'">
        <file-form></file-form>
      </div>
    </div>
  </aside>
</template>

<script>
    import {mapState} from 'vuex'
    import NavBarMenu from '@/components/NavBarMenu'
    import AsideTools from '@/components/AsideTools'
    import ComponentAsideMenu from "./Project/Component/ComponentAsideMenu";
    import FileForm from "./File/FileForm";

    export default {
        name: 'AsideMenu',
        components: {FileForm, ComponentAsideMenu, AsideTools, NavBarMenu},
        props: {
            menu: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                currentMenu: [],
                dark: false,
                contentMenu: "main",
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
        watch: {
            $route: function (val) {
                if (val.name.indexOf('component') !== -1) {
                    if (val.name.indexOf('entity') !== -1) {
                        this.contentMenu = "file";
                    } else {
                        this.contentMenu = "component";
                    }
                } else {
                    this.contentMenu = "main";
                }
                if (val.name.indexOf('timesheet') !== -1) {
                    this.currentMenu[7][0].menuActive = true
                } else {
                    this.currentMenu[7][0].menuActive = false
                }
                if (val.name.indexOf('invoice') !== -1) {
                    this.currentMenu[9][0].menuActive = true
                } else {
                    this.currentMenu[9][0].menuActive = false
                }

                if (val.name.indexOf("project") !== -1) {
                    this.dark = true;
                } else {
                    this.dark = false;
                }
            }
        },
        created(){
            this.currentMenu = this.menu
        },
        mounted() {
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
