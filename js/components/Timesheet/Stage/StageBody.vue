<template>
  <section>
    <b-table
      :data="tableData"
      :paginated="true"
      :total="total"
      :per-page="perPage"
      ref="table"
      detailed
      :loading="isLoading"
      hoverable
      @page-change="onPageChange"
      :opened-detailed="defaultOpenedDetails"
      custom-detail-row
      detail-key="name"
      :show-detail-icon="false"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Client Name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="project" label="Project Name" sortable>
          <a @click="toggle(props.row)">
            {{ props.row.project.name }}
          </a>
        </b-table-column>
        <b-table-column field="stage" label="Project Stage" width="500" sortable>
          {{ props.row.project.stage[0].name }}
        </b-table-column>
        <b-table-column field="rate" label="Project Rate" sortable>
          $ {{ props.row.project.stage[0].value }}
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <tr v-for="(item,index) in props.row.project.stage" v-if="index>0">
          <td></td>
          <td></td>
          <td>{{ item.name }}</td>
          <td>$ {{ item.value }}</td>
        </tr>
      </template>
    </b-table>
  </section>
</template>
<script>
  export default {
    name: "StageBody",
    props: ["data"],
    watch: {
      data: function (value) {
        if (value !== null) {
          this.total = value.total
          this.perPage = value.per_page
          this.isLoading = false
          for (var i = 0; i < value.data.length; i++) {
            let projects = value.data[i].projects
            for (var k = 0; k < projects.length; k++) {
              let project = value.data[i].projects[k]
              let stages = []
              for (var z = 0; z < project.stages.length; z++) {
                stages.push(project.stages[z])
              }
              if (k == 0) {
                this.tableData.push({
                  name: value.data[i].name,
                  project: {name: project.name, rate: project.value, stage: stages}
                });
              } else {
                this.tableData.push({name: '', project: {name: project.name, rate: project.value, stage: stages}});

              }
            }
          }
        }
      }
    },
    data() {
      return {
        perPage: 0,
        total: 0,
        defaultOpenedDetails: [1],
        prviewId: null,
        empty: [],
        isLoading: true,
        test: null,
        tableData: [],
      }
    },
    methods: {
      onPageChange(page) {
      },
      toggle(row) {
        this.$refs.table.toggleDetails(row)
      }
    }
  }
</script>
<style>
  .stage-container .table-wrapper {
    min-height: 52vh;
  }

  .stage-container .modal-card-body .table-wrapper {
    min-height: auto;
  }
</style>
