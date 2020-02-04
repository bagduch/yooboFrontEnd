<template>
  <b-field grouped>
    <b-field label="Select Client">
      <b-autocomplete
        v-model="form.client"
        field="name"
        placeholder="e.g. Anne"
        :open-on-focus="true"
        :data="filteredClientArray"
      >
      </b-autocomplete>
    </b-field>
    <b-field label="Select Product">
      <b-autocomplete
        v-model="form.project"
        field="name"
        placeholder="e.g. Anne"
        :open-on-focus="true"
        :data="filteredProjectArray"
      >
      </b-autocomplete>

    </b-field>
  </b-field>
</template>
<script>
  export default {
    name: "StageSearch",
    props: ['client', 'project'],
    data() {
      return {
        form: {
          client: null,
          project: null
        }
      }
    },
    computed: {
      filteredClientArray() {
        return this.client == null ? new Array() : this.client.filter((option) => {
          return option
        })
      },
      filteredProjectArray() {
        return this.project == null ? new Array() : this.project.filter((option) => {
          return option
        })
      }
    },
    method: {}
  }
</script>
