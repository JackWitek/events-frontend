<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-purple-dark shadow rounded">
      <h3 class="text-2xl mb-5 text-grey-lighter">Sign Up</h3>
      <form @submit.prevent="signup" autocomplete="off">
        <div class="error" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="Name" class="label">Name</label>
          <input
            type="username"
            v-model="name"
            class="input"
            id="name"
            placeholder=""
            autocomplete="off"
          />
        </div>

        <div class="mb-6">
          <label for="email" class="label">Email</label>
          <input
            type="email"
            v-model="email"
            class="input"
            id="email"
            placeholder=""
            autocomplete="off"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            v-model="password"
            class="input"
            id="password"
            placeholder=""
            autocomplete="off"
          />
        </div>

        <div class="mb-6">
          <label for="password_confirmation" class="label"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="password_confirmation"
            class="input"
            id="password_confirmation"
            placeholder=""
          />
        </div>
        <button
          type="submit"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-purple-dark hover:bg-purple block w-full py-4 text-white items-center justify-center"
        >
          Sign Up
        </button>

        <div class="my-4">
          <router-link to="/" class="link-grey">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain
        .post('/signup', {
          name: this.name,
          email: this.email.toLowerCase(),
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },

    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      localStorage.user = this.email
      localStorage.email = this.email
      this.error = ''
      this.$root.$emit('updateHeader')

      this.$router.replace('/home')
    },

    signupFailed (error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
      delete localStorage.user
      delete localStorage.email
    },

    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/home')
      }
    }
  }
}
</script>
