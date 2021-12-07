import { createStore } from 'vuex'


export const store = createStore({
  debug: true,

  state: reactive({
    message: 'Hello World from Vuex Store !'
  }),

  setMessageAction(newValue) {
    if (this.debug) {
      console.log('setMessageAction triggered with', newValue)
    }

    this.state.message = newValue
  },

  clearMessageAction() {
    if (this.debug) {
      console.log('clearMessageAction triggered')
    }

    this.state.message = ''
  }
})