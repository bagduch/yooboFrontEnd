<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar v-if="profileVerified">
      {{ heroTitle }}
      <router-link slot="right" to="/clients/index" class="button">
        Clients
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="account-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <template v-if="id">
              <b-field label="ID" horizontal>
                <b-input :value="id" custom-class="is-static" readonly/>
              </b-field>
              <hr>
            </template>
            <b-field label="Name" horizontal>
              <b-field message="First name">
                <b-input icon="account" placeholder="e.g. John" v-model="form.first_name" required/>
              </b-field>
              <b-field message="Last name">
                <b-input icon="account" placeholder="e.g. Doe" v-model="form.last_name" required/>
              </b-field>
            </b-field>
            <b-field label="Phone Number" message="Do not enter the leading zero" horizontal>
              <b-field>
                <p class="control">
                  <a class="button is-static">
                    +64
                  </a>
                </p>
                <b-input type="tel" placeholder="e.g. 21000000" v-model="form.phone_number" name="phone_number"
                         expanded/>
              </b-field>
            </b-field>
            <b-field label="Office Phone Number" placeholder="e.g. 21000000" message="Do not enter the leading zero"
                     horizontal>
              <b-field>
                <p class="control">
                  <a class="button is-static">
                    +64
                  </a>
                </p>
                <b-input type="tel" v-model="form.office_phone_number" name="office_phone_number" expanded/>
              </b-field>
            </b-field>
            <b-field label="Unit/Flat No." message="Your Unit/Flat No." horizontal>
              <b-input placeholder="e.g. Unit 10" v-model="form.number" name="number" />
            </b-field>
            <b-field label="Address" message="Your Address" horizontal>
              <b-input placeholder="e.g. 72 Smales Farm" v-model="form.address" name="address" required/>
            </b-field>
            <b-field label="Suburb" message="Your Subrub" horizontal>
              <b-input placeholder="e.g. Takapuna" v-model="form.suburb" name="suburb" required/>
            </b-field>
            <b-field label="City" message="Your City" horizontal>
              <b-input placeholder="e.g. Auckland" v-model="form.city" name="city" required/>
            </b-field>
            <b-field label="Post Code" message="Your Post Code" horizontal>
              <b-input placeholder="e.g. 0600" v-model="form.post_code" name="post_code" />
            </b-field>
            <b-field label="Country" message="Your Country" horizontal>
              <b-input placeholder="e.g. New Zealand" v-model="form.country" name="country" required/>
            </b-field>
            <hr>
            <b-field horizontal>
              <b-button type="is-primary" :loading="isLoading" native-type="submit">Next</b-button>
            </b-field>
          </form>
        </card-component>
        <card-component v-if="isProfileExists" title="Client Profile" icon="account" class="tile is-child">
          <b-field label="Name">
            <b-input :value="item.name" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Company">
            <b-input :value="item.company" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="City">
            <b-input :value="item.city" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Created">
            <b-input :value="item.created" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="Progress">
            <progress class="progress is-small is-primary" :value="item.progress" max="100">{{ item.progress }}
            </progress>
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import TitleBar from '@/components/TitleBar'
    import HeroBar from '@/components/HeroBar'
    import Tiles from '@/components/Tiles'
    import CardComponent from '@/components/CardComponent'
    import Notification from '@/components/Notification'

    export default {
        name: 'UserForm',
        components: {CardComponent, Tiles, HeroBar, TitleBar, Notification},
        props: {
            id: {
                default: null
            }
        },
        data() {
            return {
                isLoading: false,
                item: null,
                form: this.getClearFormObject(),
                createdReadable: null,
            }
        },
        computed: {
            ...mapState([
                'userFirstName',
                'profileVerified',

            ]),

            titleStack() {
                let lastCrumb

                if (this.isProfileExists) {
                    lastCrumb = this.form.name
                } else {
                    lastCrumb = 'New Staff'
                }

                if (this.isProfileExists) {
                    return [
                        'Admin',
                        'Staff',
                        lastCrumb
                    ]
                } else {
                    return [
                        'Step 1',
                        'Update Profile'
                    ]
                }
            },
            heroTitle() {
                if (this.isProfileExists) {
                    return this.form.name
                } else {
                    return 'Create Staff'
                }
            },
            formCardTitle() {
                if (!this.profileVerified) {
                    return "Update Profile"
                } else if (this.isProfileExists) {
                    return 'Edit Staff'
                } else {
                    return 'New Staff'
                }
            },
            isProfileExists() {
                return !!this.item
            }
        },

        mounted: function () {
        },
        created() {
            this.getData()
        },
        methods: {
            getClearFormObject() {
                return {
                    id: null,
                    last_name: null,
                    first_name: null,
                    company: null,
                    city: null
                }
            },
            getData() {
                this.form.first_name = this.$store.state.userFirstName;
            },

            submit() {

                let method = 'patch'
                let url = `/api/user`

                axios({
                    method,
                    url,
                    data: this.form
                }).then(r => {
                    this.$buefy.snackbar.open({
                        message: 'Profile Updated',
                        queue: false
                    })

                }).catch(e => {
                    this.isLoading = false

                    this.$buefy.toast.open({
                        message: `Error: ${e.message}`,
                        type: 'is-danger',
                        queue: false
                    })
                })
            }
        },
        watch: {

            id(newValue) {
                this.form = this.getClearFormObject()
                this.item = null

                if (newValue) {
                    this.getData()
                }
            }
        }
    }
</script>
