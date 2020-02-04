<template>
  <title-bar :title-stack="title">
    <div class="project-basic">
      <b-progress type="is-warning" size="is-medium" :value="project.progress" show-value>
        {{project.progress}}% Completed
      </b-progress>
      <strong>{{project.name}}</strong>
      <br>
      <div v-if="project.address">
        {{ project.address[0].address}}, {{ project.address[0].suburb}}, {{ project.address[0].city}}
      </div>
    </div>
    <div class="project-attendant">
      <div class="project-container client">
        <div class="project-head">
          <i class="yoobo-icon client"></i>
        </div>
        <div class="project-body">
          <button v-if="project.clients.length==0" class="button is-warning" @click="addClientShow">Add Client</button>
          <div v-else class="company-title">{{project.clients[0].company !==""
            ?project.clients[0].company:project.clients[0].name}}
          </div>
          <add-client-modal :isModalActive="isModalActive" v-on:cancel="addClientHide" v-on:update="updateClient"
                            v-on:show="addClientShow"></add-client-modal>
          <b-collapse v-if="project.clients.length>0" :open="clientDropDown" position="is-bottom"
                      aria-id="contentIdForA11y1">
            <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
              <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
            <ul class="attendant-list" v-for="item in project.clients">
              <li>{{item.name}}<br>{{item.phone}}<br>{{item.email}}</li>
            </ul>
          </b-collapse>
        </div>
      </div>
      <div class="project-container staff">
        <div class="project-head">
          <i class="yoobo-icon team"></i>
        </div>
        <div class="project-body">
          <div class="company-title">X Studio</div>
          <b-collapse :open="staffDropDown" position="is-bottom" aria-id="contentIdForA11y2">
            <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y2">
              <b-icon style="color:white" :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
            <ul class="attendant-list" v-for="item in project.users">
              <li>{{item.first_name}} {{item.last_name}}</li>
            </ul>
          </b-collapse>
        </div>
      </div>
    </div>
  </title-bar>

</template>
<script>
  import TitleBar from "../../TitleBar";
  import AddClientModal from "./AddClientModal";

  export default {
    name: "componentHeader",
    components: {AddClientModal, TitleBar},
    props: ['project', 'title'],
    data() {
      return {
        isModalActive: false,
        staffDropDown: false,
        clientDropDown: false,
      }
    },
    methods: {
      addClientHide() {
        this.isModalActive = false;
      },
      addClientShow() {
        this.isModalActive = true;
      },
      updateClient(form) {
        axios.patch('api/project/' + this.project.id, form).then(r => {
        });
      }
    }
  }
</script>
<style scoped>
  .attendant-list li {
    font-weight: normal !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .staff .attendant-list li {
    color: white !important;
  }

  .company-title {
    color: white;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

