<template>
  <b-table
    :loading="isLoading"
    paginated
    :per-page="projects.per_page"
    :total="projects.total"
    backend-pagination
    :selected.sync="selected"
    :hoverable="true"
    default-sort="id"
    @select="openProject"
    @dblclick="enterProject"
    @page-change="onPageChange"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    :data="projects.data">
    <template slot-scope="props">
      <b-table-column label="No." field="id" sortable>
        {{ props.row.id }}
      </b-table-column>
      <b-table-column label="Ref." field="reference" sortable>
        {{ props.row.reference }}
      </b-table-column>
      <b-table-column label="Name" field="name" sortable>
        {{ props.row.name }}
      </b-table-column>
      <b-table-column label="Client" field="clients" sortable>
        {{ props.row.clients.length>0?props.row.clients[0].name:'' }} {{ props.row.clients.length>0 &&
        props.row.clients[0].company!==''? "("+props.row.clients[0].company+")":"" }}
      </b-table-column>
      <b-table-column class="is-progress-col" label="Progress" field="progress" sortable>
        <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress
          }}
        </progress>
      </b-table-column>
      <b-table-column label="Created" field="created_at" sortable>
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created_at }}</small>
      </b-table-column>
      <b-table-column custom-key="actions" class="is-actions-cell">
        <div class="buttons is-right">

          <b-icon icon="dots-horizontal" size="is-small"/>
        </div>
      </b-table-column>
    </template>

    <section class="section" slot="empty">
      <div class="content has-text-grey has-text-centered">
        <template v-if="isLoading">
          <p>
            <b-icon icon="dots-horizontal" size="is-large"/>
          </p>
          <p>Fetching data...</p>
        </template>
        <template v-else>
          <p>
            <b-icon icon="emoticon-sad" size="is-large"/>
          </p>
          <p>Nothing's here&hellip;</p>
        </template>
      </div>
    </section>
  </b-table>
</template>
<script>
  import CardComponent from '@/components/CardComponent'
  import ModalBox from '@/components/ModalBox'
  import TitleBar from '@/components/TitleBar'
  import HeroBar from '@/components/HeroBar'
  import CardToolbar from '@/components/CardToolbar'
  import ModalTrashBox from '@/components/ModalTrashBox'
  import NewProjectModal from '@/components/Project/NewProjectModal'

  export default {
    name: "ProjectTable",
    components: {ModalTrashBox, CardToolbar, HeroBar, TitleBar, ModalBox, CardComponent, NewProjectModal},
    props: ['projects', 'paginated', 'isLoading'],
    data() {
      return {
        perPage: 0,
        total: 0,
        page: 2,
        selected: this.projects[0],
      }
    },
    methods: {
      onPageChange(page) {
        this.$emit('change-page', page);
      },
      enterProject(data) {
        this.$router.push({name: 'component.index', params: {id: data.id}})
      },
      openProject(data, oldData) {
        // this.$router.push({name: 'component.view', params: {id: data.id}})
      }


    },

    mounted() {
      this.total = this.projects.total

      this.perPage = this.projects.per_page
    },
    created() {
      this.selected = this.projects[0]
    }
  }
</script>
