<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default"/>
        {{ title }}
      </p>
      <a v-if="headerIcon" href="#" class="card-header-icon" aria-label="more options" @click.prevent="headerIconClick">
        <b-icon :icon="headerIcon" custom-size="default"/>
      </a>
    </header>
    <div class="card-content" v-bind:class="{'no-padding': noPadding}" >
      <slot></slot>
    </div>
    <footer class="card-footer">
      <slot name="footer"/>
    </footer>
  </div>
</template>

<script>
    export default {
        name: 'CardComponent',
        props: {
            title: {
                type: String,
                default: null
            },
            icon: {
                type: String,
                default: null
            },
            headerIcon: {
                type: String,
                default: null
            },
            noPadding:true
        },
        methods: {
            headerIconClick() {
                this.$emit('header-icon-click')
            }
        }
    }
</script>
