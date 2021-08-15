<template>
  <button
    class="bg-transparent text-lg hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-4 px-4 w-64 my-5  block rounded"
    @click.prevent="goBack">
    Go Back
  </button>
</template>

<script>
import router from '../../router'

export default {
  props: ['location'],
  methods: {
    goBack () {
      router.push({
        name: this.location
      })
    }
  }
}
</script>

<style></style>
