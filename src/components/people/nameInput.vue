<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols=12 md=3>
          <v-text-field
            label="First Name"
            v-model="firstName"
          ></v-text-field>
        </v-col>
        <v-col cols=12 md=3>
          <v-text-field
            label="Middle Name"
            v-model="middleName"
          ></v-text-field> 
        </v-col>
        <v-col cols=12 md=3>
          <v-text-field
            label="Last Name"
            v-model="lastName"
          ></v-text-field>
        </v-col>
        <v-col cols=12 md=2>
          <v-text-field
            label="Suffix"
            v-model="suffix"
          ></v-text-field>
        </v-col>
        <v-col cols=1>
          <v-btn @click="add">Add</v-btn>
        </v-col>
      </v-row> 
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "fpNameInput",
  props: {
    value: {
      type: Object,
      default: function() {
        return {
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: ""
        }
      }
    }
  },
  data() {
    return {
      firstName: this.value.firstName,
      middleName: this.value.middleName,
      lastName: this.value.lastName,
      suffix: this.value.suffix
    }
  },
  computed: {
    fullName() {
      return {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        suffix: this.suffix        
      }
    }
  },
  methods: {
    add() {
      this.$emit("input", this.fullName)
    }
  }
}
</script>