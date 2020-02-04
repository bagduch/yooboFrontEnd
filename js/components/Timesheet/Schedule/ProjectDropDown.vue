<template>
    <b-dropdown aria-role="menu" trap-focus>
        <a
                class="navbar-item"
                slot="trigger"
                role="button">
            <span class="dropdown-text" :class="{empty:empty}">{{defaultText}}</span>
        </a>

        <b-dropdown-item
                aria-role="menu-item"
                :focusable="false"
                custom
                paddingless>
            <div class="modal-card" style="width:500px;">
                <b-field>
                    <b-input placeholder="Search..." type="search" icon="magnify">
                    </b-input>
                </b-field>
                <b-menu>
                    <b-menu-list label="Project List">

                        <b-menu-item v-for="project in projects" v-bind:key="project.id">
                            <template slot="label" slot-scope="props">
                                {{project.name}}
                                <b-icon v-if="project.stages.length>0"
                                        class="is-pulled-left"
                                        :icon="props.expanded ? 'menu-down' : 'menu-right'">
                                </b-icon>
                            </template>
                            <b-menu-item v-if="project.stages.length>0" v-for="stage in project.stages"
                                         v-bind:key="stage.id"
                                         :label="stage.name"
                                         @click="addStage(stage.id,project.name+' - '+stage.name)"></b-menu-item>
                        </b-menu-item>
                    </b-menu-list>
                </b-menu>

            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
    export default {
        name: "ProjectDropDown",
        props: ['projects'],
        data() {
            return {
                isActive: true,
                isOpen: 0,
                defaultText: "+ Search Project",
                empty: true
            }
        },
        methods: {
            addStage(id, text) {
                this.$emit('add-stage', id)
            }
        }

    }

</script>

<style>

    .entries-container .menu-list li ul {
        border-left: none;
        margin: 0px 0px 0px 30px;
        padding-left: 0.75em;
    }

    .entries-container .menu-list a {
        background: none;
        color: #2A3B5A;
    }

    .entries-container .modal-card {
        background: #ededef;
    }

    .entries-container .dropdown-content {
        background: #ededef;
        padding: 10px;
    }

</style>
<style scoped>
    .menu-label {
        letter-spacing: inherit;
        text-transform: initial;
        font-size: inherit;
    }

    .menu-list li {
        text-align: left;
    }

    .dropdown-text {
        color: black;
    }

    .empty {
        color: #d1d3d4;
    }

    .menu-list {
        background: white;
        border-radius: 5px;
    }

    .menu-list a {
        background: none;
    }
</style>
