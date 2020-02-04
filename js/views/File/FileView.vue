<template>
  <div v-if="loaded">
    <title-bar :title-stack="['Project','','']"></title-bar>
    <section class="section is-main-section">
      <div v-if="data.review==0" class="columns">
        <div class="column is-three-fifths"><file-reader :data="data"></file-reader></div>
        <div class="columns"></div>
      </div>
      <file-reader v-else :data="data"></file-reader>
    </section>
  </div>
</template>

<script>
  import TitleBar from "../../components/TitleBar";
  import FileReader from "../../components/File/FileReader";

  export default {
    name: "FileView",
    components: {FileReader, TitleBar},
    data() {
      return {
        data: null,
        loaded: false,
      }
    },
    created() {
      this.getFile();
    },
    methods: {
      getFile() {
        axios.get('/api/file/' + this.$route.params.id).then(r => {
          this.data = r.data.data;
          this.url = r.data.data.url;
          this.loaded = true
        }).catch(err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        });
      }
    }
  }
</script>
