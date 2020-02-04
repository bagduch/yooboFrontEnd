<style scoped>
  .file-form-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    height: 25vh;
  }

  .tags {
    justify-content: center;
  }

  .upload {
    width: 175px;
    height: 210px;
  }
</style>
<template>
  <div class="file-form-container">
    <b-field>
      <b-upload multiple v-model="dropFiles"
                drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                icon="upload"
                size="is-large">
              </b-icon>
            </p>
            <p>Drop files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary">
                <b-input v-model="fileName[index]" v-on:change="changeName(index)"></b-input>
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                </button>
            </span>
    </div>
  </div>
</template>

<script>
    import each from 'lodash/each'

    export default {
        name: 'FilePicker',
        data() {
            return {
                dropFiles: [],
                fileName: [],
            }
        },
        watch: {
            dropFiles: function (newValue) {
                if (this.fileName.length == 0) {
                    for (var i = 0; i < this.dropFiles.length; i++) {
                        this.fileName.push(this.dropFiles[i].name.split('.').slice(0, -1).join('.'))
                    }
                } else {
                    this.fileName.push(this.dropFiles[this.dropFiles.length - 1].name.split('.').slice(0, -1).join('.'));
                }
            }
        },
        methods: {

            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        }
    }
</script>
