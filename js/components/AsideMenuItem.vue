<template>
  <li>
    <component :is="componentIs" :to="itemTo" :href="itemHref" @click="menuClick" exact-active-class="is-active"
               :class="{'has-icon':!!item.icon, 'has-dropdown-icon':hasDropdown,'is-active':isDropdownActive}">
      <div class="menu-item-container">
        <span class="menu-icon-left"></span>
        <span class="menu-icon">
      <i v-if="item.icon" :class="[item.icon,dark?'dark-theme':'']"></i>
        </span>
        <!--      <b-icon v-if="item.icon" :icon="item.icon" :class="{ 'has-update-mark' : item.updateMark }" custom-size="default"  />-->
        <span class="menu-item-label" v-if="item.label" :class="{'menu-item-label':!!item.icon}">
                              <i class="mdi mdi-arrow-right" v-if="subActiveIcon"></i>

          {{ item.label }}</span>
      </div>
      <aside-menu-list
        v-if="hasDropdown"
        :menu="item.menu"
        :isSubmenuList="true"/>
    </component>

  </li>
</template>

<script>
    export default {
        name: 'AsideMenuItem',
        data() {
            return {
                isDropdownActive: false,
                subActiveIcon: false,
            }
        },
        props: {
            dark: null,
            item: {
                type: Object,
                default: null
            },
        },
        watch: {
            $route: function (val) {
                this.isDropdownActive = this.item.menuActive;

                if (val.path == this.item.to && this.item.subMenu) {
                    this.subActiveIcon = true
                } else {
                    this.subActiveIcon = false
                }
            }
        },
        methods: {
            menuClick() {
                this.$emit('menu-click', this.item)

                if (this.hasDropdown) {
                    this.isDropdownActive = (!this.isDropdownActive)
                }
            }
        },

        computed: {
            componentIs() {
                return this.item.to ? 'router-link' : 'a'
            },
            hasDropdown() {
                return !!this.item.menu
            },
            dropdownIcon() {
                return (this.isDropdownActive) ? 'minus' : 'plus'
            },
            itemTo() {
                return this.item.to ? this.item.to : null
            },
            itemHref() {
                return this.item.href ? this.item.href : null
            }
        }
    }
</script>
