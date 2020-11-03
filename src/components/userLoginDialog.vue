<template>
  <div class="text-center">
    <v-dialog
      v-model="showDialog"
      persistent
      :fullscreen="$vuetify.breakpoint.mobile"
      max-width="400"
    >
      <v-card class="d-flex flex-column">
        <fp-card-title
          title="Sign In to Family Photos"
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
    </v-dialog>
  </div>
</template>

<script>

  export default {
    name: "fpUserLoginDialog",
    data() {
      return {
        required: (v) => !!v || "Required",
        email: "",
        password: "",
        validForm: false,
        loading: false,
        status: 'ok',
        message: "Please enter you remail and password to continue"
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
      showDialog() {
        return !this.$store.getters['loggedIn']
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
          window.setTimeout(() => {
            this.$refs.form.reset()
          }, 500)

        } catch(err) {
          let resp = err.response
          this.status = "error"
          this.message = resp.data.message
        }
      }
    }
  }
</script>