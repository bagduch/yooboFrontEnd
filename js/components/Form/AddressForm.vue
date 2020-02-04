<template>
  <section class="section is-main-section">
    <title-bar :title-stack="titleStack"/>
    <form @submit.prevent="submit">
      <card-component :title="formCardTitle" icon="account-edit" class="tile is-child">
        <address-items ref="addressItem"></address-items>

        <div slot="footer" class="card-button">
          <b-button slot="footer" type="is-primary" :loading="isLoading" native-type="submit">Next</b-button>
        </div>
      </card-component>
    </form>
  </section>
</template>
<script>
    import {mapState} from 'vuex'
    import CardComponent from '@/components/CardComponent'
    import Notification from '@/components/Notification'
    import TitleBar from '@/components/TitleBar'
    import HeroBar from '@/components/HeroBar'
    import Tiles from '@/components/Tiles'
    import AddressItems from "./AddressItems";

    export default {
        name: 'AddressForm',
        components: {AddressItems, CardComponent, Tiles, HeroBar, TitleBar, Notification},
        data() {
            return {
                isLoading: false,
                form: this.getClearFormObject(),
            }
        },
        computed: {
            ...mapState([
                'userFirstName',
                'profileVerified',
                'userAddress'
            ]),
            titleStack() {
                return [
                    'Step 1',
                    'Update Profile'
                ]
            },
            formCardTitle() {
                if (!this.profileVerified) {
                    return "Update Profile"
                } else if (this.isProfileExists) {
                    return 'Edit Staff'
                } else {
                    return 'Add Address'
                }
            },
        },
        methods: {
            getClearFormObject() {
                return {
                    number: null,
                    address: null,
                    suburb: null,
                    city: null,
                    post_code: null,
                    country: null
                }
            },
            submit() {
                this.isLoading = true
                this.errors = {}
                if (this.$store.state.userAddress) {
                    this.form.type = "company";
                } else {
                    this.form.type = "user";
                }
                this.form = this.$refs.addressItem.form
                axios
                    .post('/api/address', this.form)
                    .then(r => {
                        this.isLoading = false
                        this.$store.commit('user', r.data.data)
                        this.$buefy.snackbar.open({
                            message: r.data.success,
                            queue: false
                        })
                    })
                    .catch(err => {

                    });
            }
        }

    }
</script>
