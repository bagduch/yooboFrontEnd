<template>
  <div>
    <section class="section is-main-section">
      <card-component :title="formCardTitle" icon="account-edit" class="tile is-child">
        <b-steps
          v-model="activeStep"
          :animated="isAnimated"
          :has-navigation="hasNavigation"
          :icon-prev="prevIcon"
          :icon-next="nextIcon">


          <b-step-item label="Profile" :clickable="isStepsClickable">
            <step-user-form></step-user-form>
          </b-step-item>
          <b-step-item label="Address" :clickable="isStepsClickable">
            <address-form></address-form>
          </b-step-item>
          <b-step-item label="Company" :clickable="isStepsClickable">
            <step-company-form></step-company-form>
          </b-step-item>

          <b-step-item label="Finish" :clickable="isStepsClickable" disabled>
          </b-step-item>

          <template
            v-if="customNavigation"
            slot="navigation"
            slot-scope="{previous, next}">
            <b-button
              outlined
              type="is-danger"
              icon-pack="fas"
              icon-left="backward"
              :disabled="previous.disabled"
              @click.prevent="previous.action">
              Previous
            </b-button>
            <b-button
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
              :disabled="next.disabled"
              @click.prevent="next.action">
              Next
            </b-button>
          </template>
        </b-steps>
      </card-component>
    </section>
  </div>
</template>

<script>

    import {mapState} from 'vuex'
    import StepUserForm from '@/components/User/StepUserForm'
    import StepCompanyForm from '@/components/Companies/StepCompanyForm'
    import StepBar from '@/components/Tool/StepBar'
    import AddressForm from '@/components/Form/AddressForm'
    import CardComponent from '@/components/CardComponent'

    export default {

        name: 'StepDefault',
        components: {StepUserForm, StepCompanyForm, StepBar, AddressForm,CardComponent},
        data() {
            return {
                activeStep: 0,
                showSocial: false,
                isAnimated: true,
                hasNavigation: true,
                customNavigation: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                isStepsClickable: false,
                isProfileSuccess: false
            }
        },
        computed: {
            ...mapState([
                'profileVerified',
                'userCompanies',
                'userAddress'
            ]),
            formCardTitle() {
                return 'test'
            }
        },
        created() {

        }
    }
</script>
