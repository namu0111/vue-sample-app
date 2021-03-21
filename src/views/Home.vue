<template>
  <div>
    <h1 v-if="!$auth.isAuthenticated">Hello, {{ userName }}</h1>
    <p>
      This is Sample App.
    </p>
    <p>
      Use Vue3 + Vuex + Firebase Auth
    </p>
    <div v-if="$auth.isAuthenticated">
      <h2>
        Thank you Log In!
      </h2>
      <h2>User Name: {{ $auth.user.name }}</h2>
    </div>
    <h2 link v-if="!$auth.isAuthenticated" >
      <a @click="login">Plese Log In!</a> or <a @click="signup">Sign Up!</a>
    </h2>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userName'])
  },
  methods: {
    // Auth0 Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    signup() {
      this.$auth.loginWithRedirect({ screen_hint: 'signup' });
    },
  },
};
</script>
