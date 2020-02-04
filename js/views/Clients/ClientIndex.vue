<template>
  <div>
    <title-bar :title-stack="['Dashboard', 'Clients']"/>
    <section class="section is-main-section">

      <card-component class="has-table has-mobile-sort-spaced" title="Clients"
                      icon="account-multiple">
        <new-client-modal v-on:save-client="save" v-on:show="show" v-on:cancel="cancel" ref="newclient"
                          :isModalActive="isModalActive"></new-client-modal>

        <div v-if="clients.length>0">
          <view-table v-if="view=='table'" :clients="clients" :is-loading="isLoading" :per-page="perPage"
                      :paginated="paginated"
                      :striped="true"
                      :hoverable="true"
          ></view-table>
          <view-grid v-else :data="clients"></view-grid>
        </div>
        <nothing-here v-else></nothing-here>
      </card-component>


    </section>
  </div>

</template>

<script>
  import CardComponent from '@/components/CardComponent'
  import ModalBox from '@/components/ModalBox'
  import TitleBar from '@/components/TitleBar'
  import HeroBar from '@/components/HeroBar'
  import CardToolbar from '@/components/CardToolbar'
  import ModalTrashBox from '@/components/ModalTrashBox'
  import NewClientModal from '@/components/Client/NewClientModal'
  import ViewTable from '@/components/Client/ViewTable'
  import ViewGrid from '@/components/Client/ViewGrid'
  import NothingHere from "../../components/NothingHere";


  export default {
    name: "ClientIndex",
    components: {
      NothingHere,
      ModalTrashBox,
      CardToolbar,
      HeroBar,
      TitleBar,
      ModalBox,
      CardComponent,
      NewClientModal,
      ViewTable,
      ViewGrid
    },
    data() {
      return {
        view: 'grid',
        isModalActive: false,
        trashObject: null,
        clients: [],
        isLoading: false,
        paginated: false,
        perPage: 10,
        checkedRows: []
      }
    },
    mounted() {
      this.$watch(
        "$refs.newclient.data",
        (value) => {
          if (value.id !== undefined)
            this.clients.push(value);
        }
      );
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
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.isLoading = true
        axios
          .get('/api/client')
          .then(r => {
            this.isLoading = false
            if (r.data && r.data.data) {
              if (r.data.data.length > this.perPage) {
                this.paginated = true
              }
              this.clients = r.data.data
            }
          })
          .catch(err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      },
      show() {
        this.isModalActive = true
      },
      cancel() {
        this.isModalActive = false
      },
      save(data) {
        this.isFetching = true;
        axios.post('/api/client', data).then(r => {
          this.isLoading = false
          this.clients.push(r.data.data);
          this.isFetching = false;
          this.isModalActive = false
        }).catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })

      },


      delete() {

      },

    }
  }
</script>
