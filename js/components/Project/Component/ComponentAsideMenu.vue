<style scoped>
  .component-menu-container {
    flex-basis: 80%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }

  .component-container > div {
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .component-item {
    background: #eeedef;
    border-radius: 6px;
    border: 1px solid rgba(24, 28, 33, 0.06);
    box-shadow: 0px 1px 5px 0.5px rgba(0, 0, 0, 0.68);
    padding: 50px 0px;
    text-align: center;
    flex-basis: 140px;
    position: relative;
    margin-top: 20px;
  }

  .item-footer {
    position: absolute;
    bottom: -5px;
    right: 6px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .ghost {
    margin-top: 0px;
    height: 210px;
    margin-left: 30px;
    flex-basis: 200px;
  }

  .search-input {
    margin-top: 20px;
  }
</style>
<template>
  <div class="component-menu-container">
    <router-link to="/project/index">
      <b-icon icon="menu-left"></b-icon>
      Back to Project List
    </router-link>
    <component-modal :is-modal-active="isModalActive" v-on:show="showModal" :is-loading="isLoading" :item="item"
                     v-on:cancel="hideModal" v-on:save-component="save"></component-modal>

    <b-input v-model="search" class="search-input" icon="magnify" placeholder="Search Components"></b-input>
    <div v-if="data" class="component-container">
      <draggable class="aside-menu" @change="log" :list="data" group="a">
        <div class="component-item item " v-for="item in resultQuery" :key="item.id">
          <div class="item-title">{{item.name}}</div>
          <div class="item-footer">
            <i class="mdi mdi-dots-horizontal" v-on:click="editShowModal(item)"></i>
          </div>
        </div>
      </draggable>

    </div>
  </div>
</template>

<script>
    import ComponentModal from "./ComponentModal";
    import draggable from 'vuedraggable'


    export default {
        name: "ComponentAsideMenu",
        components: {ComponentModal, draggable},
        data() {
            return {
                search: null,
                isDragging: false,
                item: null,
                data: null,
                isModalActive: false,
                isEditModalActive: false,
                isLoading: false,
                delayedDragging: false

            }
        },

        created() {
            this.getComponents();
        },
        computed: {

            resultQuery() {
                if (this.data !== null && this.search !== null) {
                    return this.data.filter((item) => {
                        return this.search.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                    })
                } else {
                    return this.data;
                }
            }
        },
        watch: {
            isDragging(newValue) {
                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(() => {
                    this.delayedDragging = false;
                });
            }
        },
        methods: {
            log(evt) {

            },

            showModal() {
                this.item = false
                this.isModalActive = true;
            },

            editShowModal(item) {
                this.item = item
                this.isModalActive = true;
            },

            hideModal() {
                this.item = false
                this.isModalActive = false;
            },
            getComponents() {
                axios.get('/api/component').then(r => {
                    this.data = r.data.data
                }).catch(err => {

                });
            },
            save(data) {
                this.item = false
                this.isLoading = true;
                axios.post('/api/component', data).then(r => {
                    this.data.push(r.data.data);
                    this.isLoading = false
                    this.isModalActive = false
                }).catch(err => {
                    this.isLoading = false
                    this.$buefy.toast.open({
                        message: `Error: ${err.message}`,
                        type: 'is-danger',
                        queue: false
                    })
                })

            }


        }
    }

</script>
