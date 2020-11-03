<template>
    <div class="text-center">
    <v-dialog 
      v-model="showDialog" 
      persistent
      :fullscreen="$vuetify.breakpoint.mobile"
      width="50%"
    >
      <v-card class="d-flex flex-column"> 
        <fp-card-title
          title="Add a New Person"
          subtitle="Please provide as many details as possible"
          :loading="loading"
        ></fp-card-title>
        <v-card-text>
          <v-row>
            <fp-name-input v-model="newName"></fp-name-input>
          </v-row>
          <v-row>
            <v-col cols=12 md=6>
              <v-card>
                <v-list flat>
                  <v-subheader>Names</v-subheader>
                  <template v-for="(name, i) in names" >
                    <v-list-item :key='i'>
                      <v-list-item-icon><v-icon>fa-id-card</v-icon></v-list-item-icon>
                      <v-list-item-content>{{name.lastName}} {{name.suffix}}, {{name.firstName}} {{name.middleName}}</v-list-item-content>
                      <v-divider></v-divider>
                      <v-list-item-action><v-btn icon @click="removeName(i)"><v-icon color="error" small>fa-trash</v-icon></v-btn></v-list-item-action>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols=12 md=6>
              <v-expansion-panels multiple v-model="eventPanels">
                <v-expansion-panel>
                  <v-expansion-panel-header><span><v-icon class="mr-2">mdi-cake-variant</v-icon>Birth</span></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <fp-date-picker v-model="birthdate" label="Birth Date"></fp-date-picker>
                    <v-text-field
                      dense
                      label="Place of Birth"
                      v-model="birthPlace"
                      prepend-icon="mdi-earth"
                    ></v-text-field>                  
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header><span><v-icon class="mr-2">mdi-grave-stone</v-icon>Death</span></v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <fp-date-picker v-model="deathdate" label="Death Date"></fp-date-picker>
                    <v-text-field
                      dense
                      label="Place of Death"
                      v-model="deathPlace"
                      prepend-icon="mdi-earth"
                    ></v-text-field>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
   
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="clearDialog" text>Cancel</v-btn>
          <v-btn @click="savePerson" color="primary"><v-icon class="mr-2">fa-user-plus</v-icon>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
  export default {
    name: "fpNewPersonDialog",
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        birthdate: null,
        birthPlace: null,
        deathdate: null,
        deathPlace: null,
        eventPanels: [0],
        newName: {
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: ""
        },
        names: [],
        loading: false
      }
    },
    computed: {
      showDialog: {
        get() {return this.visible},
        set(v) {
          this.$emit("update:visible", v)
        }
      },
    },
    methods: {
      removeName(index) {
        console.log(index)
        this.names.splice(index, 1)
      },
      clearDialog() {
        this.names = []
        this.newName = {
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: ""
        }
        this.birthdate = null
        this.deathdate = null
        this.birthPlace = null
        this.deathPlace = null
      },
      savePerson() {
        let person = {
          names: this.names,
          birthdate: this.birthdate,
          birthplace: this.birthPlace,
          deathdate: this.deathdate,
          deathplace: this.deathPlace
        }
        this.$http.post("people", person)
      }
    },
    watch: {
      newName(v) {
        if(v.firstName !== "") {
          this.names.push(v)
          this.newName = {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: ""
          }
        }
      },
      names: {
        handler(v) {
          console.log(v)
        },
        deep: true
      }
    }
  }
</script>