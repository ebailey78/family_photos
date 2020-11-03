<template>
  <v-container class="fill-height" fluid color="">
    <v-row align="center" justify="center">
      <v-col cols=12 md=6 lg=4 xl=3>
        <v-card class="d-flex flex-column" elevation="5">
          <fp-card-title
            title="Welcome to Family Photos"
            subtitle=""
            icon="fa-user"
            :loading=loading
          ></fp-card-title>
          <v-card-text class="pt-4">
            <p :style="{color: messageColor}">{{message}}</p>
            <v-form v-model="validForm" ref='form'>
              <v-row dense>
                <v-col cols = 12>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols = 12>
                  <v-text-field
                    type="password"
                    label="Password"
                    v-model="password"
                    :rules="[required]"
                    @keypress.enter="login"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text>Reset Password</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :disabled="!valid"><v-icon class="mr-2">fa-sign-in-alt</v-icon>Log In</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        required: (v) => !!v || "Required",
        message: "Please sign in to continue",
        email: "",
        password: "",
        validForm: false,
        loading: false,
        status: "ok"
      }
    },
    computed: {
      messageColor() {
        switch(this.status) {
          case 'error':
            return 'red'
          default:
            return null
        }
      },
      valid() {
        return this.validForm
      }      
    },
    methods: {
      async login() {
        let resp
        try {
          let auth = btoa(`${this.email}:${this.password}`)
          resp = await this.$http.get("users/login", {
            headers: {
              Authorization: `Basic ${auth}`
            }
          })
          this.$store.commit("SET_TOKEN", resp.data.token)
          this.status='ok'
          this.message = "Please enter your email and password to continue"
          this.$router.push({name: 'gallery', params: {view: "tile-large"}})
        } catch(err) {
          let resp = err.response
          this.status = "error"
          this.message = resp.data.message
        } finally {
          this.$refs.form.reset()
        }
      }      
    }
  }
</script>