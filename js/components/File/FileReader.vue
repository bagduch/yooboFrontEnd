<template>
  <card-component v-if="data" :title="data.name" :icon="icon" :noPadding="true">
    <div class="file-status">{{data.status}}</div>
    <div class="reader-container">

      <div class="pdf-container">
        <pdf :scale.sync="scale" v-if="typeof pdfdata !=='undefined'" :src="pdfdata" v-for="i in numPages" :key="i"
             :id="i" :page="i"
             style="width:auto;height:100%;margin:auto;"></pdf>
      </div>
    </div>
    <div class="reader-footer">
      <a class="item" @click="page > 1 ? page-- : 1">
        Back
      </a>
      {{page}} / {{ numPages ? numPages : '1' }}
      <a class="item" @click="page < numPages ? page++ : 1">
        Forward
      </a>
    </div>
  </card-component>
</template>
<script>
  import CardComponent from "../CardComponent";
  import pdfvuer from 'pdfvuer'

  export default {
    name: "FileReader",
    props: ['data'],
    components: {
      CardComponent, pdf: pdfvuer
    },
    watch: {
      page: function (p) {
        if (window.pageYOffset <= this.findPos(document.getElementById(p)) || (document.getElementById(p + 1) && window.pageYOffset >= this.findPos(document.getElementById(p + 1)))) {
          // window.scrollTo(0,this.findPos(document.getElementById(p)));
          document.getElementById(p).scrollIntoView();
        }
      }
    },
    data() {
      return {
        scale: 'page-width',
        icon: "menu-left",
        page: 1,
        numPages: 0,
        pdfdata: undefined,

      }
    },
    created()
    {
      this.getPdf();
    },
    methods: {
      findPos(obj) {
        return obj.offsetTop;
      },
      getPdf() {
        var self = this;
        self.pdfdata = pdfvuer.createLoadingTask(this.data.url);
        self.pdfdata.then(pdf => {
          self.numPages = pdf.numPages;
        });

      },
  // getFile() {
  //   axios.get('/api/file/' + this.$route.params.id).then(r => {
  //     this.getPdf(r.data.data.url);
  //     this.data = r.data.data;
  //   }).catch(err => {
  //     this.$buefy.toast.open({
  //       message: `Error: ${err.message}`,
  //       type: 'is-danger',
  //       queue: false
  //     })
  //   });
  // }
  }
  }
</script>
<style scoped>
  .reader-container {
    height: 71vh;
    overflow: hidden;
  }

  .pdf-container {
    height: 100%;
    overflow-y: scroll;
    width: 102%;
  }

  .file-status {
    position: absolute;
    top: 10px;
    right: 12px;
    background: #bbbdc0;
    color: white;
    padding: 3px 30px 3px 30px;
    border-radius: 5px;
    text-transform: capitalize;
  }


</style>
