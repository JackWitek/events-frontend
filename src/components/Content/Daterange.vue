<template>
  <div class="justify-center  max-w-full m-auto mt-5">
    <div class="flex justify-center">
      <h1
        class="text-purple font-normal leading-normal justify-center mt-1 mb-2 "
      >
        {{ this.daterange.name }}
      </h1>
    </div>
    <ul class="list-reset m-auto flex flex-wrap justify-center">
      <li class=" inline-flex" v-for="day in days" :key="day.startDate">
        <div>
          <form action="" v-on:change="updateDaterange()">
            <div class="mb-6 ml-2 p-4 rounded border border-blue-light mt-4">
              <h3 class="pb-1">{{ getFormattedShortDate(day.date) }}</h3>
              <div class="mb-6 mt-3">
                <label class="label">Location</label>
                <input class="input" v-model="day.location" />
              </div>
              <div class="mb-6">
                <label class="label">Events</label>

                <DayEvents v-bind:events="day.events" />
              </div>
                <button
                  class="bg-transparent text-sm hover:bg-purple-darkest hover:text-purple-light text-purple border border-purple no-underline mx-auto block font-bold py-2 px-4 rounded"
                  @click.prevent="addEvent(day.date)"
                >
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
      <BackButton class=" mx-auto " location="Dateranges" />
    </div>
  </div>
</template>

<script>
import shared from '../../backend/common-functions'

import CreateEventModal from '@/components/Content/CreateEventModal.vue'
import DayEvents from '@/components/Content/DayEvents.vue'
import BackButton from '@/components/Content/BackButton.vue'

export default {
  name: 'daterange',
  components: { CreateEventModal, DayEvents, BackButton },

  data () {
    return {
      days: [],
      events: [],
      showModal: false,
      addingToDay: '',
      daterange: {}
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
    } else {
      this.$http.secured
        .get('/api/v1/dateranges/' + this.$route.query.id)
        .then(response => {
          this.daterange = response.data
          this.getDays(this.daterange.data)
        })
        .catch(error => this.setError(error, "Couldn't get events"))
    }
  },
  methods: {
    getDays (data) {
      var json = JSON.parse(data)

      for (var day of json) {
        day.date = new Date(day.date).toString()
        this.days.push(day)
        this.getEvents(day.date)
      }
    },

    addEvent (date) {
      this.addingToDay = this.getBetterFormattedDate(date)
      this.$vm2.open('modal-create')
    },

    getEvents (date) {
      this.$http.secured
        .get(`/api/v1/events/dates/${date}`)
        .then(response => {
          this.days.find(
            x =>
              this.getBetterFormattedDate(x.date) ===
              this.getBetterFormattedDate(date)
          ).events = response.data

          // Will need to find a better way to do this. Other ways cause days to lose order or events to not populate
          this.$forceUpdate()
        })
        .catch(error => this.setError(error, 'Error getting events'))
    },
    updateDaterange () {
      this.$http.secured
        .patch(`/api/v1/dateranges/${this.daterange.id}`, {
          daterange: { data: JSON.stringify(this.days) }
        })
        .catch(error => this.setError(error, 'Cannot update daterange'))
    }
  }
}
</script>

<style></style>
