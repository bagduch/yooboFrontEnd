<template>
  <div>
    <customer-modal-box :icon="icon" :title="title" :is-active="isModalActive" v-on:cancel="cancel" :auto-width="true"
                        v-on:confirm="update">
      <b-field message="Clients">
        <b-autocomplete
          :open-on-focus="onFuc"
          v-model="clientsList"
          field="name"
          :data="filteredDataArray"
          placeholder="search client"
          :loading="isFetching"
          @select="setSelected">
          <template slot="header">
            <a @click="addClients">
              <span> Add new... </span>
            </a>
          </template>
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </b-field>
      <ul class="extra-option" v-for="(client,index) in selectedList">
        <li><span>{{client.name }} </span>
          <span @click="removeClient(index,client.id)"><b-icon
            icon="close" color="red"
            size="is-small"></b-icon>
            </span>
        </li>
      </ul>
    </customer-modal-box>
  </div>
</template>
<script>
    import AddressItems from '@/components/Form/AddressItems'
    import CardComponent from '@/components/CardComponent'
    import Notification from '@/components/Notification'
    import Tiles from '@/components/Tiles'
    import CustomerModalBox from '@/components/Modal/CustomerModalBox'
    import CardToolbar from '@/components/CardToolbar'

    export default {
        name: "AddClientModal",
        components: {Tiles, CardComponent, Notification, CustomerModalBox, CardToolbar, AddressItems},
        props: ['isModalActive'],
        data() {
            return {
                activeTab: 0,
                main: true,
                title: 'Add Client',
                data: [],
                clientsList: '',
                onFuc: true,
                selectedList: [],
                isFetching: false,
                form: {
                    clients: []
                },
                icon: 'yoobo-icon client'
            }
        },
        watch: {
            isModalActive: function (value) {
                if (value) {
                    this.getClients()
                }
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                })
            }
        },
        create() {
            this.getClients();
        },
        methods: {
            removeClient(index, id) {
                var clientIndex = this.form.clients.indexOf(id);
                this.selectedList.splice(index, 1);
                this.form.clients.splice(clientIndex, 1);
            },

            setSelected(option) {
                if (!this.form.clients.includes(option.id)) {
                    this.selectedList.push(option);
                    this.form.clients.push(option.id);
                }
                this.clientsList = '';
            },
            addClients() {
            },
            getClients() {
                this.isFetching = true;
                axios.get('/api/company/clients').then(r => {
                    this.isLoading = false
                    for (var i = 0; i < r.data.data.length; i++) {
                        let list = {
                            id: r.data.data[i].id,
                            name: r.data.data[i].first_name + " " + r.data.data[i].last_name
                        }
                        this.data.push(list)
                    }

                    this.isFetching = false;
                }).catch(err => {
                    this.isLoading = false
                    this.$buefy.toast.open({
                        message: `Error: ${err.message}`,
                        type: 'is-danger',
                        queue: false
                    })
                })

            },
            show() {
                this.$emit('show')
            },
            cancel() {
                this.$emit('cancel')
            },
            update() {
                this.isLoading = true
                this.$emit('update', this.form);

            }
        }
    }

</script>

<style scoped>
  .field {
    margin-top: 10vh;
  }
</style>
