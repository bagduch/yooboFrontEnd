<template>
  <div class="time-summary-container">
    <div class="time-summary-title">Time Summary</div>
    <div class="time-summary-item-container columns is-desktop">
      <div v-for="item in items" class="column time-summary-item">
        <div class="item-title">{{item.name}}</div>
        <div class="item-body">{{item.value}}</div>
      </div>
    </div>
  </div>

</template>
<script>
    export default {
        name: "TimeSummary",
        data() {
            return {
                items: {
                    today: {name: 'Hours Today', value: '0:00'},
                    yesterday: {name: 'Hours Yesterday', value: '0:00'},
                    thisWeek: {name: 'Hours This Week', value: '0:00'},
                    lastWeek: {name: 'Hours Last Week', value: '0:00'},
                    thisMonth: {name: 'Hours This Month', value: '0:00'},
                }
            }
        }

    }

</script>
<style scoped>
  .time-summary-container {
    margin-bottom: 2rem;
  }

  .time-summary-item-container {
    background: #efeff1;
    border-radius: 5px;
  }

  .time-summary-item {
    text-align: center;
    padding: 25px;
  }

  .item-title {
    color: #898484;
  }

  .time-summary-title {
    font-size: 1rem;
    font-weight: bold;
    padding: 0px 0px 10px 0px;
    color: #385075;
  }

</style>
