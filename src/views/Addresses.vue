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
        <v-data-table :headers='headers' :items='contacts'>
          <template v-slot:[`item.action`]="{ item }">
            <router-link :to="{ name: 'address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
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
      id
      name
      mail
      telephone
      address
    }
  }
`;

const DELETE_CONTACT = gql`
    mutation deleteContact(
        $id: Int!
    ) {
        delete_contacts(where: {id: {_eq: $id}}){
          affected_rows
        }
    }
`;

export default {
  methods: {
    deleteConfirm (id) {
        if (confirm('削除してよろしいですか？')) {
          this.deleteContact(id)
        }
    },
    deleteContact(id) {
        this.$apollo.mutate({
            mutation: DELETE_CONTACT,
            variables: {
                id
            },
            refetchQueries: ["getContacts"]
        });            
      },
  },
  data () {
    return {
      headers: [
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'telephone' },
        { text: 'メールアドレス', value: 'mail' },
        { text: '住所', value: 'address' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      contacts: [],
    }
  },
  apollo: {
    contacts: GET_CONTACTS
  },
}
</script>