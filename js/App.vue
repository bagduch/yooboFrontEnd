<template>
  <div id="app" v-bind:class="{fullwidth:welcome}">
    <!--    <welcome-page></welcome-page>-->
    <nav-bar/>
    <step-menu v-if="firstTime" :menu="StepMenu"></step-menu>
    <aside-menu v-else :menu="MainMenu"/>
    <router-view/>
    <!--    <footer-bar/>-->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
    // @ is an alias to /src
    import {mapState} from 'vuex'
    import NavBar from '@/components/NavBar/'
    import StepMenu from '@/components/Menu/StepMenu'
    import AsideMenu from '@/components/AsideMenu'
    import FooterBar from '@/components/FooterBar'
    import WelcomePage from '@/components/Tool/WelcomePage'


    export default {
        name: 'home',
        components: {
            StepMenu,
            FooterBar,
            AsideMenu,
            NavBar,
            WelcomePage
        },

        data() {
            return {
                id: null,
                welcome: false,
                mainMenu: true
            }
        },

        mounted() {

            this.$Progress.finish();
        },
        watch: {
            $route: function (val) {
            }
        },

        computed: {
            ...mapState([
                'userFirstName',
                'firstTime',
                'update'
            ]),

            StepMenu() {
                return [
                    'Register Company',
                    [
                        {
                            label: 'Step 1',
                            to: '/register/step/1',
                        }
                    ],
                ]
            },
            MainMenu() {
                return [
                    'Project',
                    [
                        {
                            to: '/project/index',
                            icon: 'yoobo-icon laptop',
                            label: 'Project'
                        }
                    ],
                    'Client',
                    [
                        {
                            to: '/client/index',
                            label: 'Client',
                            icon: 'yoobo-icon client',
                            updateMark: true
                        },
                    ],
                    'Team',
                    [
                        {
                            to: '/team/index',
                            label: 'Team Member',
                            icon: 'yoobo-icon team'
                        },
                    ],
                    'Timesheet',
                    [
                        {
                            to: '/timesheet/overview',
                            label: 'Timesheet',
                            icon: 'yoobo-icon timesheet',
                            menu: [
                                {
                                    to: '/timesheet/overview',
                                    label: 'Overview',
                                    subMenu: true,

                                },
                                {
                                    to: '/timesheet/schedule',
                                    label: 'Time Schedule',
                                    subMenu: true,

                                },
                                {
                                    to: '/timesheet/report',
                                    label: 'Project Report',
                                    subMenu: true,

                                },
                                {
                                    to: '/timesheet/stage',
                                    label: 'Project State',
                                    subMenu: true,
                                }

                            ]
                        },
                    ],
                    'Invoice',
                    [
                        {
                            to: '/invoice/overview',
                            label: 'Invoice',
                            icon: 'yoobo-icon invoice',
                            menu: [
                                {
                                    to: '/invoice/overview',
                                    label: 'Overview',
                                    subMenu: true,

                                },
                                {
                                    to: '/invoice/index',
                                    label: 'All Invoice',
                                    subMenu: true,

                                },
                                {
                                    to: '/invoice/new',
                                    label: 'New Invoice',
                                    subMenu: true,

                                },
                            ]
                        },
                    ],

                ]
            }
        },

        created() {
            this.$Progress.start();
        }
    }
</script>
