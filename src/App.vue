<template>
  <v-app>
    <AppBar/>
    <v-content>
      <v-container v-show='$auth.isAuthenticated'>
       <SideNav/>
      </v-container>
      <v-container align-start>
       <Error />
      </v-container>
      <v-container align-start>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import SideNav from './components/SideNav.vue';
import Error from "./components/Error";

export default {
  name: 'App',

  components: {
    AppBar,
    SideNav,
    Error,
  },
  computed: {

  },
  data: () => ({

  }),
  methods: {

  },
};
</script>
