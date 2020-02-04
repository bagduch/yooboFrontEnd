<template>
  <div>
    <title-bar :title-stack="['Dashboard', 'Team Members']"/>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Team Members"
                      icon="account-multiple">

        <new-team-modal v-on:save-client="save" v-on:show="show" v-on:cancel="cancel" ref="newteam"
                        :isModalActive="isModalActive"></new-team-modal>
        <div v-if="members.length>0">
          <view-table v-if="view=='table'" :clients="members" :is-loading="isLoading" :per-page="perPage"
                      :paginated="paginated"
                      :striped="true"
                      :hoverable="true"
          ></view-table>
          <view-grid v-else :data="members"></view-grid>
        </div>
        <nothing-here v-else></nothing-here>
      </card-component>


    </section>
  </div>

</template>

<script>
    import CardComponent from '@/components/CardComponent'
    import ModalBox from '@/components/ModalBox'
    import TitleBar from '@/components/TitleBar'
    import HeroBar from '@/components/HeroBar'
    import CardToolbar from '@/components/CardToolbar'
    import ModalTrashBox from '@/components/ModalTrashBox'
    import NewClientModal from '@/components/Client/NewClientModal'
    import ViewTable from '@/components/Client/ViewTable'
    import ViewGrid from '@/components/Team/ViewGrid'
    import NothingHere from "../../components/NothingHere";
    import NewTeamModal from "../../components/Team/NewTeamModal";


    export default {
        name: "TeamIndex",
        components: {
            NewTeamModal,
            NothingHere,
            ModalTrashBox,
            CardToolbar,
            HeroBar,
            TitleBar,
            ModalBox,
            CardComponent,
            NewClientModal,
            ViewTable,
            ViewGrid
        },
        data() {
            return {
                view: 'grid',
                isModalActive: false,
                trashObject: null,
                members: [],
                isLoading: false,
                paginated: false,
                perPage: 10,
                checkedRows: []
            }
        },
        mounted() {
            this.$watch(
                "$refs.newclient.data",
                (value) => {
                    if (value.id !== undefined)
                        this.members.push(value);
                }
            );
        },
        computed: {

            trashSubject() {
                if (this.trashObject) {
                    return this.trashObject.name
                }

                if (this.checkedRows.length) {
                    return `${this.checkedRows.length} entries`
                }

                return null
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.isLoading = true
                axios
                    .get('/api/team')
                    .then(r => {
                        this.isLoading = false
                        if (r.data && r.data.data) {
                            if (r.data.data.length > this.perPage) {
                                this.paginated = true
                            }
                            this.members = r.data.data
                        }
                    })
                    .catch(err => {
                        this.isLoading = false
                        this.$buefy.toast.open({
                            message: `Error: ${err.message}`,
                            type: 'is-danger',
                            queue: false
                        })
                    })
            },
            show() {
                this.isModalActive = true
            },
            cancel() {
                this.isModalActive = false
            },
            save(data) {
                this.isFetching = true;
                axios.post('/api/team', data).then(r => {
                    this.isLoading = false
                    this.members.push(r.data.data);
                    this.isFetching = false;
                    this.isModalActive = false
                }).catch(err => {
                    this.isLoading = false
                    this.$buefy.toast.open({
                        message: `Error: ${err.message}`,
                        type: 'is-danger',
                        queue: false
                    })
                })

            },


            delete() {

            },

        }
    }
</script>
