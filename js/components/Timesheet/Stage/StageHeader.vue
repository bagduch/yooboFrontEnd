<template>
  <div class="stage-header" v-if="loaded">
    <b-field grouped>
      <stage-search :client="clients" :project="projects"></stage-search>
      <b-field>
        <b-button class="line-button" @click="isProjectStage = true" type="is-warning">Create Project Stage</b-button>
        <customer-modal-box :auto-width="true" :is-active="isProjectStage" :title="titleProjectStage"
                            v-on:cancel="isProjectStage = false">
          <stage-search :client="clients" :project="projects"></stage-search>
          <b-field label="Use Default Stage">
            <div class="block">
              <b-radio v-model="form.importDefault"
                       native-value="1">
                Yes
              </b-radio>
              <b-radio v-model="form.importDefault"
                       native-value="0">
                No
              </b-radio>
            </div>
          </b-field>

          <b-field v-if="form.importDefault==0" label="Stage Name">
            <b-input v-model="form.name" placeholder="e.g. Stage Name"></b-input>
          </b-field>
        </customer-modal-box>
      </b-field>
      <b-field>
        <b-button @click="isDefaultProjectStage = true" class="line-button" type="is-light">Create Default Project
          Stage
        </b-button>
        <customer-modal-box :auto-width="true" :is-active="isDefaultProjectStage" :title="titleDefaultProjectStage"
                            v-on:cancel="isDefaultProjectStage = false" v-on:confirm="confirm">
          <b-table :data="stages" :loading="isLoading">
            <template slot-scope="props">
              <b-table-column field="name" label="Name" sortable>
                {{ props.row.name }}
              </b-table-column>

              <b-table-column field="value" label="Rate" sortable>
                {{ props.row.value }}
              </b-table-column>
              <b-table-column>
                <b-icon icon="close"></b-icon>
              </b-table-column>
            </template>

            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon
                      icon="emoticon-sad"
                      size="is-large">
                    </b-icon>
                  </p>
                  <p>Nothing here.</p>
                </div>
              </section>
            </template>
          </b-table>
          <b-field label="Apply To All Projects">
            <div class="block">
              <b-radio v-model="form.apply_all"
                       native-value="1">
                Yes
              </b-radio>
              <b-radio v-model="form.apply_all"
                       native-value="0">
                No
              </b-radio>
            </div>
          </b-field>
          <b-field label="Stage Name">
            <b-input v-model="form.name" placeholder="e.g. Stage Name"></b-input>
          </b-field>
          <b-field label="Rate">
            <b-input v-model="form.value" v-cleave="masks.numeral" placeholder="e.g. $100"></b-input>
          </b-field>
        </customer-modal-box>
      </b-field>
    </b-field>

  </div>

</template>

<script>

  import ModalBox from "../../ModalBox";
  import CustomerModalBox from "../../Modal/CustomerModalBox";
  import StageSearch from "./StageSearch";
  import Cleave from 'cleave.js'

  const cleave = {
    name: 'cleave',
    bind(el, binding) {
      const input = el.querySelector('input')
      input._vCleave = new Cleave(input, binding.value)
    },
    unbind(el) {
      const input = el.querySelector('input')
      input._vCleave.destroy()
    }
  }
  export default {
    directives: {cleave},
    name: "StageHeader",
    components: {StageSearch, CustomerModalBox, ModalBox},
    props: ['clients', 'projects', 'stages', 'loaded', 'isLoading'],
    data() {
      return {
        form: {
          importDefault: 1,
          value: 0,
          name: '',
          apply_all: 0
        },
        masks: {
          creditCard: {creditCard: true},
          numeral: {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
          },
          custom: {
            delimiters: ['.', '.', '-'],
            blocks: [3, 3, 3, 2],
            numericOnly: true
          }
        },
        isProjectStage: false,
        isDefaultProjectStage: false,
        name: null,
        titleProjectStage: "New Project Stage",
        titleDefaultProjectStage: "Default Project Stage"
      }
    },

    methods: {

      confirm() {
        this.$emit('save-stage', this.form)
      }


    }
  }

</script>

<style scoped>
  .stage-header {
    background-color: #eeedef;
    padding: 12px 10px 0px 10px;
  }

  .line-button {
    margin-top: 2rem;
  }

</style>
