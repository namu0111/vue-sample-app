<template>
  <div class="hello">
    <h1>Hello, {{ userName }}</h1>
    <p>
      This is Sample App.
    </p>
    <p>
      Use Vue3 + Vuex + Firebase Auth
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userName'])
  }
};
</script>
