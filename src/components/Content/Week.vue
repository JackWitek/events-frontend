<template>
  <div class="justify-center  max-w-full m-auto mt-5">
    <div class="flex  ">
      <button
        class="bg-transparent hover:bg-purple-darkest hover:text-purple-light text-purple border border-purple no-underline mx-auto font-bold py-2 px-4 rounded"
        @click.prevent="previousWeek()">
        Previous week
      </button>
      <h1
        class="text-purple font-normal leading-normal justify-center mt-1 mb-2 px-3">
        Week of {{ getFormattedShortDate(this.weekStart) }}
      </h1>
      <button
        class="bg-transparent hover:bg-purple-darkest hover:text-purple-light text-purple border border-purple no-underline mx-auto font-bold py-2 px-4 rounded"
        @click.prevent="nextWeek()">
        Next week
      </button>
    </div>

    <ul class="list-reset m-auto flex flex-wrap justify-center">
      <li class="  day" v-for="day in weekDays" :key="day.date">
        <div>
          <form action="" v-on:change="updateDaterange()">
            <div class="mb-6 ml-2 p-4 rounded border border-blue-light mt-4">
              <h3 class="pb-1">{{ getFormattedShortDate(day.date) }}</h3>

              <div class="mb-6">
                <DayEvents v-bind:events="day.events" />
              </div>
              <button
                class="bg-transparent text-sm hover:bg-purple-darkest hover:text-purple-light block text-purple border border-purple no-underline mx-auto font-bold py-2 px-4 rounded"
                @click.prevent="addEvent(day.date)">
                Add new event
              </button>
            </div>
          </form>
        </div>
      </li>
    </ul>

    <CreateEventModal
      @updateRangeView="getEvents"
      v-bind:date="this.addingToDay"
    />
    <div class="p-3 ">
      <BackButton class=" mx-auto " location="Home" />
    </div>
  </div>
</template>

<script>
import shared from '../../backend/common-functions'

import moment from 'moment'

import CreateEventModal from '@/components/Content/CreateEventModal.vue'
import DayEvents from '@/components/Content/DayEvents.vue'
import BackButton from '@/components/Content/BackButton.vue'

export default {
  name: 'weekView',
  components: { CreateEventModal, DayEvents, BackButton },

  data () {
    return {
      weekStart: '',
      weekDays: [],
      addingToDay: ''
    }
  },
  created () {
    this.getFormattedDate = shared.getFormattedDate
    this.getFormattedDateTime = shared.getFormattedDateTime
    this.setError = shared.setError
    this.getFormattedDuration = shared.getFormattedDuration
    this.getFormattedShortDate = shared.getFormattedShortDate
    this.getBetterFormattedDate = shared.getBetterFormattedDate

    if (!localStorage.signedIn) {
      this.$router.replace('/')
    }
    this.weekStart = moment()
      .clone()
      .startOf('isoWeek')
    this.updateWeekView()
  },
  methods: {
    updateWeekView () {
      var weekStart = this.weekStart
      this.weekDays = []
      for (var i = 0; i <= 6; i++) {
        let day = {}
        day.date = moment(weekStart)
          .add(i, 'days')
          .format('MMMM D, yyyy')
        this.getEvents(day.date)
        this.weekDays.push(day)
      }
    },

    addEvent (date) {
      this.addingToDay = this.getBetterFormattedDate(date)
      this.$vm2.open('modal-create')
    },

    previousWeek () {
      this.weekStart = this.weekStart.subtract(7, 'days')
      this.updateWeekView()
    },

    nextWeek () {
      this.weekStart = this.weekStart.add(7, 'days')
      this.updateWeekView()
    },

    getEvents (date) {
      let offset = new Date(date).getTimezoneOffset()
      this.$http.secured
        .get(`/api/v1/events/dates/${date}/${offset}`)
        .then(response => {
          this.weekDays.find(
            x =>
              this.getBetterFormattedDate(x.date) ===
              this.getBetterFormattedDate(date)
          ).events = response.data

          // Will need to find a better way to do this. Other ways cause days to lose order or events to not populate
          this.$forceUpdate()
        })
        .catch(error => this.setError(error, 'Error getting events'))
    }
  }
}
</script>

<style>
.day {
  min-width: 15rem;
  max-width: 20rem;
}
</style>
