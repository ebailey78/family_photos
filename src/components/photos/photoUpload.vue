<template>
  <div class="text-center">
    <v-dialog 
      v-model="dialog" 
      width="1000px"
      persistent
    >
      <v-card>
        <v-card-title>Upload Images</v-card-title>
        <v-card-text class="mt-4">
          <form ref="form">
            <v-file-input
              chips
              multiple
              label="Select Photos"
              accept="image/png, image/jpeg, image/tiff"
              show-size
              :rules="rules"
              counter
              prepend-icon="fa-camera"
              v-model="photos"
            ></v-file-input>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=false">Cancel</v-btn>
          <v-btn @click="upload">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "fpPhotoUploadDialog",
    data() {
      return {
        photos: [],
        rules: [
          value => {
            let totalSize
            if(Array.isArray(value)) {
              if(value.length == 0) {
                return true
              }
              totalSize = value.map(v => v.size).reduce((pre, cur) => cur + pre)
            } else {
              totalSize = value.size
            }
            totalSize = totalSize / 1000000
            return !value || totalSize < 100 || 'Total file size shold be less than 100MB'
          },
        ],
      }
    },
    computed: {
      dialog: {
        get() {return this.$store.getters['photoUploadDialog']},
        set(v) {this.$store.commit("SET_PHOTO_UPLOAD_DIALOG", v)}
      }
    },
    methods: {
      async upload() {

        let formData = new FormData()
        this.photos.forEach((photo, i) => {
          formData.append(`files[${i}]`, photo)
        })
        let res = await this.$http.post("http://localhost:3000/photos", formData)
        res
        this.dialog = false
      },
    },
    watch: {
      dialog(v) {
        if(!v) this.photos=[]
      }
    }
  }
</script>