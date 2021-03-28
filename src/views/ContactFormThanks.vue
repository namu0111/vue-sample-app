<template>
    <v-container text-xs-center>
        <v-layout row wrap justify-center>
            <v-flex xs5 mt-5>
                <v-card>
                    <v-flex xs12 class="text-center">
                        <h1>フォームが送信されました！</h1>
                    </v-flex>
                    <v-card-text>
                        <form>  
                        <div class="text-center">
                            <v-btn @click="$router.push({ name: 'home' })">Return Home</v-btn>
                        </div>
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>