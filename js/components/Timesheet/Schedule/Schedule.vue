<template>
  <ejs-schedule id="Schedule" ref="scheduleObj" :height='height' :width='width' :views='views'
                :eventSettings='eventSettings' :actionBegin="onActionBegin"
                startHour='07:00' endHour='24:00'>
    <e-resources>
      <e-resource field='type_id' title='Activity Type' name='type' :dataSource='resourceDataSource' textField='TypeTex'
                  idField='Id' colorField='OwnerColor'>
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script>
  import Vue from 'vue'
  import CardComponent from '@/components/CardComponent'
  import {
    SchedulePlugin,
    Day,
    Week,
    Month,
    Agenda,
    DragAndDrop,
    DragEventArgs,
    Resize
  } from '@syncfusion/ej2-vue-schedule'


  Vue.use(SchedulePlugin);


  let dataManager = []
  axios.get('/api/schedule').then(r => {
    for (var i = 0; i < r.data.data.length; i++) {
      let itemData = r.data.data[i]
      let item = {
        title: itemData.title,
        location: itemData.location,
        startTime: new Date(itemData.startTime),
        endTime: new Date(itemData.endTime),
        IsAllDay: false,
        StartTimezone: null,
        EndTimezone: null,
        type_id: itemData.type_id,
        note: itemData.note,
        RecurrenceRule: null,
        eventId: itemData.id,
        RecurrenceException: null,
        RecurrenceID: null,
      };
      dataManager.push(item)
    }
  })


  export default {
    components: {CardComponent},
    data() {
      return {
        eventSettings: {
          dataSource: dataManager,
          fields: {
            id: 'eventId',
            subject: {name: 'title', title: 'Activity Title'},
            location: {name: 'location', title: 'Activity Location'},
            description: {name: 'note', title: 'Notes'},
            startTime: {name: 'startTime', title: 'Start Time'},
            endTime: {name: 'endTime', title: 'End Time'}
          }
        },
        resourceDataSource: [
          {TypeTex: 'General', Id: 1, OwnerColor: '#87949f'},
          {TypeTex: 'Meeting', Id: 2, OwnerColor: '#f8a398'},
          {TypeTex: 'Appointment', Id: 3, OwnerColor: '#7499e1'},
          {TypeTex: 'Task', Id: 4, OwnerColor: '#395075'},
          {TypeTex: 'Reminder', Id: 5, OwnerColor: 'yellow'}

        ],
        height: '550',
        width: '100%',
        views: ['Day', 'Week', 'Month', 'Agenda'],
        form: {
          title: null,
          location: null,
          type_id: null,
          startTime: null,
          endTime: null,
          notes: null
        },
        params: "",
        events: [],
        requestType: "",

      }
    },
    created() {
    },

    methods: {


      onActionBegin(args) {

        this.requestType = args.requestType
        let eventData = args.data;
        let scheduleObj = this.$refs.scheduleObj.ej2Instances;
        let eventField = scheduleObj.eventFields;
        if (args.requestType === 'eventCreate') {
          this.form.title = eventData[0].title
          this.form.location = eventData[0].location
          this.form.type_id = eventData[0].type_id
          this.form.notes = eventData[0].note
          this.form.startTime = this.formatTime(eventData[0][eventField.startTime]);
          this.form.endTime = this.formatTime(eventData[0][eventField.endTime]);
          this.saveEvents();
        }
        if (args.requestType === 'eventChange') {

          this.form.id = eventData.eventId
          this.form.title = eventData.title
          this.form.location = eventData.location
          this.form.type_id = eventData.type_id
          if (eventData.note) {
            this.form.notes = eventData.note
          }
          this.form.startTime = this.formatTime(eventData.startTime);
          this.form.endTime = this.formatTime(eventData.endTime);
          this.updateEvents()
        }

      },


      saveEvents() {
        axios.post('/api/schedule', this.form).then(r => {
          this.eventSettings.dataSource[this.eventSettings.dataSource.length - 1].push({eventId: r.data.data})
        }).catch(err => {

        })
      },
      updateEvents() {
        axios.patch('/api/schedule/' + this.form.id, this.form).then(r => {
        }).catch(err => {

        })
      },
      formatTime(timeString) {
        var actTime = new Date(timeString);
        var year = actTime.getFullYear();
        var month = actTime.getMonth();
        var day = actTime.getDate();
        var hour = actTime.getHours();
        var min = actTime.getMinutes();
        var second = actTime.getSeconds();
        return Math.round(new Date(Date.UTC(year, month, day, hour, min, second)).getTime() / 1000)
      },
      onPopupOpen: function (args) {
      }
    },
    provide: {
      schedule: [Day, Week, Month, Agenda, DragAndDrop, Resize]
    }
  }

</script>
<style>

</style>
