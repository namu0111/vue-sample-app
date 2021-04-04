<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
        <v-card>
            <v-card-title>
                <span class="headline">連絡先編集 {{ value }}</span>
            </v-card-title>
                <v-card-text>
                    <v-form ref='form'>
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
                            <v-btn @click="close">キャンセル</v-btn>
                            <v-btn color="info" class="ml-2" @click="submit" v-if=!this.value>保存</v-btn>
                            <v-btn color="info" class="ml-2" @click="submit" v-if=this.value>更新</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import gql from "graphql-tag";
import login_user from '../store/modules/login_user'
import { required, email } from 'vuelidate/lib/validators'
import { getContact } from '../graphql/contacts/contacts-query.gql'
import { updateContact, addContact } from '../graphql/contacts/contacts-mutation.gql'

const UPDATE_CONTACT = updateContact
const ADD_CONTACT = addContact
const GET_CONTACT = getContact

export default {
    props: ['value'],
    async beforeCreated () {
        console.log("beforeCreated")
    },
    async created () {
        console.log("created")
    },
    async beforeMount () {
        console.log("beforeMount")
    },
    async mounted() {
        console.log("mounted")
    },
    async beforeUpdate () {
        console.log("beforeUpdate")
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
        id: null,
        contact: [],
        dialog: false,
        }
    },
    methods: {
        async open(){
            await this.setContactId();
            console.log("this id: ", this.id)
            if(this.value){
                await this.editForm()
                console.log("edit")
                await this.openTrue()
            }else{
                console.log("new")
                await this.openTrue()
            }
        },
        openTrue(){
            this.dialog = true
        },
        async editForm(){
            await this.$apollo.queries.contacts_by_pk.refetch()
            console.log("contacts_by_pk: ",this.contacts_by_pk)
            this.name =  await this.contacts_by_pk.name
            this.email = await this.contacts_by_pk.mail
            this.telephone = await this.contacts_by_pk.telephone
            this.address = await this.contacts_by_pk.address
        },
        resetForm(){
            this.name =  null
            this.email = null
            this.telephone = null
            this.address = null
        },
        setContactId(){
            if(this.value){
                this.id = this.value
            }else{
                this.id = null
            }
        },
        close(){
            this.resetForm();
            this.dialog = false
        },
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
            const id = this.id

        try{
            if (!this.$v.$invalid) {
            if (this.id) {
                console.log('mutate id: ', this.id)
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
            this.close();
            this.$v.$reset();
            this.addresses = {}
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