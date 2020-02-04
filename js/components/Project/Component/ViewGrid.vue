<template>
  <draggable ghost-class="ghost" class="component-item-container" :list="items" draggable=".item" group="a"
             @change="log">
    <div class="component-item" v-for="item in items" @click="moveToComponent(item.id)">
      <div class="item-status"> {{item.status }}</div>
      <div class="item-title">
        <span v-if="item.component.name">{{item.component.name}}</span>
      </div>
      <div class="item-footer">

      </div>

    </div>
  </draggable>
</template>
<script>
    import draggable from 'vuedraggable'

    export default {
        name: "ViewGrid",
        props: ['data'],
        components: {draggable},
        computed: {},
        data() {
            return {
                items: null,
                form: {
                    component_id: null,
                }
            }
        },
        watch: {},
        created() {
            this.items = this.data.data;
        },
        methods: {
            moveToComponent(id) {
                this.$router.push({name: 'component.entity', params: {id: id}})
            },
            log(evt) {
                this.items.pop();
                if (typeof evt.added.element.id !== "undefined") {
                    this.form.component_id = evt.added.element.id;
                    axios.patch("api" + this.$route.path, this.form).then(r => {
                        this.items.push(r.data.data)
                    }).catch(err => {

                    });
                }
            },

        }

    }

</script>
<style scoped>


  .component-item-container {
    display: flex;
    flex-wrap: wrap;
  }

  .item-status {
    background: #8895a0;
    border-radius: 5px;
    width: 85%;
    margin: 10px auto;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
  }

  .item-footer {
    border-top: 1px solid #aeaebb;
    width: 85%;
    margin: auto;
  }

  .item-title {
    color: #132541;
    font-weight: bold;
    font-size: 1.2rem;
    width: 85%;
    height: 125px;
    margin: auto;
    text-align: center;
    line-height: 125px;
  }

  .item-title span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }

  .component-item {
    margin-left: 30px;
    background: #eeedef;
    border-radius: 6px;
    border: 1px solid rgba(24, 28, 33, 0.06);
    box-shadow: 0px 1px 5px 0.5px rgba(0, 0, 0, 0.68);
    height: 210px;
    text-align: center;
    flex-basis: 200px;
    position: relative;
    margin-bottom: 25px;
    cursor: pointer;
  }

</style>
