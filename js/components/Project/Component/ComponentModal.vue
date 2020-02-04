<style scoped>
  .modal-container {
    text-align: left;
  }

  .button {
    width: 100%;
  }

  .component-container {
    margin-top: 5vh;
  }

</style>
<template xmlns="http://www.w3.org/1999/html">
  <div class="component-container">
    <button type="button" class="button is-warning" @click="show()">
      <span>Create New Component</span>
    </button>
    <div class="modal-container">
      <customer-modal-box :confirm-label="confirmLabel" :icon="icon" :title="title" :is-active="isModalActive"
                          :is-loading="isLoading"
                          v-on:cancel="cancel"
                          v-on:confirm="save">
        <h3>Basic</h3>
        <b-field message="Component Title">
          <b-input placeholder="e.g. Contract" v-model="form.name" required/>
        </b-field>
        <b-field message="Assigned Company">
          <b-input placeholder="e.g. Yoobo" v-model="form.company" name="company"/>
        </b-field>
        <b-field label="Weight of the project">
          <b-slider v-model="form.value" :min="0" :max="100">
            <template v-for="val in [10, 20, 30,40,50,60,70,80,90]">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </b-field>
        <h3>Optional</h3>
        <b-field label="Link to client's page">
          <div class="block">
            <b-radio v-model="form.show_client" native-value="1">
              Yes
            </b-radio>
            <b-radio v-model="form.show_client" native-value="0">
              No
            </b-radio>
          </div>
        </b-field>
        <b-field label="Require lodgement/application">
          <div class="block">
            <b-radio v-model="form.lodge" native-value="1">
              Yes
            </b-radio>
            <b-radio v-model="form.lodge" native-value="0">
              No
            </b-radio>
          </div>
        </b-field>

      </customer-modal-box>
    </div>
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
        name: 'ComponentModal',
        components: {Tiles, CardComponent, Notification, CustomerModalBox, CardToolbar, AddressItems},
        props: ['isModalActive', 'isLoading', 'item'],
        data() {
            return {
                activeTab: 0,
                main: true,
                title: 'Create Component',
                form: this.getClearFormObject(),
                data: [],
                clientsList: '',
                onFuc: true,
                selectedList: [],
                confirmLabel: 'Confirm',
                isFetching: false,
                icon: 'yoobo-icon component'
            }
        },
        created() {
            this.title = this.item ? 'Create Component' : "Edit Component";
        },
        watch: {
            item: function (newVal) { // watch it
                if (newVal) {
                    this.confirmLabel = "Edit"

                    this.title = "Edit Component";
                    this.form = newVal;
                } else {
                    this.form = this.getClearFormObject();
                    this.title = "Create Component";
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
        methods: {
            getClearFormObject() {
                return {
                    name: null,
                    show_client: 1,
                    company: null,
                    lodge: 1,
                    project_id: null,
                }
            },
            removeClient(index, id) {
                this.selectedList.push(option);

            },

            setSelected(option) {
                this.selectedList.push(option);
                this.clientsList = '';
            },

            show() {
                this.$emit('show')
            },
            cancel() {
                this.$emit('cancel')
            },
            edit() {

            },
            save() {
                this.isLoading = true;
                this.form.project_id = this.$route.params.id;
                this.$emit('save-component', this.form);
            }
        }

    }
</script>
