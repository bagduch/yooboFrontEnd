<template>
  <div>
    <customer-modal-box :icon="icon" :title="title" :is-active="isModalActive" v-on:cancel="cancel"
                        v-on:confirm="update">
      <h3>Profiles</h3>
      <b-field message="Name">
        <b-input placeholder="e.g. John Smith" v-model="form.name" required/>
      </b-field>
      <b-field message="Company">
        <b-input placeholder="e.g. Yoobo" v-model="form.company" name="company"/>
      </b-field>
      <h3>Contact Details</h3>
      <b-field message="Email">
        <b-input placeholder="e.g. admin@yoobo.co.nz" v-model="form.email" required type="email"/>
      </b-field>
      <b-field message="Contact Number">
        <b-input placeholder="e.g. 0212222222" v-model="form.phone" required type="phone"/>
      </b-field>
      <address-items :data="item.default_address" ref="addressForm"></address-items>
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
        name: 'EditStaffModal',
        components: {Tiles, CardComponent, Notification, CustomerModalBox, CardToolbar, AddressItems},
        props: ['item','isModalActive'],
        data() {
            return {
                activeTab: 0,
                main: true,
                title: 'Edit Client',
                form: this.getClearFormObject(),
                data: [],
                clientsList: '',
                onFuc: true,
                selectedList: [],
                isFetching: false,
                icon: 'yoobo-icon client'
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                })
            }
        },
        created() {
            this.getClearFormObject();
        },
        methods: {
            getClearFormObject() {
                return {
                    id: this.item.id,
                    name: this.item.name,
                    email: this.item.email,
                    phone: this.item.phone,
                    company: this.item.company,
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
            update() {
                this.isLoading = true
                this.form.address= this.$refs.addressForm.form;
                this.$emit('update-client', this.item.id, this.form);

            }
        }

    }
</script>
