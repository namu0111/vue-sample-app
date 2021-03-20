<template>
    <v-navigation-drawer
        :mini-variant="$store.state.miniVariant"
        permanent
        clipped
        absolute
    >

        <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.link"
            >
                <v-tooltip right>
                  <span>{{ item.title }}</span>
                  <template v-slot:activator="{ on, attrs }">           
                    <v-list-item-icon v-on="on" v-bind="attrs">
                    <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon> 
                  </template>
                </v-tooltip>
                <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city', link: { name: 'home'} },
          { title: 'My Account', icon: 'mdi-card-account-mail-outline', link: { name: 'addresses' } },
          { title: 'Profile', icon: 'mdi-account' },
        ],
      }
    },
  }
</script>