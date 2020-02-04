<template>
  <div>
    <modal-trash-box :is-active="isModalActive" :trash-subject="trashSubject" @confirm="trashConfirm"
                     @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="true"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients">

      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
          <div v-if="props.row.avatar" class="image">
            <img :src="props.row.avatar" class="is-rounded">
          </div>
        </b-table-column>
        <b-table-column label="Name" field="name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Company" field="company" sortable>
          {{ props.row.company }}
        </b-table-column>
        <b-table-column label="Address" field="address" sortable>
          {{ props.row.default_address.address }}, {{ props.row.default_address.suburb }}, {{ props.row.default_address.city }}

        </b-table-column>

        <b-table-column label="Created">
          <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">

            <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small"/>
            </button>
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
  </div>

</template>
<script>
  import ModalBox from '@/components/ModalBox'
  import ModalTrashBox from '@/components/ModalTrashBox'

  export default {
    name: "ViewTable",
    props: ["clients", "perPage", "paginated", "isLoading"],
    components: { ModalBox,ModalTrashBox},
    data() {
      return {
        isModalActive: false,
        trashObject: null,
        checkedRows: []
      }
    },
    computed: {
      trashSubject() {
        if (this.trashObject) {
          return this.trashObject.name
        }

        if (this.checkedRows.length) {
          return `${this.checkedRows.length} entries`
        }

        return null
      }
    },
    methods: {
      trashModal(trashObject = null) {
        if (trashObject || this.checkedRows.length) {
          this.trashObject = trashObject
          this.isModalActive = true
        }
      },
      trashConfirm() {

      },
      trashCancel() {
        this.isModalActive = false
      }
    }


  }

</script>
