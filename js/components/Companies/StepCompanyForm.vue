<template>
  <form @submit.prevent="submit">
    <card-component title="Company Basic Info" icon="account-circle">

      <b-field horizontal label="Logo">
        <file-picker @file-stored="fileStored"/>
      </b-field>
      <hr>
      <b-field horizontal label="Company Display Name" message="Required Display Name">
        <b-input v-model="form.display_name" name="display_name" required/>
      </b-field>
      <b-field horizontal label="Company Legal Name" message="Required Company Legal Name">
        <b-input v-model="form.legal_name" name="legal_name" required/>
      </b-field>
      <b-field horizontal label="Company E-mail" message="Required* Company Email">
        <b-input v-model="form.email" name="email" type="email" required/>
      </b-field>
      <b-field horizontal label="Company Website" message="Optional* website">
        <b-input v-model="form.website" name="website"/>
      </b-field>
      <b-field horizontal label="Company Contact Phone" message="Required* Company Contact Number">
        <b-input v-model="form.contact_phone" name="contact_phone" required/>
      </b-field>

      <hr>
      <b-field horizontal>
        <div class="control">
          <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
            Next
          </button>
        </div>
      </b-field>
    </card-component>
  </form>
</template>

<script>
    import each from 'lodash/each'
    import {mapState} from 'vuex'
    import HeroBar from '@/components/HeroBar'
    import AddressForm from '@/components/Form/AddressForm'
    import FilePicker from '@/components/FilePicker'
    import CardComponent from '@/components/CardComponent'

    export default {
        name: 'StepCompanyForm',
        components: {
            CardComponent,
            FilePicker,
            HeroBar,
            AddressForm
        },
        data() {
            return {
                isFileUploaded: false,
                isLoading: false,
                errors: {},
                form: {
                    name: null,
                    email: null,
                    file_id: null,
                }
            }
        },
        computed: {
            formNameType() {
                return this.errors.name ? 'is-danger' : null
            },
            formNameMessage() {
                return this.errors.name ? this.errors.name[0] : 'Required. Your name'
            },
            formEmailType() {
                return this.errors.email ? 'is-danger' : null
            },
            formEmailMessage() {
                return this.errors.email ? this.errors.email[0] : 'Required. Your e-mail'
            },

        },
        mounted() {

        },
        methods: {
            fileStored(file) {
                this.isFileUploaded = true
                this.form.file_id = file.id

                if (this.form.name && this.form.email) {
                    this.submit()
                }
            },
            emitIsForbidden() {
                this.$emit('is-forbidden')
            },
            submit() {
                this.isFileUploaded = false
                this.isLoading = true
                this.errors = {}
                axios
                    .post('/api/company', this.form)
                    .then(r => {
                        this.isLoading = false
                        this.$store.commit('user', r.data.data)
                        this.$router.push({name: 'home', params: {welcome: true}})

                        this.$buefy.snackbar.open({
                            message: r.data.success,
                            duration: 1000,
                            queue: false
                        })
                    })
                    .catch(err => {
                        this.isLoading = false
                        if (err.response.data.errors) {
                            this.errors = err.response.data.errors
                        } else if (err.response.status === 403) {
                            this.$emit('is-forbidden')
                            this.errors = {
                                _all: ['Forbidden with demo account']
                            }
                        } else {
                            console.error(err.response)
                            this.errors = {
                                _all: ['An error occurred']
                            }
                        }
                        each(this.errors, err => {
                            this.$buefy.toast.open({
                                message: err[0],
                                type: 'is-danger',
                                queue: false,
                                duration: 3000
                            })
                        })
                    })
            }
        },
        // watch: {
        //     userName(newValue) {
        //         this.form.name = newValue
        //     },
        //     userEmail(newValue) {
        //         this.form.email = newValue
        //     }
        // }
    }
</script>
