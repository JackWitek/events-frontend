<template>
  <div class="max-w-lg m-auto">
    <H1 class="m-4 my-10 text-2xl font-medium font-sans"
      >Hi, {{ getUser() }}</H1
    >
    <div class="option-border">
      <div class="rounded m-3 ">
        <div class="inline-block ">
          <img src="../../assets/list-view.png" alt="" />
        </div>
        <div class="text-container">
          <p class="option-desc">
            Select this option for a list view of all of your events.<br />
            Here you can create new events for any date and time
          </p>
        </div>
      </div>
      <button
        class="option-button hover:bg-blue hover:text-white"
        @click.prevent="viewEvents()"
      >
        List View
      </button>
    </div>

    <br />
    <div class="option-border">
      <div class="rounded m-3">
        <div class="inline-block">
          <img src="../../assets/week-view.png" alt="" />
        </div>
        <div class="text-container">
          <p class="option-desc">
            Select this option for a simple calendar week view. <br />Events can be
            added to any day
          </p>
        </div>
      </div>
      <button
        class="option-button hover:bg-blue hover:text-white"
        @click.prevent="viewWeek()"
      >
        Week View
      </button>
    </div>

    <br />
    <div class="option-border">
      <div class="rounded m-3 ">
        <div class="inline-block ">
          <img src="../../assets/custom-view.png" alt="" />
        </div>
        <div class="text-container">
          <p class="option-desc">
            Select this option to see all events under a particular date
            range. This can be useful for planning multiday adventures!
          </p>
        </div>
      </div>
      <button
        class="option-button hover:bg-blue hover:text-white"
        @click.prevent="viewDateranges()"
      >
        Custom Date Range View
      </button>
    </div>
  </div>
</template>

<script>
import router from '../../router'

export default {
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
      console.log('Not signed in')
    }
  },

  methods: {
    viewEvents () {
      router.push({
        name: 'Events'
      })
    },

    viewDateranges () {
      router.push({
        name: 'Dateranges'
      })
    },

    viewWeek () {
      router.push({
        name: 'Week'
      })
    },

    getUser () {
      return localStorage.user
    }
  }
}
</script>

<style>
.option-border {
  @apply items-center border-solid border-b border-purple pb-6 mb-0;
}

.option-button {
  @apply bg-transparent text-base text-blue border border-blue no-underline font-bold py-4 px-4 w-4/5 my-3 mx-auto block rounded;
}
.option-desc {
  font-size: 1.4rem;
  @apply p-4 font-sans font-light;
}
.text-container {
  max-width: 68%;
  @apply inline-block align-top pl-2;
}

img {
  height: 7rem !important;
}
</style>
