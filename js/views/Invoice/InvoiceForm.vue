<template>
  <div>
    <title-bar :title-stack="['My Invoice', 'New Invoice']"/>
    <section class="section is-main-section">
      <card-component  class="has-table has-mobile-sort-spaced" title="New Invoice"
                       icon="account-multiple">
      </card-component>
    </section>
  </div>
</template>

<script>

    import TitleBar from "../../components/TitleBar";
    import CardComponent from "../../components/CardComponent";

    export default {
        name: "InvoiceOverview",
        components: {CardComponent, TitleBar}
    }
</script>
