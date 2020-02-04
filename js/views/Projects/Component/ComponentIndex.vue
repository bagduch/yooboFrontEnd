<template>
  <div v-if="loaded">
    <component-header :title="['Project', project.name]" :project="project"></component-header>

    <section class="section is-main-section">
      <card-component title="Components" icon="account" class="tile is-child">
        <div class="components-container">
          <view-grid :data="entities"></view-grid>
        </div>
        <b-pagination :order="order" :total="entities.total"
                      :per-page="entities.per_page"></b-pagination>
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
  import ComponentHeader from "../../../components/Project/Component/ComponentHeader";

  export default {
    name: "ComponentIndex",
    data() {
      return {
        order: "is-right",
        loaded: false,
        entities: [],
        data: {
          name: null,
          address: null,
          progress: 0,
          clients: [],
          users: []
        }
      }
    },
    components: {
      ComponentHeader,
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
      this.getComponents()
    },
    methods: {


      getComponents() {
        axios.get('/api/project/' + this.$route.params.id).then(r => {
          this.loaded = true
          this.$store.commit('project', r.data.project);
          this.entities = r.data.data
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

