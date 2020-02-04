<template>
  <div>
    <div v-if="data.elementType === 'cell' ">
      <div class="e-cell-content e-template">
        <form class="e-schedule-form">
          <b-field
            label="Leave Type">
            <b-select placeholder="Select a character" v-model="form.type" expanded>
              <option v-for="option in leaveType" :value="option.value"><span></span>{{option.text}}</option>
            </b-select>
          </b-field>
          <b-field label="Leave Reason">
            <b-input maxlength="200" type="textarea" v-model="form.description"></b-input>
          </b-field>

          <input class="description e-field" type="hidden" name="Description" v-model="form.description"
                 placeholder="description">
          <input class="subject e-field" type="hidden" name="Subject" v-model="form.type" placeholder="Title">

        </form>
      </div>
    </div>
  </div>
</template>
<script>
    export default {

        data() {
            return {
                data: {},
                form: {
                    type: null,
                    description: null
                },
                leaveType: [
                    {text: 'Work Shift', value: 'Work Shift'},
                    {text: 'Sick Leave', value: 'Sick Leave'},
                    {text: 'Annual Leave', value: 'Annual Leave'},
                    {text: 'Unpaid Leave', value: 'Unpaid Leave'},
                    {text: 'Public Holiday', value: 'Public Holiday'}
                ]
            };
        },
        created() {
        }
    }
</script>
