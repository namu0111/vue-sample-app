<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>マイアドレス帳</h1>
        <p>マイアドレス帳をご利用の方は、Googleアカウントでログインしてください。</p>
      </v-flex>

      <v-flex xs12 mt-5>
        <v-btn color='info' @click="login">Firebase Auth Log In</v-btn>
      </v-flex>

      <v-flex xs12 mt-5>
        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
        <!-- show login when not authenticated -->
        <v-btn color='info' v-if="!$auth.isAuthenticated" @click="login">Auth0 Log in</v-btn>
        <!-- show logout when authenticated -->
        <v-btn color='info' v-if="$auth.isAuthenticated" @click="logout">Auth0 Log out</v-btn>
        </div>
      </v-flex>

      <v-flex xs12>
        <div v-if="$auth.isAuthenticated">
          <p>{{ $auth.user.name }}</p>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

export default {
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
  },

}
</script>
