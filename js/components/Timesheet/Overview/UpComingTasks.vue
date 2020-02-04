<template>
  <div class="up-coming-container">
    <div class="up-coming-title">
      Upcoming Tasks
    </div>
    <div class="columns up-coming-item-container">
      <div v-for="item in 4" class="column up-coming-item">
        <div class="up-coming-item-title">
          test
        </div>
      </div>
    </div>
  </div>

</template>
<script>
    export default {
        name: "UpComingTask",
        data() {
            return {
                items: [],
            }
        }

    }
</script>

<style scoped>

  .up-coming-item-container {
    background: #efeff1;
  }

  .up-coming-item-title {
    background: white;
  }

  .up-coming-title {
    font-size: 1rem;
    font-weight: bold;
    padding: 0px 0px 10px 0px;
    color: #385075;
  }

</style>
