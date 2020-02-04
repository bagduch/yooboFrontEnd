<template>
  <div>
    <title-bar :title-stack="['Dashboard', 'Project']"/>
    <section class="section is-main-section">
      <div class="columns project">
        <div class="column is-one-fifth">
          <side-bar></side-bar>
        </div>
        <div class="column">
          <new-project-modal v-on:save-project="saveProject" v-on:hide-modal="hideModal" :isModalActive="isModalActive"
                             v-on:show-modal="showModal"></new-project-modal>
          <project-table v-on:change-page="getData" :projects="projects"></project-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import map from 'lodash/map'
    import CardComponent from '@/components/CardComponent'
    import ModalBox from '@/components/ModalBox'
    import TitleBar from '@/components/TitleBar'
    import HeroBar from '@/components/HeroBar'
    import CardToolbar from '@/components/CardToolbar'
    import ModalTrashBox from '@/components/ModalTrashBox'
    import NewProjectModal from '@/components/Project/NewProjectModal'
    import ProjectTable from "@/components/Project/ProjectTable";
    import SideBar from "@/components/Project/SideBar";

    export default {
        name: "ProjectIndex",
        components: {
            SideBar,
            ProjectTable,
            ModalTrashBox,
            CardToolbar,
            HeroBar,
            TitleBar,
            ModalBox,
            CardComponent,
            NewProjectModal
        },
        data() {
            return {
                isModalActive: false,
                trashObject: null,
                projects: [],
                isLoading: false,
                paginated: false,
                perPage: 10,
                checkedRows: [],
            }
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
            this.getData(1)
        },
        methods: {
            getData(page) {
                this.isLoading = true
                axios
                    .get('/api/project?page=' + page)
                    .then(r => {
                        this.projects = r.data.data
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
            trashModal(trashObject = null) {
                if (trashObject || this.checkedRows.length) {
                    this.trashObject = trashObject
                    this.isModalActive = true
                }
            },
            closeModal() {
                this.isModalActive = false

            },
            newProjectModel() {
                this.isModalActive = true
            },
            saveProject(data) {
                this.isLoading = true
                axios.post('/api/project', data).then(r => {
                    this.getData(1)
                    this.isLoading = false
                    this.isModalActive = false
                    this.$buefy.toast.open({
                        message: 'Project Added',
                        type: 'is-success',
                        queue: false
                    })

                }).catch(err => {
                    this.isLoading = false
                    this.isModalActive = false
                    this.$buefy.toast.open({
                        message: `Error: ${err.error}`,
                        type: 'is-danger',
                        queue: false
                    })
                });
            },
            showModal() {
                this.isModalActive = true
            },
            hideModal() {
                this.isModalActive = false
            },
            trashConfirm() {
                let url
                let method
                let data = null

                this.isModalActive = false

                if (this.trashObject) {
                    method = 'delete'
                    url = `/clients/${this.trashObject.id}/destroy`
                } else if (this.checkedRows.length) {
                    method = 'post'
                    url = '/clients/destroy'
                    data = {
                        ids: map(this.checkedRows, row => row.id)
                    }
                }

                axios({
                    method,
                    url,
                    data
                }).then(r => {
                    this.getData()

                    this.trashObject = null
                    this.checkedRows = []

                    this.$buefy.snackbar.open({
                        message: `Deleted`,
                        queue: false
                    })
                }).catch(err => {
                    this.$buefy.toast.open({
                        message: `Error: ${err.message}`,
                        type: 'is-danger',
                        queue: false
                    })
                })
            },
            trashCancel() {
                this.isModalActive = false
            }
        }
    }
</script>
