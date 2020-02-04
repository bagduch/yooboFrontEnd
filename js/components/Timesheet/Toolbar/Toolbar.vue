<template>
  <div class="toolbar-container">
    <div class="time-box-outer">
      <div class="time-circle">
        <div class="time-date">{{date}}</div>
        <div class="time-month">{{month}}</div>
      </div>
      <div class="time-box">
        <span id="clock">{{time}}</span><span id="seconds">:{{second}}</span>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "toolbar",
        data() {
            return {
                time: new Date().toLocaleTimeString('default', {
                    hourCycle: "h24",
                    hour: '2-digit',
                    minute: "2-digit",

                }),
                second: new Date().toLocaleTimeString('default', {second: "2-digit"}),
                month: new Date().toLocaleString('default', {month: 'short'}),
                date: new Date().toLocaleDateString('default', {day: '2-digit'}),
            }
        },

        methods: {
            timeUpdate() {
                const self = this
                setInterval(function () {
                    self.time = new Date().toLocaleTimeString('default', {
                        hourCycle: "h24",
                        hour: '2-digit',
                        minute: "2-digit",

                    })
                    self.second = new Date().toLocaleTimeString('default', {second: "2-digit"})
                }, 1000);
            },
        },
        created() {
            this.timeUpdate()

        },
    }
</script>
<style scoped>

  .time-box-outer {
    position: absolute;
    right: 73px;
    top: 15px;
  }

  .time-month {
    font-size: 19px;
    margin-left: -2px;
  }

  .time-date {
    margin-top: -2px;
    font-size: 23px;
    line-height: 30px;
    font-weight: bold;
  }

  .time-circle {
    width: 82px;
    height: 82px;
    border: 2px #fff solid;
    position: absolute;
    border-radius: 50%;
    left: 19px;
    top: -30px;
    padding: 10px;
    background-color: #eeedef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
  }

  #clock {
    font-size: 1.3em;
    font-weight: bold;
  }

  #seconds {
    font-size: 0.85em;
  }

  .time-box {
    border-radius: 5px;
    box-shadow: 2px 2px 5px 1px #132541;
    height: 100px;
    width: 120px;
    text-align: center;
    padding: 60px 0px 0px 0px;
    font-size: 21px;
    line-height: 40px;
    background-color: #eeedef;
  }
</style>
