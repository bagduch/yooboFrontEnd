<template>
  <div>
    <div class="grid-container">
      <div class="grid-head"></div>
      <div class="grid-body">
        <slot></slot>
      </div>
    </div>
  </div>

</template>
<script>
    export default {
        name: 'GridView',

    }
</script>


<style scoped>

  .grid-container {
    height: 70vh;
  }
</style>
