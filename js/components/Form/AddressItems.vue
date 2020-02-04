<template>
  <div>
    <b-field message="Address">
      <b-input placeholder="e.g. 72 Smales Farm" v-model="form.address" name="address" required/>
    </b-field>
    <b-field message="Subrub">
      <b-input placeholder="e.g. Takapuna" v-model="form.suburb" name="suburb" required/>
    </b-field>
    <b-field grouped>
      <b-field message="City">
        <b-input placeholder="e.g. Auckland" v-model="form.city" name="city" required/>
      </b-field>
      <b-field message="Post Code">
        <b-input placeholder="e.g. 0600" v-model="form.post_code" name="post_code"/>
      </b-field>
    </b-field>
    <b-field message="Country">
      <b-input placeholder="e.g. New Zealand" v-model="form.country" name="country" required/>
    </b-field>
  </div>
</template>
<script>
    import CardComponent from '@/components/CardComponent'
    import Notification from '@/components/Notification'
    import TitleBar from '@/components/TitleBar'
    import HeroBar from '@/components/HeroBar'
    import Tiles from '@/components/Tiles'

    export default {
        name: 'AddressItems',
        components: {CardComponent, Tiles, HeroBar, TitleBar, Notification},
        props: ['data'],
        data() {
            return {
                isLoading: false,
                form: this.getClearFormObject(),
            }
        },
        methods: {
            getClearFormObject() {
                if (typeof this.data != "undefined") {
                    return this.data;
                } else {
                    return {
                        number: null,
                        address: null,
                        suburb: null,
                        city: null,
                        post_code: null,
                        country: null
                    }
                }
            },

        }

    }

</script>

