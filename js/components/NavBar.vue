<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar">
    <div class="navbar-brand">

      <router-link class="navbar-logo" :to="{ name: 'project.index'}">
        <img class="logo" src="/images/logo.png" alt="yoobo"/>
      </router-link>

      <a class="navbar-item is-hidden-desktop" @click.prevent="menuToggleMobile">
        <b-icon :icon="menuToggleMobileIcon"/>
      </a>
    </div>
  </nav>
</template>

<script>
    import {mapState} from 'vuex'
    import NavBarMenu from '@/components/NavBarMenu'
    import UserAvatar from '@/components/UserAvatar'

    export default {
        name: 'NavBar',
        components: {
            UserAvatar,
            NavBarMenu
        },
        data() {
            return {
                isMenuNavBarActive: false
            }
        },
        computed: {
            menuNavBarToggleIcon() {
                return (this.isMenuNavBarActive) ? 'close' : 'dots-vertical'
            },
            menuToggleMobileIcon() {
                return this.isAsideMobileExpanded ? 'forwardburger' : 'backburger'
            },
            ...mapState([
                'isNavBarVisible',
                'isAsideMobileExpanded',
                'userName'
            ])
        },
        methods: {
            menuToggleMobile() {
                this.$store.commit('asideMobileStateToggle')
            },
            menuNavBarToggle() {
                this.isMenuNavBarActive = (!this.isMenuNavBarActive)
            },
            logout() {
                document.getElementById('logout-form').submit()
            }
        }
    }
</script>
