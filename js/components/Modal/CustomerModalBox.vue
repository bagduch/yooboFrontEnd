<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <form @submit.prevent="confirm" class="main-form">
      <div class="modal-card customer" :class="{autowidth:isAutoWidth}">
        <header class="modal-card-head" :class="{normal:!hasIcon}">
          <div v-if="hasIcon" class="header-logo">
            <i :class="icon"></i>
            <div class="header-title ng-binding">{{title}}
            </div>
          </div>
          <div v-else class="header-title ng-binding">{{title}}
          </div>
        </header>
        <section class="modal-card-body">
          <slot/>
        </section>
        <footer class="modal-card-foot">
          <b-button class="button" type="button" @click="cancel">Cancel</b-button>
          <b-button :class="confirmButtonClass" :loading="isLoading" @click="confirm" type="submit">{{ confirmLabel }}
          </b-button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
  export default {
    name: 'CustomerModalBox',
    props: {
      icon: "",
      title: "",
      autoWidth: true,
      isActive: {
        type: Boolean,
        default: false
      },
      isLoading: false,
      confirmLabel: {
        type: String,
        default: 'Confirm'
      },
      confirmType: {
        type: String,
        default: 'is-warning'
      }
    },
    data() {
      return {
        isModalActive: false
      }
    },

    computed: {

      isAutoWidth() {
        return typeof this.autoWidth !== 'undefined' ? true : false
      },
      hasIcon() {
        return typeof this.icon !== 'undefined' ? true : false
      },
      confirmButtonClass() {
        return `button ${this.confirmType}`
      }
    },
    methods: {
      cancel() {
        this.$emit('cancel')
      },
      confirm() {
        this.$emit('confirm')
      }
    },
    watch: {
      isActive(newValue) {
        this.isModalActive = newValue
      },
      isModalActive(newValue) {
        if (!newValue) {
          this.cancel()
        }
      }
    }
  }
</script>
