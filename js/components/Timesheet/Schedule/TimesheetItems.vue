<template>
  <tbody class="entries-input-table" v-if="timeSheets">
  <tr class="body" v-for="(item,timeIndex) in timeSheets">
    <td @click="deleteItem(item.id,timeIndex)"><span>X</span></td>
    <td><span v-if="item.stage.project.clients.length>0">{{item.stage.project.clients[0].name}}</span></td>
    <td>{{item.stage.project.name}} - {{item.stage.name}}</td>
    <td v-for="(date,dateIndex) in dates" :data-index="timeIndex" :data-id="item.id" :data-time="date">
      <b-input v-if="timeItems.length>0" @click.native="showForm" @keyup.native="showForm"
               v-model="timeItems[timeIndex].value[dateIndex]"
               placeholder="hours"
               v-cleave="masks.numeral">
      </b-input>
    </td>
    <td>{{ sumItem(timeIndex) }}</td>
  </tr>
  </tbody>
</template>


<script>
  import Cleave from 'cleave.js'

  const cleave = {
    name: 'cleave',
    bind(el, binding) {
      const input = el.querySelector('input')
      input._vCleave = new Cleave(input, binding.value)
    },
    unbind(el) {
      const input = el.querySelector('input')
      input._vCleave.destroy()
    }
  }
  export default {
    directives: {cleave},
    name: 'TimeSheetItems',
    props: ['timeSheets', 'dates'],
    data() {
      return {
        loaded: false,
        item: {
          id: null,
          date: null,
          value: null,
          index: null
        },
        timeItems: [],
        lineSum: null,
        masks: {
          numeral: {
            numeral: true,
            numeralPositiveOnly: true
          },
        }
      }
    },
    computed: {


      getItem() {
        return 10
      }
    },

    watch: {
      timeSheets(value) {
        for (var t = 0; t < value.length; t++) {
          this.timeItems.push({value: []});
          for (var i = 0; i < this.dates.length; i++) {
            let item = value[t].items.find(({date}) => date === this.dates[i]);
            if (typeof item !== "undefined") {
              this.timeItems[t].value.push(item.value)
            } else {
              this.timeItems[t].value.push("")
            }
          }
        }
        this.loaded = true
      },
    },
    created() {
    },
    methods: {
      deleteItem(id, index) {
        this.$buefy.dialog.confirm({
          title: 'Deleting Entries',
          message: 'Are you to delete the Entries?',
          onConfirm: () => this.$emit('delete-item', id, index)
        })

      },
      sumItem(index) {
        var number = 0;
        if (typeof this.timeItems[index] !== "undefined") {
          this.timeItems[index].value.forEach(function (item) {
            if (item !== "") {
              number += parseFloat(item)
            }
          });
        }
        return number == 0 ? "" : number
      },
      showForm(e) {
        this.item.id = e.target.parentElement.parentElement.dataset.id
        this.item.index = e.target.parentElement.parentElement.dataset.index
        this.item.date = e.target.parentElement.parentElement.dataset.time
        this.item.value = e.target.value
        this.$emit('show-form', this.item);
      },
    }
    ,

  }
</script>

<style>
  .entries-input-table input {
    border: none;
    text-align: center;
  }
</style>
