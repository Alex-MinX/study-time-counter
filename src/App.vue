<template>
<v-app id="inspire">
  <!--
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>

        <v-list-tile @click="signup">
            <v-list-tile-action>
                <v-icon>account_box</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>Sign up</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="login">
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      
      </v-list>
    </v-navigation-drawer>
  -->

    <v-toolbar color="light blue" dark fixed app>
      <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->

      <v-toolbar-title>Study time counter</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        light
        @click="signup"
        >
        Sign up
      </v-btn>

      <v-btn
        light
        @click="login"
        >
        Login
      </v-btn>

      <v-btn
        icon
        @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>

    </v-toolbar>

    <v-content>
      <v-container fluid fill-height grid-list-md>
        <v-layout
          justify-center
          align-start
        >
          <signupWindow
            v-if="visControl.signup"
          ></signupWindow>

          <loginWindow
            v-if="visControl.login"
          ></loginWindow>

          <mainWindow
            v-if="visControl.main"
          ></mainWindow>

        </v-layout>
      </v-container>
    </v-content>

    <v-footer color="light blue" app>
      <span class="white--text">&copy; 2018 Min Xie All Rights Reserved</span>
    </v-footer>

  </v-app>
</template>

<script>
//import signupBtn from './components/auth_control/signupBtn.vue'
//import loginBtn from './components/auth_control/loginBtn.vue'
//import logoutBtn from './components/auth_control/logoutBtn.vue'

import signupWindow from './components/auth_control/signupWindow.vue'
import loginWindow from './components/auth_control/loginWindow.vue'
import mainWindow from './components/mainWindow/mainWindow.vue'

import * as firebase from 'firebase';


export default {
  name: 'app',
  data: () => ({
    drawer: null,
    signupShow: false,
    loginShow: false,
    logoutShow: false
  }),
  props: {
      source: String
  },
  components: {
    signupWindow,
    loginWindow,
    mainWindow
  },
  created () {
    this.$store.dispatch('userStateObserver');
  },
  computed: {
    visControl () {
      return this.$store.getters.visControl
    }
  },
  methods: {
    signup () {
      this.$store.commit('signupVis')
    },
    login () {
      this.$store.commit('loginVis')
    },
    logout () {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style>

</style>
