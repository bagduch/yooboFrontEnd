<template>
  <div id="welcome-page">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <div v-if="show"><p>Welcome to</p>  <img src="/images/logo.png" alt="yoobo" class="logo"></div>
    </transition>
  </div>
</template>


<script>
    export default {
        name: "WelcomePage",
        data() {
            return {show: false}
        },
        mounted() {

        }
    }
</script>


<style scoped>
  #welcome-page {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: white;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
