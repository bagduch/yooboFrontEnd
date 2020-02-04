<template>

  <div @mouseover="hover=true" @mouseout="hover=false" :class="{dark: hover}">
    <div class="item-top">
      {{ data.name }}
    </div>

    <div class="item-detail">
      <div class="detail-left">
        DT
      </div>

      <div class="detail-right" v-show="!hover">

        <div v-if="item.company" class="detail-right-title">
          {{ data.company }}
        </div>

        <div class="detail-right-bottom">
          {{ data.phone }}<br>
          {{ data.email }}<br>
          {{ data.address.address+", "+data.address.suburb+", "+data.address.city+", "+data.address.country+", "+data.address.post_code }}<br>
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
    <edit-team-modal v-on:update-client="update" v-on:cancel="cancel" :isModalActive="isModalActive" v-on:show="show" :item="data"
                       :isEdit="isEdit"></edit-team-modal>
  </div>
</template>
<script>
    import EditTeamModal from "./EditTeamModal";

    export default {
        name: "TeamGridItem",
        components: {EditTeamModal},
        props: ["item"],
        data() {
            return {
                isModalActive: false,
                data: [],
                isEdit: false,
                hover: false,
            }
        },
        created() {
            this.data = this.item;
        },
        methods: {
            cancel() {
                this.isModalActive = false
                this.hover=false
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
            editClient()
            {
                this.isModalActive = true
            }

        }

    }

</script>
