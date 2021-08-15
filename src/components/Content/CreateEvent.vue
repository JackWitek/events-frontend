<template>
  <div
    class="
      max-w-md
      m-auto
      my-2
      px-2
      pb-2
      border border-purple-dark shadow rounded
    "
    >
    <h1 class="pl-2 py-4 font-sans font-light  ">
      Create a new event
    </h1>

    <form @submit.prevent="createEvent">
      <div class="mb-6 mx-2">
        <label for="event_name" class="text-grey font-sans font-light"
          >Event Name</label
        >
        <input
          type="text"
          id="event_name"
          class="input mt-2"
          autofocus
          autocomplete="off"
          placeholder=""
          v-model="newEvent.name"
        />
      </div>
      <div class="mb-6 mx-2">
        <label for="event_desc" class="text-grey font-sans font-light"
          >Event Description</label>
        <input
          type="text"
          id="event_desc"
          class="input mt-2"
          autofocus
          autocomplete="off"
          placeholder=""
          v-model="newEvent.description"
        />
      </div>

      <div v-if="this.date == undefined" class="mb-6 mx-2">
        <VueCtkDateTimePicker
          v-model="newEvent.startTime"
          minute-interval="5"
          input-size="lg"
          color="#4f18b4"
          dark
          label="Click to select start time"
          hint="Start Time"
        />
        <div class="mb-6"></div>
        <VueCtkDateTimePicker
          v-model="newEvent.endTime"
          minute-interval="5"
          input-size="lg"
          dark
          color="#4f18b4"
          label="Click to select end time"
          hint="End Time"
          position="right"
        />
        <p
          v-if="this.getFormattedDuration(newEvent.startTime, newEvent.endTime)"
          class="text-grey mb-6 mt-2 italic ml-2 max-w-sm"
        >
          Duration:
          {{ this.getFormattedDuration(newEvent.startTime, newEvent.endTime) }}
        </p>
      </div>
      <div v-if="this.date !== undefined" class="mb-6 w-full flex ">
        <div class="flex-1 px-2">
          <p class="text-center text-white font-sans font-light pb-2">
            Start Time:
          </p>
          <VueCtkDateTimePicker
            v-model="newEvent.startTime"
            minute-interval="5"
            v-bind:onlyTime="true"
            id="timepicker"
            format="hh:mm a"
            formatted="hh:mm a"
            dark
            outputFormat="hh:mm a"
            inline
            label="Click to select start time"
            hint="Start Time"
          />
        </div>
        <div class="flex-1 px-2">
          <p class="text-center text-white font-sans font-light pb-2">
            End Time:
          </p>
          <VueCtkDateTimePicker
            v-model="newEvent.endTime"
            minute-interval="5"
            v-bind:onlyTime="true"
            id="timepicker"
            format="hh:mm a"
            formatted="hh:mm a"
            inline
            dark
            outputFormat="hh:mm a"
            label="Click to select end time"
            hint="End Time"
          />
        </div>
      </div>
      <p
        v-if="
          this.getFormattedDuration(
            this.getDateTime(this.date, newEvent.startTime),
            this.getDateTime(this.date, newEvent.endTime)
          )
        "
        class="text-grey mb-6 mt-2 italic ml-2 max-w-sm"
      >
        Duration:
        {{
          this.getFormattedDuration(
            this.getDateTime(this.date, newEvent.startTime),
            this.getDateTime(this.date, newEvent.endTime)
          )
        }}
      </p>

      <input
        type="submit"
        value="Create event"
        class="
          font-sans font-bold
          mx-auto
          rounded
          cursor-pointer
          no-underline
          bg-deeppurple hover:bg-purple-dark
          block
          w-4/5
          py-4
          text-grey-light
          items-center
          justify-center
          border-purple-darker
        "
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
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import shared from '../../backend/common-functions'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  name: 'create',
  components: {
    VueCtkDateTimePicker
  },
  props: ['date'],
  data () {
    return {
      newEvent: [],
      createErrors: [],
      error: ''
    }
  },
  created () {
    this.getFormattedDate = shared.getFormattedDate
    this.getFormattedDateTime = shared.getFormattedDateTime
    this.setError = shared.setError
    this.getFormattedDuration = shared.getFormattedDuration
    this.getDateTime = shared.getDateTime
  },
  methods: {
    createEvent () {
      this.createErrors = []
      this.error = ''

      if (this.newEvent.name === undefined) {
        this.createErrors.push('Event name is required')
      }
      if (this.newEvent.startTime === undefined) {
        this.createErrors.push('Event start time is required')
      }
      if (this.newEvent.endTime === undefined) {
        this.createErrors.push('Event end time is required')
      }

      if (this.createErrors.length > 0) {
        return
      }
      var sendStartTime, sendEndTime, onEventsPage
      if (this.date === undefined) {
        sendStartTime = new Date(this.newEvent.startTime).toString()
        sendEndTime = new Date(this.newEvent.endTime).toString()
        onEventsPage = true
      } else {
        sendStartTime = this.getDateTime(
          this.date,
          this.newEvent.startTime
        ).toString()

        sendEndTime = this.getDateTime(
          this.date,
          this.newEvent.endTime
        ).toString()
      }

      if (new Date(sendEndTime) <= new Date(sendStartTime)) {
        this.createErrors.push('Event end time must be after start time')
      }

      if (this.createErrors.length > 0) {
        return
      }
      var event = {
        name: this.newEvent.name,
        startTime: sendStartTime,
        endTime: sendEndTime,
        description: this.newEvent.description
      }
      this.$http.secured
        .post('/api/v1/events/', {
          event: event
        })
        .then(response => {
          this.newEvent = []

          if (onEventsPage) {
            this.$emit('updateEventsView', event)
          } else {
            this.$emit('updateRangeView', new Date(this.date))
            this.$vm2.close('modal-create')
          }
        })
        .catch(error => this.setError(error, 'Event creation failed'))
    }
  }
}
</script>

<style></style>
