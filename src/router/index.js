import Vue from 'vue'
import Router from 'vue-router'

import Signin from '@/components/Authentication/Signin.vue'
import Signup from '@/components/Authentication/Signup.vue'

import Home from '@/components/Content/Home.vue'
import Events from '@/components/Content/Events.vue'
import Dateranges from '@/components/Content/Dateranges.vue'
import Week from '@/components/Content/Week.vue'
import Daterange from '@/components/Content/Daterange.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },

    {
      path: '/dateranges',
      name: 'Dateranges',
      component: Dateranges,
      props: true
    },

    {
      path: '/week',
      name: 'Week',
      component: Week,
      props: true
    },

    {
      path: '/daterange',
      name: 'Daterange',
      component: Daterange,
      props: true
    }
  ]
})
