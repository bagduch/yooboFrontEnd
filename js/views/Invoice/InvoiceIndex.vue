<template>
  <div class="all-invoice-container">
    <title-bar :title-stack="['My Invoice', 'All Invoices']"/>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="All Invoices"
                      icon="account-multiple">
        <b-tabs v-model="tabIndex" type="is-boxed" @change="onTabChange">
          <b-tab-item label="All Invoice">
          </b-tab-item>
          <b-tab-item label="Draft">
          </b-tab-item>
          <b-tab-item label="Awaiting Payment">
          </b-tab-item>
          <b-tab-item label="Paid">
          </b-tab-item>
          <b-tab-item label="Overdue">
          </b-tab-item>
        </b-tabs>
      </card-component>
    </section>
  </div>
</template>

<script>

    import TitleBar from "../../components/TitleBar";
    import CardComponent from "../../components/CardComponent";

    export default {
        name: "InvoiceOverview",
        components: {CardComponent, TitleBar},
        data() {
            return {
                data: null,
                tabIndex: 0,
            }
        },
        methods: {
            onTabChange(index) {
                this.tabIndex = index
            },
            onPopupOpen: function (args) {
            }
        },
    }
</script>
<style scoped>
  .b-tabs {
    padding: 2vh 8vh 6vh 8vh;
  }
</style>
