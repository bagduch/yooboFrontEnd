<template>
  <div class="timesheet-item-form-container">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-one-quarter">
        <b-field label="Notes">
          <b-input maxlength="225" v-model="notes" type="textarea"></b-input>
        </b-field>
        <b-button class="save-button" @click="saveItem" type="is-warning">Save</b-button>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: "TimeSheetItemForm",
    props: ['note'],
    data() {
      return {
        name: 'John Silver',
        notes: null,
      }
    },
    watch: {
      note(value) {
        this.notes = value
      }
    },
    created() {
      this.notes = this.note
    },

    methods: {

      saveItem() {
        let notes = this.notes
        this.$emit("save-item", notes);
      }
    }
  }
</script>

<style scoped>
  .timesheet-item-form-container {
    position: absolute;
    width: 100%;
    bottom: 0px;
    padding: 2rem;
  }

  .save-button {
    float: right;
  }
</style>
