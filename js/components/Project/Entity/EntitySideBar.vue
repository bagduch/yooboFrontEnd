<template>
  <div class="entity-side-container">
    <div class="entity-side-head">{{entity.component.name}}</div>
    <div class="entity-side-body">
      <b-field label="Assign To">
        <b-input v-model="form.assign"></b-input>
      </b-field>
      <b-field label="Initiation Date">
        <b-datepicker
          placeholder="Click to select..."
          icon="calendar-today" v-model="form.created_at">
        </b-datepicker>
      </b-field>
      <b-field label="Current Status">
        <status-select :data="form.status"></status-select>
      </b-field>
      <b-field label="Estimated date of lodgement">
        <b-datepicker
          placeholder="Click to select..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Estimated date of approval">
        <b-datepicker
          placeholder="Click to select..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
    </div>
    <div class="entity-side-footer">

      <b-button type="is-warning">Save Changes</b-button>

    </div>

  </div>

</template>

<script>
    import StatusSelect from "../../StatusSelect";

    export default {
        name: "entitySideBar",
        components: {StatusSelect},
        props: ['entity'],
        data() {
            return {
                form: {
                    assign: null,
                    created_at: null,
                    status: null,
                }
            }
        },

        created() {
            this.form.status = this.entity.status
            this.form.created_at = new Date(this.entity.created_at)
        }
    }
</script>
<style scoped>
  .entity-side-container {
    background: #efeff0;
    padding: 25px;
    height: 98%;
  }

  .entity-side-body {
    margin-top: 40px;
  }

  .entity-side-footer {
    margin-top: 50px;
    text-align: center;
  }

  .entity-side-head {
    background: #d1d3d4;
    text-align: center;
    padding: 10px 20px 10px 20px;
    font-weight: bold;
    color: #132541;
    border-radius: 5px;
  }
</style>
