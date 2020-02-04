<style scoped>
  @import '/css/calander/index.css';

  .b-tabs {
    padding: 6vh 8vh 6vh 8vh;
  }
</style>

<template>

  <div class="schedule-container">
    <title-bar :title-stack="['Timesheet', 'Schedule']">
      <toolbar></toolbar>
    </title-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Schedule"
                      icon="account-multiple">
        <b-tabs v-model="tabIndex" type="is-boxed" @change="onTabChange">
          <b-tab-item label="Time Entries">
            <entries v-if="tabIndex==0"></entries>
          </b-tab-item>
          <b-tab-item label="Schedule">
            <schedule v-if="tabIndex==1"></schedule>
          </b-tab-item>
          <b-tab-item label="Overall Attendance">
            <attendance v-if="tabIndex==2"></attendance>
          </b-tab-item>
        </b-tabs>
      </card-component>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'

  import CardComponent from '@/components/CardComponent'
  import TitleBar from "../../components/TitleBar";
  import Entries from "../../components/Timesheet/Schedule/Entries";
  import Schedule from "../../components/Timesheet/Schedule/Schedule";
  import Attendance from "../../components/Timesheet/Schedule/Attendance";
  import Toolbar from "../../components/Timesheet/Toolbar/Toolbar";


  export default {
    components: {Toolbar, Attendance, Schedule, Entries, TitleBar, CardComponent},
    data() {
      return {
        data: null,
        tabIndex: 0,
      }
    },
    create() {

    },
    methods: {
      onTabChange(index) {
        this.tabIndex = index
      },
      onPopupOpen: function (args) {
      }
    },

  }

</script>
