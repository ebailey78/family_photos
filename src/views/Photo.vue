<template>
  <v-card class="d-flex flex-column fill-height" color="accent lighten-5"> 
    <v-card-text class = "d-flex flex-column flex-grow-1" ref="dialogBody"> 
      <v-container fluid class='d-flex flex-column flex-grow-1'> 
        <v-row 
          class = "flex-grow-1" 
          :class="{'d-flex': $vuetify.breakpoint.mobile, 'flex-column': $vuetify.breakpoint.mobile}"
        >
          <v-col 
            cols=12 
            lg=8 
            class="flex-grow-1" 
            style="position: relative; border-right: solid #009688 2px;"
          >
            <v-img 
              contain
              style="cursor: pointer; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"
              width="100%"
              :src="photo.photoId ? `http://localhost:3000/img/large/${photo.photoId}.jpg` : null"
              :lazy-src="photo.thumbnail"
              @click="fullImageDialog=true"
            ></v-img>
          </v-col>
          <v-col cols=12 lg=4 class="d-flex flex-row flex-grow-1" style="position: relative">
            <v-container>
              <v-row>
                <v-col cols=12>
                  <fp-person-selector
                    :photoId="photoId"
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
              <v-row class="d-flex flex-row flex-grow-1">
                <v-col>
                <v-combobox
                  prepend-icon="fa-birthday-cake"
                  v-model="event"
                  :items="events"
                  label="Event"
                ></v-combobox> 
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=12>
                  <v-btn @click="goBack" block>Done</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Photo",
    props: {
      photoId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        photo: {},
        fullImageDialog: false,
        place: "Thorntown, IN",
        places: ["Thorntown, IN", "Lebanon, IN", "6251 N Caldwell Road", "59 N Bolton Ave"],
        event: "Sam and Kay's 60th Anniversary",
        events: ["Sam and Kay's 60th Anniversary", "Thorntown Little League Game", "Green House"]       
      }
    },
    computed: {

    },
    methods: {
      goBack() {
        this.$router.back()
      },
      async updatePhoto(photoId) {
        try{
          let resp = await this.$http.get(`photos/${photoId}`)
          this.photo = resp.data
        } catch(err) {
          console.log(err)
        }        
      }
    },
    mounted() {
      this.updatePhoto(this.photoId)
    },
    watch: {
      people(v) {
        v
      }
    },
  }
</script>