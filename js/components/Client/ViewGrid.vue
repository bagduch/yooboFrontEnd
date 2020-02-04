<template>
  <grid-view>
    <div class="item-container" v-for="item in data">
        <client-grid-item :item="item"></client-grid-item>
    </div>
  </grid-view>
</template>
<script>
  import ModalBox from '@/components/ModalBox'
  import ModalTrashBox from '@/components/ModalTrashBox'
  import GridView from "../GridView";
  import ClientGridItem from "./ClientGridItem";


  export default {
    name: "ViewGrid",
    props: ["data", "perPage", "paginated", "isLoading"],
    components: {ClientGridItem, GridView, ModalBox, ModalTrashBox},
    data() {
      return {
        isModalActive: false,
        trashObject: null,
        checkedRows: []
      }
    },
    computed: {
      trashSubject() {
        if (this.trashObject) {
          return this.trashObject.name
        }

        if (this.checkedRows.length) {
          return `${this.checkedRows.length} entries`
        }

        return null
      }
    },
    methods: {
      trashModal(trashObject = null) {
        if (trashObject || this.checkedRows.length) {
          this.trashObject = trashObject
          this.isModalActive = true
        }
      },
      trashConfirm() {

      },
      trashCancel() {
        this.isModalActive = false
      }
    }


  }

</script>
