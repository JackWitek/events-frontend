<template>
  <vue-modal-2
    name="modal-create"
    noFooter
    @on-close="close"
    :headerOptions="{ title: this.date }"
  >
    <CreateEvent @updateRangeView="sendUpdate" v-bind:date="this.date" />
  </vue-modal-2>
</template>

<script>
import Vue from 'vue'
import Modal from '@burhanahmeed/vue-modal-2'
import CreateEvent from '@/components/Content/CreateEvent.vue'

Vue.use(Modal)

export default {
  name: 'create',
  components: {
    CreateEvent
  },
  props: ['date'],
  methods: {
    open () {
      this.$vm2.open('modal-create')
    },
    close () {
      this.$vm2.close('modal-create')
    },
    sendUpdate (data) {
      this.$emit('updateRangeView', data)
    }
  }
}
</script>

<style>

</style>
