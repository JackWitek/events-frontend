<template>
  <div class="max-w-lg m-auto mt-5">
    <CreateEvent @updateEventsView="updateList" />
    <hr class="border border-blue-darkest my-6" />
    <div class="text-red" v-if="error">{{ error }}</div>

    <div>
      <h2 v-if="events.length != 0" class="mt-5 text-white font-sans font-light">Your events:</h2>
      <h2 v-if="events.length == 0" class="mt-5 text-white font-sans font-light">You have no events</h2>
      <ul class="list-reset">
        <li
          class="py-4 max-w-lg"
          v-for="event in events"
          :key="event.id"
          :event="event"
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
                {{ event.name }} &mdash; {{ getFormattedDate(event.startTime) }}
              </p>
            </div>

            <button
              class="bg-transparent text-sm hover:bg-blue hover:text-white font-sans text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
              @click.prevent="editEvent(event)"
            >
              Edit
            </button>

            <button
              class="bg-transparent text-sm hover:bg-red text-red hover:text-white font-sans no-underline font-bold py-2 px-4 rounded border border-red"
              @click.prevent="removeEvent(event)"
            >
              Delete
            </button>
          </div>
          <div class="pl-6">
            <span class="font-sans text-sm"
              ><span class="font-bold">Description:</span>
              {{ event.description }}</span
            >
            <br />
            <span class="font-sans text-sm"
              ><span class="font-bold">Start:</span>
              {{ getFormattedDateTime(event.startTime) }}</span
            >
            <br />
            <span class="font-sans text-sm"
              ><span class="font-bold">End:</span>
              {{ getFormattedDateTime(event.endTime) }}</span
            >
            <br />
            <span class="font-sans text-sm"
              ><span class="font-bold">Duration:</span>
              {{ getFormattedDuration(event.startTime, event.endTime) }}</span
            >
          </div>

          <div v-if="event == editedEvent">
            <form action="" @submit.prevent="updateEvent(event)">
              <div
                class="mb-6 p-4 bg-black border border-purple-dark shadow rounded mt-4"
              >
                <div class="mb-6">
                  <label class="label">Name</label>
                  <input class="input" v-model="event.name" />
                </div>

                <div class="mb-6">
                  <label class="label">Description</label>
                  <input class="input" v-model="event.description" />
                </div>

                <input
                  type="submit"
                  value="Update"
                  class="bg-transparent text-sm cursor-pointer font-sans hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
                />
              </div>
            </form>
          </div>
        </li>
        <div class="p-3 justify-center">
          <BackButton class="mx-auto " location="Home" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import shared from '../../backend/common-functions'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import CreateEvent from '@/components/Content/CreateEvent.vue'
import BackButton from '@/components/Content/BackButton.vue'

export default {
  name: 'eventsPage',
  components: {
    CreateEvent,
    BackButton
  },
  data () {
    return {
      events: [],
      editedEvent: '',
      error: ''
    }
  },
  created () {
    this.getFormattedDate = shared.getFormattedDate
    this.getFormattedDateTime = shared.getFormattedDateTime
    this.setError = shared.setError
    this.getFormattedDuration = shared.getFormattedDuration

    if (!localStorage.signedIn) {
      this.$router.replace('/')
      console.log('Not signed in')
    } else {
      this.$http.secured
        .get('/api/v1/events')
        .then(response => {
          this.events = response.data
        })
        .catch(error => this.setError(error, "Couldn't get events"))
    }
  },
  methods: {
    removeEvent (event) {
      this.$http.secured
        .delete(`/api/v1/events/${event.id}`)
        .then(response => {
          this.events.splice(this.events.indexOf(event), 1)
        })
        .catch(error => this.setError(error, 'Event deletion failed'))
    },
    editEvent (event) {
      this.editedEvent = event
    },
    updateEvent (event) {
      this.editedEvent = ''
      this.$http.secured
        .patch(`/api/v1/events/${event.id}`, {
          event: { name: event.name, description: event.description }
        })
        .catch(error => this.setError(error, 'Event update failed'))
    },
    updateList (data) {
      this.events.push(data)
    }
  }
}
</script>

<style></style>
