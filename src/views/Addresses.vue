<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 mr-5 text-right>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="editForm()">
            連絡先追加(Modal)
          </v-btn>
        </v-card-title>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='contacts' :search="search" >
          <template v-slot:[`item.action`]="{ item }">
            <!-- <router-link :to="{ name: 'address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link> -->
            <v-icon small class="mr-2" @click="editForm(item.id)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <ContactEditForm ref='editDialog' :value=actionContactId />
    <ContactDeleteConfirmModal ref='deleteDialog' :value=actionContactId  />
  </v-container>
</template>

<script>
// import gql from 'graphql-tag';
import ContactDeleteConfirmModal from '../components/ContactDeleteConfirmModal.vue';
import ContactEditForm from '../components/ContactEditForm.vue';
import { getContacts } from '../graphql/contacts/contacts-query.gql';

const GET_CONTACTS = getContacts

export default {
  components: {
    ContactDeleteConfirmModal,
    ContactEditForm,
  },
  methods: {
    async deleteConfirm (id){
        await this.setContactId(id);
        await this.$refs.deleteDialog.open();
    },
    async editForm (id){
      await this.setContactId(id);
      await this.$refs.editDialog.open();
    },
    setContactId(id){
      if(id){
        this.actionContactId = id
        console.log("actionContactId: ", this.actionContactId)
      }else{
        this.actionContactId = id
        console.log("actionContactId: ", null)
      }
    },
  },
  data () {
    return {
      search: '',
      headers: [
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'telephone' },
        { text: 'メールアドレス', value: 'mail' },
        { text: '住所', value: 'address' },
        { text: '更新日時', value: 'updated_at' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      contacts: [],
      actionContactId: '',
    }
  },
  apollo: {
    contacts: GET_CONTACTS
  },
}
</script>