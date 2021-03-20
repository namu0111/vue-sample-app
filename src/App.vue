<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
        <v-toolbar-title>マイアドレス帳</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="logout" v-if='$store.state.login_user'>ログアウト</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <SideNav/>
      <v-container align-start>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SideNav from './components/SideNav.vue';
import firebase from 'firebase'

export default {
  name: 'App',

  components: {
    SideNav,
  },
  computed: {
    ...mapGetters(['userName'])
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
      }else{
        this.deleteLoginUser()
      }
    }
    )
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(
      [
        'toggleSideMenu',
        'setLoginUser',
        'logout',
        'deleteLoginUser'
      ]
    )
  },
};
</script>
