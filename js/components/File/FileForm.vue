<template>
  <div>
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <file-picker ref="fileUpload" v-on:add-file="addFile"></file-picker>
      <b-field class="first-field" label="Document for review only">
        <div class="block">
          <b-radio v-model="form.review" native-value="1">
            Yes
          </b-radio>
          <b-radio v-model="form.review" native-value="0">
            No
          </b-radio>
        </div>
      </b-field>
      <b-field v-if="form.review==0" label="Require client confirmation">
        <div class="block">
          <b-radio v-model="form.confirm" native-value="1">
            Yes
          </b-radio>
          <b-radio v-model="form.confirm" native-value="0">
            No
          </b-radio>
        </div>
      </b-field>
      <b-field v-if="form.review==0" label="Require client signature">
        <div class="block">
          <b-radio v-model="form.signature" native-value="1">
            Yes
          </b-radio>
          <b-radio v-model="form.signature" native-value="0">
            No
          </b-radio>
        </div>
      </b-field>
      <b-field>
        <b-button type="is-warning" @click="submit">Upload Document</b-button>
      </b-field>
    </form>
  </div>

</template>
<script>
  import {mapState} from 'vuex'
  import FilePicker from '@/components/FilePicker'

  export default {
    name: "FileForm",
    components: {FilePicker},
    data() {
      return {
        form: {
          files: null,
          review: 1,
          confirm: 1,
          signature: 1,
        }
      };
    },
    computed: {
      ...mapState([
        'update'
      ]),
    },
    methods: {
      addFile(file) {
        let formData = new FormData()
        formData.append('files', file)
        axios.post('/api' + this.$route.path, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(r => {

        });
      },
      submit() {
        let formData = new FormData()
        for (var i = 0; i < this.$refs.fileUpload.dropFiles.length; i++) {
          let file = this.$refs.fileUpload.dropFiles[i];
          formData.append('files[' + i + ']', file)
          formData.append('name[' + i + ']', this.$refs.fileUpload.fileName[i])
          formData.append('entity[' + i + ']', this.$route.params.id)
          formData.append('review[' + i + ']', this.form.review)
          formData.append('confirm[' + i + ']', this.form.confirm)
          formData.append('signature[' + i + ']', this.form.signature)

        }
        axios.post('/api' + this.$route.path, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(r => {
          this.$buefy.toast.open({
            message: 'File Added',
            type: 'is-success',
            queue: false
          })
          this.$store.dispatch('updated')
        }).catch(function (response) {
          //handle error
        });
      }
    }
  }

</script>
<style scoped>
  .field {
    text-align: center;
  }


  .field:last-child {
    margin-top: 10vh;
  }
</style>
