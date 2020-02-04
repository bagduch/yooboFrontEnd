<template>
  <div v-if="loaded">
    <component-header :title="['Project', project.name,entity.component.name]"
                      :project="project" :staff-drop-down="staffDropDown"></component-header>

    <section class="section is-main-section">
      <card-component title="Entity" icon="account" class="tile is-child">
        <div class="columns">
          <div class="column is-one-fifth">
            <entity-side-bar :entity="entity"></entity-side-bar>
          </div>
          <div class="column">
            <entity-grid></entity-grid>
          </div>
        </div>
      </card-component>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import CardComponent from '@/components/CardComponent'
  import ModalBox from '@/components/ModalBox'
  import TitleBar from '@/components/TitleBar'
  import HeroBar from '@/components/HeroBar'
  import CardToolbar from '@/components/CardToolbar'
  import ModalTrashBox from '@/components/ModalTrashBox'
  import NewProjectModal from '@/components/Project/NewProjectModal'
  import ProjectTable from "@/components/Project/ProjectTable";
  import SideBar from "@/components/Project/SideBar";
  import AddClientModal from "@/components/Project/Component/AddClientModal";
  import ViewGrid from "@/components/Project/Component/ViewGrid";
  import EntitySideBar from "../../../components/Project/Entity/EntitySideBar";
  import EntityGrid from "../../../components/Project/Entity/EntityGrid";
  import ComponentHeader from "../../../components/Project/Component/ComponentHeader";

  export default {
    name: "ComponentView",
    data() {
      return {
        staffDropDown: false,
        clientDropDown: false,
        loaded: false,
        data: {
          name: null,
          address: null,
          progress: 0,
          clients: [],
          users: []
        },
        entity: null
      }
    },

    components: {
      ComponentHeader,
      EntityGrid,
      EntitySideBar,
      ViewGrid,
      AddClientModal,
      SideBar,
      ProjectTable,
      ModalTrashBox,
      CardToolbar,
      HeroBar,
      TitleBar,
      ModalBox,
      CardComponent,
      NewProjectModal
    },
    computed: {
      ...mapState([
        'project',
      ]),
    },
    created() {
      this.getEntities()
    },
    methods: {


      getProject(id) {
        axios.get('/api/project/' + id).then(r => {
          this.$store.commit('project', r.data.project)
          this.loaded = true

        }).catch(err => {

        });
      },
      getEntities() {

        axios.get('/api/component/entity/' + this.$route.params.id).then(r => {
          this.entity = r.data.data;
          if (this.$store.state.project == null) {
            this.getProject(this.entity.project_id);
          } else {
            this.loaded = true
          }

        }).catch(err => {

        });
      }
    }
  }
</script>
<style scoped>
  .components-container {
    min-height: 70vh;
  }

  .staff-list li {
    color: white !important;
  }

  .company-title {
    color: white;
    padding-top: 15px;
  }
</style>

