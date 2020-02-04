<template>
  <b-select placeholder="Select a status" expanded v-model="data">
    <option
      v-for="option in status"
      :value="option"
      :key="option">
      {{ option }}
    </option>
  </b-select>
</template>
<script>
    export default {
        name: "StatusSelect",
        props: ['data'],
        data() {
            return {
                status: ['awaiting lodgement', 'working in progress', 'completed', 'pending']
            }
        }
    }
</script>
