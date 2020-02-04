<template xmlns="http://www.w3.org/1999/html">
  <div>
    <card-toolbar>
      <button slot="right" type="button" class="button is-warning" @click="show()">
        <span>New Project</span>
      </button>
    </card-toolbar>

    <customer-modal-box :icon="icon" :title="title" :is-active="isModalActive" v-on:cancel="cancel"
                        v-on:confirm="saveProject">
      <Tiles>
        <div class="tile is-child">
          <h3>Project Details</h3>
          <b-field message="Project Name">
            <b-input placeholder="e.g. Project A" v-model="form.name" required/>
          </b-field>
          <b-field message="Project Reference">
            <b-input placeholder="e.g. #01010" v-model="form.reference"/>
          </b-field>
          <b-field message="Company">
            <b-input placeholder="e.g. Yoobo" v-model="form.company" name="company"/>
          </b-field>
          <address-items ref="addressForm"></address-items>


          <b-field message="Project Description (max:250)">
            <b-input maxlength="250" type="textarea" placeholder="e.g. Legal Description/Project Description"
                     v-model="form.description"
                     required/>
          </b-field>

        </div>
        <div class="tile is-child">
          <h3>Project Client</h3>
          <b-field>
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
            <li><span>{{client.name }}</span>
              <b-icon @click="removeClient(index,client.id)"
                      icon="close" color="red"
                      size="is-small"></b-icon>
            </li>
          </ul>

        </div>
      </Tiles>
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
        name: 'NewProjectModal',
        components: {Tiles, CardComponent, Notification, CustomerModalBox, CardToolbar, AddressItems},
        props: ["project"],
        data() {
            return {
                address: null,
                activeTab: 0,
                main: true,
                isModalActive: false,
                title: 'Create Project',
                form: this.getClearFormObject(),
                data: [],
                clientsList: '',
                onFuc: true,
                selectedList: [],
                isFetching: false,
                icon: 'yoobo-icon laptop'
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                })
            }
        },
        methods: {
            getClearFormObject() {
                return {
                    id: null,
                    name: null,
                    first_name: null,
                    company: null,
                    clients: []
                }
            },
            removeClient(index, id) {
                this.selectedList.push(option);

            },

            setSelected(option) {

                this.selectedList.push(option);
                this.form.clients.push(option.id);
                this.clientsList = '';
            },
            addClients() {
            },


            getClients() {
                this.isFetching = true;
                axios.get('/api/company/clients').then(r => {
                    this.isLoading = false
                    this.data = r.data.data;
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
                this.getClients();
                this.isModalActive = true
            },
            cancel() {
                this.isModalActive = false
            },
            saveProject() {
                this.form.address = this.$refs.addressForm.form
                this.$emit('save-project', this.form);
                // this.isModalActive = false
            }
        }

    }
</script>
