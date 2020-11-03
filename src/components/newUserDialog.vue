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
          title="Create a New User"
          subtitle="Admins Only!"
          icon="fa-user-plus"
          :loading=loading
        ></fp-card-title>
        <v-card-text>
          <v-form v-model="validForm">
            <v-row dense>
              <v-col cols = 12 lg=6>
                <v-text-field
                  label="First Name"
                  v-model="first_name"
                  :rules="[required]"
                ></v-text-field>
              </v-col>
              <v-col cols = 12 lg=6>
                <v-text-field
                  label="Last Name"
                  v-model="last_name"
                  :rules="[required]"
                ></v-text-field>
              </v-col>
              <v-col cols = 12>
                <v-text-field
                  label="Email Address"
                  :rules="[required, validEmail]"
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols = 12>
                <v-select
                  label="Access Level"
                  :items="['admin', 'contributor', 'viewer']"
                  v-model="access_level"
                  :rules="[required]"
                ></v-select>
              </v-col>
              <v-col cols = 12 lg=6>
                <v-text-field
                  label="Password"
                  type="password"
                  :rules="[required]"
                  v-model="password"
                ></v-text-field>
              </v-col>
              <v-col cols = 12 lg=6>
                <v-text-field
                  label="Repeat Password"
                  type="password"
                  :rules="[required, passwordMatch]"
                  v-model="password_repeat"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showDialog=false">Cancel</v-btn>
          <v-btn color="primary" @click="addUser" :disabled="!valid"><v-icon class="mr-2">fa-user-plus</v-icon>Add User</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "fpNewUserDialog",
    data() {
      return {
        required: (v) => !!v || "Required",
        validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        passwordMatch: v => v === this.password || 'Passwords must match',
        first_name: "",
        last_name: "",
        access_level: "viewer",
        email: "",
        password: "",
        password_repeat: "",
        validForm: false,
        loading: false
      }
    },
    computed: {
      showDialog: {
        get() {
          return this.$store.getters['newUserDialog']
        },
        set(v) {
          this.$store.commit("SET_NEW_USER_DIALOG", v)
        }
      },
      valid() {
        return this.validForm
      }
    },
    methods: {
      addUser() {
        let payload = {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          access_level: this.access_level,
          password: this.password
        }
        console.log("Ding!")
        this.$http.post("users", payload)
        this.showDialog = false
      }
    }
  }
</script>