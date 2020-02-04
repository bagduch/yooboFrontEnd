<template>
  <div class="nothing-container">
    <div class="icon-container">
      <p>
        <b-icon icon="emoticon-sad" size="is-large"/>
      </p>
      <p>Nothing's here&hellip;</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nothingHere"
  }
</script>
<style scoped>
  .nothing-container {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container {
    text-align: center;
  }
</style>
