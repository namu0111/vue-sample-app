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
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="名前"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="telephone"
                :error-messages="telephoneErrors"
                label="電話番号"
                required
                @input="$v.telephone.$touch()"
                @blur="$v.telephone.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="メール"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-textarea
                v-model="address"
                :error-messages="addressErrors"
                label="住所"
                required
                @change="$v.address.$touch()"
                @blur="$v.address.$touch()"
              ></v-textarea>
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
import { required, email } from 'vuelidate/lib/validators'

const ADD_CONTACT = gql`
    mutation addContact(
      $name: String!
      $email: String!
      $telephone: String!
      $address: String!
      $created_by: String!
    ){
    insert_contacts(objects: [
      {
        name: $name, mail: $email, telephone: $telephone, address: $address, created_by: $created_by
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
      $email: String!
      $telephone: String!
      $address: String!
    ){
  update_contacts(where: {id: {_eq: $id}}, 
  _set: {name: $name, mail: $email, telephone: $telephone, address: $address}) {
    returning {
      id
    }
  }
}
`;

const GET_CONTACT = gql`
  query getContact (
    $id: Int!
  ){
    contacts_by_pk (id: $id) {
      id
      name
      mail
      telephone
      address
    }
  }
`;

export default {
  async created () {
    console.log("created")
    if(!this.$route.params.address_id) {
      this.id = 0
    }
  },
  async beforeUpdate() {
    console.log("beforeUpdate")
    if (this.$route.params.address_id) {
      console.log("edit")
      this.name = await this.contacts_by_pk.name
      this.email = await this.contacts_by_pk.mail
      this.telephone = await this.contacts_by_pk.telephone
      this.address = await this.contacts_by_pk.address
    }else{
      console.log("add")
    }
  },
  computed: {
    ...mapGetters(
      ['contactName','contactMail','contactTelephone','contactAddress', 'uid'],
      login_user[
        'userId'
      ]
    ),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    telephoneErrors () {
      const errors = []
      if (!this.$v.telephone.$dirty) return errors
      !this.$v.telephone.required && errors.push('Telephone is required')
      return errors
    },
    addressErrors () {
      const errors = []
      if (!this.$v.address.$dirty) return errors
      !this.$v.address.required && errors.push('Address is required')
      return errors
    },
  },
  validations: {
    name: { required, },
    email: { required, email },
    telephone: { required },
    address: { required },
  },
  data () {
    return {
      name: '', 
      email: '', 
      telephone: '', 
      address: '',
      created_by: '',
      addresses: {},
      id: this.$route.params.address_id,
      contact: [],
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()

      this.addresses.name = this.name
      this.addresses.email = this.email
      this.addresses.tel = this.telephone
      this.addresses.address = this.address
      this.addAddress(this.addresses)

      const name = this.$store.getters.contactName
      const email = this.$store.getters.contactMail
      const telephone = this.$store.getters.contactTelephone
      const address = this.$store.getters.contactAddress
      const created_by = this.$store.getters["login_user/userId"]
      const id = this.$route.params.address_id

      try{
        if (!this.$v.$invalid) {
          if (this.$route.params.address_id) {
            console.log(this.$route.params.address_id)
            this.$apollo.mutate({
              mutation: UPDATE_CONTACT,
              variables: {
                id,
                name,
                email,
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
                email,
                telephone,
                address,
                created_by,
              },
              refetchQueries: ["getContacts"]
            });
            this.addAddress(this.address)
            console.log('add')
          }
          // this.$router.push({ name: 'addresses' })
        }else{
          console.log("validate error")
        }
      } catch(error) {
          console.log("Failed!")
          console.log("error:", error)
      }  
      this.addresses = {}
    },
    ...mapActions(['addAddress'])
  },
  apollo: {
    contacts_by_pk: {
      query: GET_CONTACT,
      variables() {
        return {
          id: this.id
        }
      },
    }
  },
};
</script>
