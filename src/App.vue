<template>
  <div id="app" class="bg-black min-h-screen">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Global/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
