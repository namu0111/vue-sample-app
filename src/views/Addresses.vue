<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'address_edit' }">
          <v-btn color="info">
            連絡先追加
          </v-btn>
        </router-link>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='contacts' loading-text="Loading... Please wait">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.telephone }}</td>
            <td class="text-xs-left">{{ props.item.mail }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

const GET_CONTACTS = gql`
  query getContacts {
    contacts(order_by: {created_at: desc}) {
      name
      mail
      telephone
      address
    }
  }
`;

export default {
  created () {

  },
  data () {
    return {
      headers: [
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'telephone' },
        { text: 'メールアドレス', value: 'mail' },
        { text: '住所', value: 'address' }
      ],
      contacts: [],
    }
  },
  apollo: {
    contacts: GET_CONTACTS
  },
}
</script>