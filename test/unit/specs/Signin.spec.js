import Vue from 'vue'
import Signin from '@/components/Authentication/Signin'

describe('Signin.vue', () => {
  it('should show sign in button', () => {
    const Constructor = Vue.extend(Signin)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#loginButton').textContent)
      .to.equal('Sign In')
  })

  it('can click button', () => {
    const Constructor = Vue.extend(Signin)
    const vm = new Constructor().$mount()

    let button = vm.$el.querySelector('#loginButton')
    button.click()
  })
})
