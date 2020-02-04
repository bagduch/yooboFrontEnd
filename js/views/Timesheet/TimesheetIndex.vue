<template>
  <div >
    <title-bar :title-stack="['Timesheet', 'Overview']">
      <toolbar></toolbar>
    </title-bar>
    <section class="section is-main-section">
      <card-component>
        <time-summary></time-summary>
        <up-coming-task></up-coming-task>
        <chart-summary></chart-summary>
      </card-component>
    </section>
  </div>
</template>

<script>
    import CardComponent from '@/components/CardComponent'
    import Tiles from "../../components/Tiles";
    import TitleBar from "../../components/TitleBar";
    import TimeSummary from "../../components/Timesheet/Overview/TimeSummary";
    import Toolbar from "../../components/Timesheet/Toolbar/Toolbar";
    import UpComingTask from "../../components/Timesheet/Overview/UpComingTasks";
    import ChartSummary from "../../components/Timesheet/Overview/ChartSummary";

    export default {
        name: "timesheetIndex",
        components: {ChartSummary, UpComingTask, Toolbar, TimeSummary, TitleBar, Tiles, CardComponent},

        create() {

        },
        methods: {}

    }

</script>
<style scoped>
  .card {
    height: 75vh;
  }
</style>
