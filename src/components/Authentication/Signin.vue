<template>
  <div class="max-w-sm m-auto my-8 bg-black">
    <div class="border p-10 border-purple-dark shadow rounded">
      <h3 class="text-2xl mb-5 text-grey-lighter">Sign In</h3>

      <form @submit.prevent="signin" autocomplete="off">
        <div class="error" id="error" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">Email</label>
          <input type="email" autocomplete="off" v-model="email" class="input" id="email" placeholder="">
        </div>
        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input" id="password" placeholder="">
        </div>
        <button type="submit" id="loginButton" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-deeppurple hover:bg-purple-dark block w-full py-4 text-grey-light items-center justify-center">Sign In</button>
        <div class="my-4"><router-link to="/signup" class="link-grey">Sign Up</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },

  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email.toLowerCase(), password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },

    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
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

    signinFailed () {
      this.error = ('Email/password combo not found')
      delete localStorage.csrf
      delete localStorage.signedIn
      delete localStorage.user
      delete localStorage.email
    },

    getTime () {
      var today = new Date()
      return today
    },

    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/home')
      }
    }
  }
}
</script>
