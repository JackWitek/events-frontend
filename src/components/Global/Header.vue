<template>
  <header class="bg-darkblue py-4 " :key="componentKey">
    <div class="justify-between flex items-center">
      <div class="flex flex-auto items-center ">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="95.000000pt"
          height="48.000000pt"
          viewBox="0 0 955.000000 980.000000"
          preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            fill="#ffffff"
            stroke="none">
            <path
              d="M4570 12790 c0 -3 9 -31 20 -61 65 -188 53 -370 -55 -774 -68 -254
                -93 -366 -102 -465 l-7 -75 -8 59 c-45 341 -293 644 -672 821 -75 35 -212 85
                -234 85 -3 0 16 -14 43 -32 125 -83 250 -243 362 -463 63 -123 193 -402 193
                -413 0 -4 -16 17 -35 45 -19 29 -62 82 -96 117 -412 441 -1199 476 -2287 104
                -216 -73 -720 -277 -689 -278 4 0 155 31 335 69 632 134 718 145 1087 146 193
                0 317 -4 370 -13 296 -49 588 -146 825 -274 123 -67 211 -120 206 -126 -3 -2
                -22 6 -43 18 -52 31 -210 87 -311 111 -558 130 -1238 -88 -1972 -634 -307
                -228 -596 -484 -945 -838 -229 -232 -525 -550 -525 -563 0 -3 62 43 138 101
                801 618 1263 904 1792 1112 519 204 1024 298 1645 306 206 2 258 1 180 -5
                -699 -52 -1205 -405 -1529 -1065 -238 -482 -364 -1036 -433 -1885 -13 -170
                -17 -335 -17 -785 0 -548 5 -705 40 -1244 13 -217 24 -294 24 -179 0 123 51
                560 100 854 228 1380 711 2612 1323 3379 93 116 324 350 414 418 34 26 64 47
                66 47 3 0 15 -20 27 -45 26 -54 77 -100 147 -132 29 -14 53 -28 53 -32 0 -5
                -75 -186 -166 -402 -631 -1498 -994 -2429 -1274 -3268 -663 -1984 -945 -3721
                -977 -6019 l-6 -472 55 0 c69 0 883 -27 1034 -35 l111 -5 7 423 c45 2831 316
                4516 1177 7317 117 380 231 740 409 1295 71 220 163 508 205 640 43 132 79
                243 81 247 2 3 18 -7 36 -24 148 -138 391 -140 537 -3 68 64 93 120 90 204 -3
                60 12 111 31 111 15 0 269 -305 377 -451 450 -610 770 -1327 947 -2121 66
                -298 89 -442 142 -903 l7 -60 18 125 c137 949 54 1978 -218 2705 -164 436
                -373 756 -638 974 -78 65 -184 135 -260 174 -75 37 -250 95 -340 111 -77 14
                -78 14 -29 15 125 2 537 -48 822 -100 1100 -201 2233 -688 3232 -1389 132 -93
                133 -93 61 -9 -99 114 -402 413 -531 523 -869 745 -1875 1214 -2860 1332 -166
                20 -562 23 -703 5 -55 -7 -100 -11 -103 -9 -4 5 567 112 864 163 731 125 1242
                148 1701 74 380 -60 777 -209 1124 -422 l108 -66 -43 51 c-78 95 -282 292
                -393 381 -429 345 -903 546 -1435 607 -150 17 -478 15 -639 -4 -502 -60 -984
                -234 -1378 -497 -57 -38 -103 -67 -103 -65 0 2 42 37 93 78 137 111 283 243
                567 513 140 134 293 275 340 315 173 146 351 248 546 312 53 18 91 34 86 36
                -24 8 -344 -29 -461 -53 -586 -121 -1063 -458 -1427 -1012 -91 -139 -102 -152
                -79 -98 41 95 88 242 107 337 18 83 22 138 22 283 0 163 -3 189 -27 280 -40
                151 -105 271 -198 369 -43 44 -78 79 -79 76z m-605 -1605 c30 -20 55 -38 55
                -41 0 -4 -106 60 -119 72 -16 15 18 -2 64 -31z"
            />
          </g>
        </svg>

        <a
          href="/"
          class="uppercase display-1 font-mono pl-14 font-semibold no-underline text-grey hover:text-purple"
          >Jack's Events Manager</a>
      </div>
      <div class="px-5">
        <h5 class=" pb-2 mr-2" v-if="signedIn()">
          {{ getEmail() }}
        </h5>
        <router-link
          to="/"
          class="link-grey pxl-40 no-underline"
          v-if="!signedIn()"
          >Sign In</router-link>
        <router-link
          to="/signup"
          class="link-grey px-2 no-underline"
          v-if="!signedIn()"
          >Sign Up</router-link>
        <a
          href="#"
          @click.prevent="signOut"
          class="link-grey px-2 no-underline"
          v-if="signedIn()"
          >Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      componentKey: 0
    }
  },
  mounted () {
    this.$root.$on('updateHeader', data => {
      this.componentKey += 1
    })
  },

  methods: {
    setError (error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text
    },

    signedIn () {
      return localStorage.signedIn
    },

    getEmail () {
      return localStorage.email
    },

    signOut () {
      this.componentKey += 1
      this.$emit('clickedSomething')

      this.$http.secured
        .delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          delete localStorage.user
          delete localStorage.email
          this.$root.$emit('updateHeader', this.time)

          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Error signing out'))
    }
  }
}
</script>
