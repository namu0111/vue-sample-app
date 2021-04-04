<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Delete!
        </v-card-title>
        <v-card-text>Are you want id:{{ value }} delete?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteContact"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import gql from 'graphql-tag';

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
    props: ['value'],
    data () {
      return {
        dialog: false,
      }
    },
   methods: {
     open(){
       this.dialog = true
       console.log(this)
     },
     deleteContact(){
       this.deleteContactMutate(this.value)
       console.log('deleted')
       this.$emit('snack', 'success', 'Data deleted')
       this.dialog = false
     },
     close(){
       this.$emit('snack', 'error', 'Canceled')
       this.dialog = false
     },
    deleteContactMutate(id) {
        this.$apollo.mutate({
            mutation: DELETE_CONTACT,
            variables: {
                id
            },
            refetchQueries: ["getContacts"]
        });            
      },
    },
  }
</script>