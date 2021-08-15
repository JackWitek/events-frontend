<template>
  <div
    class="
      max-w-md
      m-auto
      mt-3
      p-3

    "
  >
    <div class=" border border-purple-dark shadow rounded p-3">
      <h1 class="text-white font-sans font-light pb-4">
        Create a new date range
      </h1>

      <form @submit.prevent="createDaterange">
        <div class="mb-4 ">
          <input
            type="text"
            id="daterange_name"
            class="input w-64"
            autofocus
            autocomplete="off"
            placeholder="Name for the date range"
            v-model="newDaterange.name"
          />
        </div>

        <div class="w-64 pb-3">
          <VueCtkDateTimePicker
            v-model="newDaterange.startDate"
            minute-interval="5"
            input-size="lg"
            only-date
            auto-close
            dark
            formatted="MMM DD YYYY"
            color="#4f18b4"
            label="Click to select start date"
            no-label
          />
        </div>
        <div class="w-64">
          <VueCtkDateTimePicker
            v-model="newDaterange.endDate"
            minute-interval="5"
            input-size="lg"
            only-date
            auto-close
            dark
            formatted="MMM DD YYYY"
            color="#4f18b4"
            label="Click to select end date"
            no-label
          />
        </div>

        <input
          type="submit"
          value="Add daterange"
          class="   font-sans font-bold border-purple-darker
          mx-auto
          rounded
          cursor-pointer
          no-underline
          bg-deeppurple hover:bg-purple-dark
          block
          w-4/5
          py-4
          mt-6
          mb-3
          text-grey-light
          items-center
          justify-center"
        />
      </form>
      <ul class="list-reset mt-4">
        <li
          class="py-1"
          v-for="createError in createErrors"
          :key="createError.id"
          :createError="createError"
        >
          <div class="error">{{ createError }}</div>
        </li>
      </ul>
    </div>

    <hr class="border border-blue-darkest my-6" />
    <div class="text-red" v-if="error">{{ error }}</div>
    <div class="max-w-lg m-auto my-5">
      <h2
        v-if="dateranges.length != 0"
        class="mt-5 text-white font-sans font-light"
      >
        Your date ranges:
      </h2>
      <h2
        v-if="dateranges.length == 0"
        class="mt-5 text-white font-sans font-light"
      >
        You have no date ranges
      </h2>
      <ul class="list-reset mt-4">
        <li
          class="py-4"
          v-for="daterange in dateranges"
          :key="daterange.id"
          :daterange="daterange"
        >
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex-1 flex justify-between flex-wrap pr-4">
              <p class="block flex font-sans font-semibold flex items-center">
                <svg height="50" width="50">
                  <circle
                    cx="20"
                    cy="23"
                    r="15"
                    stroke="lightblue"
                    stroke-width="6"
                    fill="transparent"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                {{ daterange.name }} &mdash;
                {{ getFormattedDate(daterange.startDate) }} &mdash;
                {{ getFormattedDate(daterange.endDate) }}
              </p>
            </div>

            <button
              class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
              @click.prevent="viewDaterange(daterange)"
            >
              View
            </button>

            <button
              class="bg-transparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
              @click.prevent="removeDaterange(daterange)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="p-3 ">
      <BackButton class=" mx-auto " location="Home" />
    </div>
  </div>
</template>

<script>
import router from '../../router'
import shared from '../../backend/common-functions'
import BackButton from '@/components/Content/BackButton.vue'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

const state = {
  date1: new Date()
}

export default {
  name: 'app',
  components: {
    BackButton,
    VueCtkDateTimePicker
  },
  data () {
    return {
      state: state,
      endDate: null,
      startDate: null,
      error: '',
      dateranges: [],
      newDaterange: [],
      createErrors: []
    }
  },
  created () {
    this.getFormattedDate = shared.getFormattedDate
    this.getBetterFormattedDate = shared.getBetterFormattedDate
    this.setError = shared.setError

    if (!localStorage.signedIn) {
      this.$router.replace('/')
      console.log('Not signed in')
    } else {
      this.$http.secured
        .get('/api/v1/dateranges')
        .then(response => {
          this.dateranges = response.data
        })
        .catch(error => this.setError(error, "Couldn't get dateranges"))
    }
  },
  methods: {
    createDaterange () {
      this.createErrors = []
      this.error = ''

      if (this.newDaterange.name === undefined) {
        this.createErrors.push('Date range name is required')
      }
      if (this.newDaterange.startDate === undefined) {
        this.createErrors.push('Date range start date is required')
      }
      if (this.newDaterange.endDate === undefined) {
        this.createErrors.push('Date range end date is required')
      }

      if (this.createErrors.length > 0) {
        return
      }

      var rangeStartDate = new Date(this.newDaterange.startDate).toDateString()
      var rangeEndDate = new Date(this.newDaterange.endDate).toDateString()

      if (new Date(rangeEndDate) <= new Date(rangeStartDate)) {
        this.createErrors.push('End date must be after start date')
      }

      if (this.createErrors.length > 0) {
        return
      }

      const diffTime = Math.abs(
        new Date(this.newDaterange.endDate) - new Date(this.newDaterange.startDate)
      )

      const day = 60 * 60 * 24 * 1000

      const diffDays = Math.ceil(diffTime / day)

      var date = new Date(this.newDaterange.startDate)

      var listOfDays = []
      for (let i = 0; i <= diffDays; i++) {
        // date = new Date(date.getTime() + day);

        var dayObject = {}
        dayObject['id'] = i
        dayObject['date'] = date
        dayObject['location'] = ''
        listOfDays.push(dayObject)
        date = new Date(date.getTime() + day)
      }

      this.$http.secured
        .post('/api/v1/dateranges/', {
          daterange: {
            name: this.newDaterange.name,
            startDate: rangeStartDate,
            endDate: rangeEndDate,
            data: JSON.stringify(listOfDays)
          }
        })
        .then(response => {
          this.dateranges.push(response.data)
          this.newDaterange = []
        })
        .catch(error => this.setError(error, 'Cannot create daterange'))
    },

    removeDaterange (daterange) {
      this.$http.secured
        .delete(`/api/v1/dateranges/${daterange.id}`)
        .then(response => {
          this.dateranges.splice(this.dateranges.indexOf(daterange), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete daterange'))
    },

    viewDaterange (daterange) {
      router.push({ path: 'daterange', query: { id: daterange.id } })
    }
  }
}
</script>

<style>

</style>
