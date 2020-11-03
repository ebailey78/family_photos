<template>
  <div class="text-center">
    <v-dialog 
      v-model="imageDialog" 
      persistent
      fullscreen
    >
      <v-card class="d-flex flex-column" color="#EEE"> 
        <!-- <v-card-title ref = "dialogTitle">{{image.original_filename}}</v-card-title> -->
        <v-card-text class = "d-flex flex-column flex-grow-1" ref="dialogBody"> 
          <v-container fluid class='d-flex flex-column flex-grow-1'> 
            <v-row class = "flex-grow-1" :class="{'d-flex': $vuetify.breakpoint.mobile, 'flex-column': $vuetify.breakpoint.mobile}">
              <v-col cols=12 lg=8 class="flex-grow-1" style="position: relative">
                <v-img 
                  contain
                  style="cursor: pointer; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"
                  width="100%"
                  :src="image.photoId ? `http://localhost:3000/img/large/${image.photoId}.jpg` : null"
                  :lazy-src="image.thumbnail"
                  @click="fullImageDialog=true"
                ></v-img>
              </v-col>
              <v-col cols=12 lg=4 class="d-flex" style="position: relative">
                <v-container>
                <v-row>
                  <v-col cols=12>
                    <fp-person-selector
                      :photoId="image.photoId"
                    ></fp-person-selector>  
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>  
                    <v-combobox
                      prepend-icon="fa-map-marker-alt"
                      v-model="place"
                      :items="places"
                      label="Place"
                    ></v-combobox>        
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                  <v-combobox
                    prepend-icon="fa-birthday-cake"
                    v-model="event"
                    :items="events"
                    label="Event"
                  ></v-combobox> 
                  </v-col>
                </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
          </v-card-text>
        <v-card-actions ref = "dialogActions">
          <v-spacer></v-spacer>
          <v-btn @click="imageDialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <fp-new-person-dialog
      :visible.sync="showPersonDialog"
    ></fp-new-person-dialog>
    <v-dialog 
      v-model="fullImageDialog" 
      persistent
      fullscreen
    >
      <v-img 
        style="cursor: pointer"
        contain
        class=""
        width="100%"
        :src="image.photoId ? `http://localhost:3000/img/large/${image.photoId}.jpg` : null"
        :lazy-src="image.thumbnail"
        @click="fullImageDialog=false"
      ></v-img>
    </v-dialog>
  </div>
</template>

<script>

  export default {
    name: "fpPhotoDialog",
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        showPersonDialog: false,
        fullImageDialog: false,
        place: "Thorntown, IN",
        places: ["Thorntown, IN", "Lebanon, IN", "6251 N Caldwell Road", "59 N Bolton Ave"],
        event: "Sam and Kay's 60th Anniversary",
        events: ["Sam and Kay's 60th Anniversary", "Thorntown Little League Game", "Green House"]
      }
    },
    computed: {
      imageDialog: {
        get() {return this.visible},
        set(v) {
          this.$emit("update:visible", v)
        }
      },
      image: {
        get() {
          return this.$store.getters['gallery/activeImage']
        },
        set(v) {
          this.$store.commit("gallery/SET_ACTIVE_IMAGE", v)
        }
      }
    },
    methods: {
      showPeopleDialog() {
        this.showPersonDialog=true
      }
    },
    watch: {
      imageDialog(v) {
        if(v == false) {
          this.image = {}
        }
      },
      people(v) {
        v
      }
    },
  }
</script>