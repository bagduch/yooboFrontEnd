<template>
  <div class="attendant-container">
    <ejs-schedule id='Schedule' ref='ScheduleObj' :height='height' :width='width'
                  :rowAutoHeight="true" :actionBegin="onActionBegin" :showWeekend="false"
                  :quickInfoTemplates='quickInfoTemplates'
                  :eventSettings='eventSettings' :group='group'>
      <e-views>
        <e-view option='TimelineMonth' :eventTemplate='timelineEventTemplate'
                :allowVirtualScrolling='virtualScroll'></e-view>
      </e-views>
      <e-resources>
        <e-resource field='OwnerId' title='Owner' name='Owners' :dataSource='ownerData'
                    textField='Text' idField='Id'>
        </e-resource>

      </e-resources>
    </ejs-schedule>
  </div>
</template>
<script>
    import Vue from 'vue';
    import {DragAndDrop, Resize, SchedulePlugin, TimelineMonth, TimelineViews} from '@syncfusion/ej2-vue-schedule';
    import AttendanceQuickInfor from "./QuickInfo/AttendanceQuickInfor";
    import timelineEvent from "./Other/timelineEvent";

    Vue.use(SchedulePlugin);

    let ownerData = [];
    let sourceData = [];
    axios.get('api/attendance').then(r => {
        for (var i = 0; i < r.data.data.length; i++) {
            sourceData.push({
                Id: r.data.data[i].id,
                Subject: r.data.data[i].type,
                StartTime: new Date(r.data.data[i].startTime),
                EndTime: new Date(r.data.data[i].endTime),
                Description: r.data.data[i].notes,
                IsAllDay: true,
                OwnerId: r.data.data[i].user_id
            });
        }
    });
    axios.get('api/team').then(r => {
        var colors = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        for (var i = 0; i < r.data.data.length; i++) {
            var n = Math.floor(Math.random() * colors.length);
            ownerData.push({
                Id: r.data.data[i].id,
                Text: r.data.data[i].first_name + " " + r.data.data[i].last_name,
            });
        }
    })

    var contentTemplateVue = Vue.component('contentTemplate', AttendanceQuickInfor);
    var timelineEventTemplateVue = Vue.component('timelineTemplate', timelineEvent);

    export default {
        data: function () {
            return {
                timelineEventTemplate: function (e) {
                    return {
                        template: timelineEventTemplateVue
                    };
                },
                editorTemplate: function (e) {
                    return {
                        template: editorTemplateVue
                    };
                },
                quickInfoTemplates: {
                    content: function (e) {
                        return {
                            template: contentTemplateVue
                        };
                    },
                },
                workDays: [1, 3, 5],
                height: '550',
                width: '100%',
                allowMultiple: true,
                virtualScroll: true,
                group: {
                    byGroupID: false,
                    resources: ['Owners']
                },
                ownerData: ownerData,
                eventSettings: {
                    dataSource: sourceData,
                },
                form: {
                    type: null,
                    notes: null,
                    isAllday: false,
                    startTime: null,
                    endTime: null

                }
            }
        },
        methods: {
            onActionBegin(args) {
                console.log(args)
                let eventData = args.data;
                if (args.requestType === 'eventCreate') {
                    this.form.type = eventData[0].Subject
                    this.form.notes = eventData[0].Description
                    this.form.IsAllDay = eventData[0].IsAllDay
                    this.form.startTime = this.formatTime(eventData[0].StartTime);
                    this.form.endTime = this.formatTime(eventData[0].EndTime);
                    this.saveEvents();
                }
                if (args.requestType === "eventChange") {
                    this.form.id = eventData[0].Id
                    this.form.type = eventData[0].Subject
                    this.form.notes = eventData[0].Description
                    this.form.IsAllDay = eventData[0].IsAllDay
                    this.form.startTime = this.formatTime(eventData[0].StartTime);
                    this.form.endTime = this.formatTime(eventData[0].EndTime);
                }

            },
            saveEvents() {
                axios.post('/api/attendance', this.form).then(r => {
                    this.eventSettings.dataSource[this.eventSettings.dataSource.length - 1].push({eventId: r.data.data})
                }).catch(err => {

                })
            },
            updateEvents() {
                axios.patch('/api/attendance', this.form).then(r => {
                    this.eventSettings.dataSource[this.eventSettings.dataSource.length - 1].push({eventId: r.data.data})
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

        },
        provide: {
            schedule: [TimelineViews, TimelineMonth, Resize, DragAndDrop]
        }
    }
</script>
<style>

  .e-schedule .template-wrap .subject {
    padding: 10px 25px;
  }

  .e-schedule .template-wrap {
    width: 100%;
  }

  .e-schedule .e-timeline-month-view .e-resource-left-td {
    width: 150px;
  }

  .attendant-container .header td {
    background-color: #395075;
  }
</style>
