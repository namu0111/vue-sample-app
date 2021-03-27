<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>連絡先編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="addresses.name" label="名前"></v-text-field>
               <v-text-field v-model="addresses.tel" label="電話番号"></v-text-field>
               <v-text-field v-model="addresses.email" label="メールアドレス"></v-text-field>
               <v-text-field v-model="addresses.address" label="住所"></v-text-field>
               <div class="text-center">
                 <v-btn @click="$router.push({ name: 'addresses' })">キャンセル</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit" v-if=!this.$route.params.address_id>保存</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit" v-if=this.$route.params.address_id>更新</v-btn>
               </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gql from "graphql-tag";
import login_user from '../store/modules/login_user'

const ADD_CONTACT = gql`
    mutation addContact(
      $name: String!
      $mail: String!
      $telephone: String!
      $address: String!
      $created_by: String!
    ){
    insert_contacts(objects: [
      {
        name: $name, mail: $mail, telephone: $telephone, address: $address, created_by: $created_by
        }
      ])
      {
        returning {
        id
        }
      }
    }
`;

const UPDATE_CONTACT = gql`
mutation updateContact(
      $id: Int!
      $name: String!
      $mail: String!
      $telephone: String!
      $address: String!
    ){
  update_contacts(where: {id: {_eq: $id}}, 
  _set: {name: $name, mail: $mail, telephone: $telephone, address: $address}) {
    returning {
      id
    }
  }
}
`;

export default {
  computed: {
    ...mapGetters(
      ['contactName','contactMail','contactTelephone','contactAddress', 'uid'],
      login_user[
        'userId'
      ]
      )
  },
  data () {
    return {
      name: null, 
      mail: null, 
      telephone: null, 
      address: null,
      created_by: null,
      addresses: {}
    }
  },
  methods: {
    async submit () {
      this.addAddress(this.addresses)
      const name = this.$store.getters.contactName
      const mail = this.$store.getters.contactMail
      const telephone = this.$store.getters.contactTelephone
      const address = this.$store.getters.contactAddress
      const created_by = this.$store.getters["login_user/userId"]
      const id = this.$route.params.address_id
      if (this.$route.params.address_id) {
        console.log(this.$route.params.address_id)
        this.$apollo.mutate({
          mutation: UPDATE_CONTACT,
          variables: {
            id,
            name,
            mail,
            telephone,
            address,
          },
          refetchQueries: ["getContacts"]
        });
        console.log('update')
      } else {
        this.$apollo.mutate({
          mutation: ADD_CONTACT,
          variables: {
            name,
            mail,
            telephone,
            address,
            created_by,
          },
          refetchQueries: ["getContacts"]
        });
        this.addAddress(this.address)
        console.log('add')
      }
      this.$router.push({ name: 'addresses' })
      this.address = {}
    },
    ...mapActions(['addAddress'])
  },
};
</script>
