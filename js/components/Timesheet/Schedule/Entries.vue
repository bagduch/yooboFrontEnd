<template>
  <div class="entries-container">
    <ejs-schedule id="Entries" ref="EntriesObj" :height='height' :width='width' :readonly="true" :views='views'
                  :timeScale='timeScale'
                  :actionComplete="onActionComplete"
    >
    </ejs-schedule>
    <table v-if="loaded" class="entries-table" border="0">
      <thead>
      <tr class="header">
        <td></td>
        <td>Client</td>
        <td>Project</td>
        <td>Mon</td>
        <td>Tue</td>
        <td>Wed</td>
        <td>Thu</td>
        <td>Fri</td>
        <td>Sat</td>
        <td>Sun</td>
        <td>Project total</td>
      </tr>
      </thead>
      <timesheet-items :time-sheets="timesheet" :dates="dates" v-on:show-form="showForm"
                       v-on:delete-item="deleteItem"></timesheet-items>
      <tbody>
      <tr class="body">
        <td></td>
        <td></td>
        <td>
          <project-drop-down :projects="projects" v-on:add-stage="addStage"
          ></project-drop-down>
        </td>
        <td v-for="date in dates"></td>
        <td></td>
      </tr>
      </tbody>
    </table>
    <time-sheet-item-form v-if="showNotesForm" v-on:save-item="saveItem" :note="itemForm.notes"
    ></time-sheet-item-form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {SchedulePlugin, Week} from '@syncfusion/ej2-vue-schedule'
  import CardComponent from '@/components/CardComponent'
  import ProjectDropDown from "./ProjectDropDown";
  import TimesheetItems from "./TimesheetItems";
  import TimeSheetItemForm from "./TimesheetItemForm";

  Vue.use(SchedulePlugin);

  export default {
    components: {TimeSheetItemForm, TimesheetItems, ProjectDropDown, CardComponent},
    data() {
      return {
        height: '44',
        projects: null,
        width: '100%',
        views: ['Week'],
        timeScale: {
          enable: false,
        },
        loaded: false,
        form: {
          stage_id: null,
          period: null
        },
        itemForm: {
          id: null,
          date: null,
          value: null,
          notes: null
        },
        showNotesForm: false,
        dates: null,
        timesheet: null,

      }
    },
    created() {

    },
    watch: {
      dates() {
        this.getProjects()
        this.getTimesheet()
      }
    },
    methods: {
      onActionComplete() {
        this.getDates()
      },
      getTimesheet() {
        axios.get('/api/timesheet?period=' + this.dates[0]).then(r => {
          this.timesheet = r.data.data;
          this.loaded = true
        })

      },
      getProjects() {
        this.isFetching = true;
        axios.get('/api/project').then(r => {
          this.isLoading = false
          this.projects = r.data.data.data
          this.loaded = true
          this.isFetching = false
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
      },
      getRender(arg) {
      },
      addStage(id) {
        this.form.stage_id = id
        this.form.period = this.dates[0]
        axios.post('/api/timesheet', this.form).then(r => {
          this.timesheet.push(r.data.data)
        }).catch(err => {

        })
      },

      getDates() {
        this.dates = []
        let entriesObj = this.$refs.EntriesObj;
        let dates = entriesObj.ej2Instances.weekModule.getRenderDates()
        for (var i = 0; i < dates.length; i++) {
          let date = new Date(dates[i]);
          this.dates.push(date.toLocaleDateString('fr-CA'))
        }
      },

      showForm(value) {
        this.itemForm.id = value.id
        this.itemForm.date = value.date
        this.itemForm.value = value.value

        const result = this.timesheet[value.index].items.find(({date}) => date === value.date);
        if (typeof result !== "undefined")
          this.itemForm.notes = result.notes
        else
          this.itemForm.notes = ""
        this.showNotesForm = true
      },
      saveItem(notes) {
        this.itemForm.notes = notes
        axios.post('/api/timesheet/item', this.itemForm).then(r => {
          this.getTimesheet()
          this.$buefy.toast.open({
            message: 'Entries Added',
            type: 'is-success',
            queue: false
          })
        }).catch(err => {

        })
      },
      deleteItem(id, index) {
        axios.delete('/api/timesheet', {params: {id: id}}).then(r => {
          this.timesheet.splice(index, 1);
          this.$buefy.toast.open({
            message: 'Entries Deleted',
            type: 'is-success',
            queue: false
          })
        }).catch(err => {

        })
      }
    },
    provide: {
      schedule: [Week]
    }
  }

</script>

<style>

  .entries-container .e-table-container {
    display: none !important;
  }

  .entries-container .e-schedule {
    border: none !important;
    overflow: inherit !important;
  }

  .entries-container .entries-table {
    width: 100%;
  }

  .entries-container .header td {
    background-color: #395075;
    color: #fff;
    position: sticky;
    top: 45px;
    z-index: 10;
    border: 1px solid #dedede;
    text-align: center !important;
    vertical-align: middle;
  }

  .entries-container .header td:nth-child(1) {
    width: 3%;
  }

  .entries-container .header td:nth-child(2) {
    width: 10%;
  }

  .entries-container .entries-table .body td {
    border: 1px solid #dedede;
    height: 40px;
    text-align: center;
    vertical-align: middle;
  }

  .entries-container .header td:nth-child(3) {
    width: 25%;
  }

  .entries-container .header td:nth-child(4), .header td:nth-child(5), .header td:nth-child(6), .header td:nth-child(7), .header td:nth-child(8), .header td:nth-child(9), .header td:nth-child(10) {
    width: 6%;
  }

  .entries-container .header td:nth-child(9), .header td:nth-child(10) {
    background-color: #87949f;
  }

  .dropdown-text {
    margin: auto;
    color: #d1d3d4;
  }

  .entries-table .dropdown-trigger {
    width: 100%;
  }

  .entries-table .dropdown {
    width: 100%;
  }

  .header {
    height: 44px;
  }
</style>
