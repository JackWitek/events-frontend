<template>
  <ul class="list-reset overflow-auto h-64">
    <li class="" v-for="event in events" v-bind:key="event.startTime">
      <div class="mb-6 ml-1 p-1 w-48 rounded border border-blue-light mt-4">
        <div class="pl-1 w-40">
          <span class="font-sans text-sm"
            ><span class="font-bold">Name:</span> {{ event.name }}</span
          >
          <br />
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
      </div>
    </li>
  </ul>
</template>

<script>
import shared from '../../backend/common-functions'

export default {
  props: ['events'],
  created () {
    this.getFormattedDateTime = shared.getFormattedDateTime
    this.getFormattedDuration = shared.getFormattedDuration
  }
}
</script>

<style>
.vm2_modal-content {
  background-color: black !important;
  width: 400px !important;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #141414;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(100, 100, 100);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(182, 182, 182);
}
</style>
