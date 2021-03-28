<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>お問い合わせ</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <form>  
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-textarea
                v-model="content"
                :error-messages="contentErrors"
                label="Content"
                required
                @change="$v.content.$touch()"
                @blur="$v.content.$touch()"
              ></v-textarea>
              <!-- <input type="hidden" v-model="_subject" name="_subject" value="お問い合わせを受領しました" /> -->
               <div class="text-center">
                 <v-btn @click="$router.push({ name: 'home' })">Return Home</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit">Submit</v-btn>
               </div>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    validations: {
      name: { required, },
      email: { required, email },
      content: { required },
    },
    data: () => ({
      name: '',
      email: '',
      content: '',
      endpoint: process.env.VUE_APP_FORMSPREE_ENDPOINT,
    }),
    computed: {
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
      contentErrors () {
        const errors = []
        if (!this.$v.content.$dirty) return errors
        !this.$v.content.required && errors.push('Content is required')
        return errors
      },
    },
    methods: {
      async submit() {
        this.$v.$touch()
        const data = {
          name: this.name,
          email: this.email,
          content: this.content,
          _replyto: this.email,
          _subject: 'お問い合わせを受領しました',
        }
        try{
          if (!this.$v.$invalid) {
            const request = await this.axios.post(this.endpoint, data)
            await console.log(request)
            await this.$router.push({ name: 'contact-form-thanks' })
          }else{
            console.log("validate error")
          }
        } catch(error) {
            console.log("Failed!")
            console.log("error:", error)
            await this.$router.push({ name: 'error' })
        }  
        
      },
    },
  }
</script>