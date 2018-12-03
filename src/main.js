import Vue from 'vue'
import App from './App.vue'

import './plugins/vuetify'
import { store } from './store/store';
import * as firebase from 'firebase'

import VueCalendarHeatmap from 'vue-calendar-heatmap'
Vue.use(VueCalendarHeatmap)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDaQqQ9X2i919YQShcgBbyJjeFwbLLug38',
      authDomain: 'studytimecounter.firebaseapp.com',
      databaseURL: 'https://studytimecounter.firebaseio.com',
      projectId: 'studytimecounter',
      storageBucket: 'studytimecounter.appspot.com',
      messagingSenderId: '577907064691'
    })
  }
}).$mount('#app')
