<template>

  <div @mouseover="hover=true" @mouseout="hover=false" :class="{dark: hover}">
    <div class="item-top">
      {{ data.first_name }} {{ data.last_name }}
    </div>

    <div class="item-detail">
      <div class="detail-left">
        {{ shortName }}
      </div>

      <div class="detail-right" v-show="!hover">

        <div v-if="item.company" class="detail-right-title">
          {{ data.company }}
        </div>

        <div class="detail-right-bottom">
          {{ data.phone }}<br>
          {{ data.email }}<br>
          {{ fullAddress}}<br>
        </div>
      </div>

      <div class="detail-right" v-show="hover">
        <div style="color: #fff;font-size: 12px; ">Projects Involved</div>
        <div>View all projects</div>
      </div>
    </div>
    <div class="action">
        <span class="icon">
             <i class="yoobo-small-icon link" :class="{grey: !hover}"></i>
        </span>
      <span class="icon">
             <i class="yoobo-small-icon star" :class="{grey: !hover}"></i>
        </span>
      <span class="icon">
             <i class="yoobo-small-icon email" :class="{grey: !hover}"></i>
        </span>
      <span @click="editClient" class="icon">
             <i class="yoobo-small-icon dot" :class="{grey: !hover}"></i>
        </span>
    </div>
    <edit-client-modal v-on:update-client="update" v-on:cancel="cancel" :isModalActive="isModalActive" v-on:show="show"
                       :item="data"
                       :isEdit="isEdit"></edit-client-modal>
  </div>
</template>
<script>
    import EditClientModal from "./EditClientModal";

    export default {
        name: "ClientGridItem",
        components: {EditClientModal},
        props: ["item"],
        data() {
            return {
                isModalActive: false,
                data: [],
                isEdit: false,
                hover: false,
                shortName: "",
                fullAddress: ""
            }
        },
        watch: {
            data(value) {
                if (value.first_name.length > 0)
                    this.shortName = value.first_name.substring(0, 1);
                if (value.last_name.length > 0)
                    this.shortName = this.shortName + value.last_name.substring(0, 1);
                this.fullAddress = value.default_address.address + ", " + value.default_address.suburb + ", " + value.default_address.city + ", " + value.default_address.country + ", " + value.default_address.post_code
            }
        },
        created() {
            this.data = this.item;
        },
        methods: {
            cancel() {
                this.isModalActive = false
                this.hover = false
            },
            show() {
                this.isModalActive = true
            },
            update(id, data) {

                axios.patch('/api/client/' + id, data).then(r => {
                    this.isLoading = false
                    this.data = r.data.data;

                    this.isFetching = false;
                    this.isModalActive = false
                    this.$buefy.toast.open({
                        message: `Client Updated`,
                        type: 'is-success',
                        queue: false
                    })
                }).catch(err => {

                });
            },
            editClient() {
                this.isModalActive = true
            }

        }

    }

</script>
<style scoped>
  .detail-right-title {
    padding-bottom: 10px;
  }
</style>
