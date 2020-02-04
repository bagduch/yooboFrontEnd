<template xmlns="http://www.w3.org/1999/html">
  <div class="document-grid-container">
    <div class="document-grid-tool-bar">
      <b-field grouped>
        <b-input icon="magnify" placeholder="search document" v-model="search"></b-input>
        <status-select></status-select>
        <b-button type="is-default">Download All</b-button>
      </b-field>
    </div>
    <div class="document-grid-body">
      <div class="file-container">
        <div v-for="file in files.data" class="file-item">
          <div class="file-item-container" @click="viewFile(file.id)">
            <div class="file-item-status"> {{file.status}}</div>
            <div class="file-item-file">
              <i v-if="file.type=='pdf'" class="mdi mdi-file-pdf-outline"></i>
              <i v-else class="mdi mdi-image"></i>
            </div>

          </div>
          <div class="file-item-edit" @click="editFile" >
            <i v-if="file.review==1" class="mdi mdi-dots-horizontal"></i>
          </div>
          <div class="file-item-name"> {{file.name}}</div>
          <div class="file-item-footer">
            <b-button size="is-small" type="is-light" @click="downLoadFile(file.id,file.name)">Download File</b-button>
          </div>
        </div>
      </div>
      <b-pagination :order="order" @change="changePage" :current.sync="files.current_page" :total="files.total"
                    :per-page="files.per_page"></b-pagination>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import StatusSelect from "../../StatusSelect";

  export default {
    name: "entityGrid",
    components: {StatusSelect},

    data() {
      return {
        order: 'is-right',
        files: [],
        search: null
      }
    },

    watch: {
      update: function (value) {
        this.getFiles(1);
      },
    },
    computed: {
      ...mapState([
        'update',
      ]),
    },
    created() {
      this.getFiles(1);
    },
    methods: {
      editFile() {
      },
      downLoadFile(id, name) {
        axios({
          url: '/api/file/download/' + id,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', name + '.pdf');
          document.body.appendChild(fileLink);
          fileLink.click();

        });
      },
      viewFile(id) {
        this.$router.push({name: 'file.view', params: {id: id}})
      },
      getFiles(page) {
        axios.get("/api/file/entity/" + this.$route.params.id + "?page=" + page).then(r => {
          this.files = r.data.data;
        }).catch(err => {

        });
      },
      changePage(Number) {
        this.getFiles(Number);
      }
    }
  }
</script>
<style scoped>

  .document-grid-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    height: 70vh;
  }

  .file-item-edit {
    z-index: 999;
    text-align: right;
    font-size: 1.5rem;
    margin-top: -10px;
    margin-bottom: -10px;
    height: 35px;
    cursor: pointer;
    position: absolute;
    bottom: 145px;
    right: 30px;
  }

  .file-item {
    flex-basis: 215px;
    padding: 25px;
    height: 370px;
    position: relative;
  }

  .file-container {
    display: flex;
    flex-wrap: wrap;
    height: 63vh;
  }

  .file-item-status {
    text-transform: capitalize;
    background: #132541;
    text-align: center;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    width: 100%;
    font-size: 0.8rem;
    padding: 15px 10px 15px 10px;
  }

  .file-item-file {
    text-align: center;
    font-size: 7rem;
    width: 100%;
    height: 9rem;
    margin-top: -10px;
  }

  .file-item-container {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid rgba(24, 28, 33, 0.06);
    box-shadow: 0px 1px 5px 0.5px rgba(0, 0, 0, 0.68);
  }

  .file-item-name {
    text-align: center;
    padding: 10px;
    font-weight: bold;
  }

  .file-item-footer .button {
    width: 100%;
  }

  .document-grid-tool-bar .field {
    width: 40%;
  }
</style>
