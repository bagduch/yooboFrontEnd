<template>
  <div>
    <title-bar :title-stack="['My Invoice', 'Overview']"/>
    <section class="section is-main-section">
      <card-component>
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
