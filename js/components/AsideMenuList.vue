<template>
  <ul :class="{'menu-list':!isSubmenuList}">
    <aside-menu-item :dark="dark" v-for="(item,index) in menu"
                     @menu-click="menuClick"
                     :item="item"
                     :key="index"/>
  </ul>
</template>

<script>
    import AsideMenuItem from '@/components/AsideMenuItem'

    export default {
        name: 'AsideMenuList',
        components: {
            AsideMenuItem
        },
        props: {
            dark: null,
            isSubmenuList: {
                type: Boolean,
                default: false
            },
            menu: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            menuClick(item) {
                this.$emit('menu-click', item)
            }
        }
    }
</script>
