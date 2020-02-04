<template>
  <div class="schedule-container">
    <title-bar :title-stack="['Timesheet', 'Project Stage']">
      <toolbar></toolbar>
    </title-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Project Stage"
                      icon="account-multiple">
        <div class="stage-container">
          <stage-header :loaded="loaded" :is-loading="isLoading" :projects="projects" :stages="stages"
                        :clients="clients" v-on:save-stage="saveStage"></stage-header>
          <stage-body :data="allStage" :is-loading="isLoading"></stage-body>
        </div>
      </card-component>
    </section>
  </div>
</template>
<script>
  import TitleBar from "../../components/TitleBar";
  import Toolbar from "../../components/Timesheet/Toolbar/Toolbar";
  import CardComponent from "../../components/CardComponent";
  import StageHeader from "../../components/Timesheet/Stage/StageHeader";
  import StageBody from "../../components/Timesheet/Stage/StageBody";

  export default {

    name: "TimesheetStage",
    components: {StageBody, StageHeader, CardComponent, Toolbar, TitleBar},
    data() {
      return {
        stages: null,
        allStage: null,
        clients: null,
        projects: null,
        loaded: false,
        isLoading: false,
      }
    },
    created() {
      this.getAllStages()
      this.getProjects()
      this.getClients()
      this.getStages()
    },
    methods: {
      saveStage(form) {
        this.isFetching = true;
        axios.post('/api/stage', form).then(r => {
          this.isLoading = false
          this.isFetching = false;
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      },
      getProjects() {
        this.isFetching = true;
        axios.get('/api/project').then(r => {
          this.isLoading = false
          this.projects = r.data.data.data;
          this.loaded = true
          this.isFetching = false;
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })

      },
      getClients() {
        this.isFetching = true;
        axios.get('/api/company/clients').then(r => {
          this.loaded = true
          this.isLoading = false
          this.clients = r.data.data;
          this.isFetching = false;
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })

      },
      getStages() {
        axios.get('/api/stage', this.form).then(r => {
          this.isLoading = false
          this.stages = r.data.data;
          this.isFetching = false;
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      },
      getAllStages() {
        axios.get('/api/stage/all').then(r => {
          this.isLoading = false
          this.allStage = r.data.data;
          this.isFetching = false;
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      },
      saveStage() {
        this.isFetching = true;
        axios.post('/api/stage', this.form).then(r => {
          this.isLoading = false
          this.clients = r.data.data;
          this.isFetching = false;
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      }
    }
  }
</script>

<style>
  .stage-container {
    padding: 6vh 8vh 6vh 8vh;
  }
</style>
