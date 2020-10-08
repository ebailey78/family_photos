<template>
  <v-card>
      <v-img 
        :src="`https://picsum.photos/500/300?image=${id * 5 + 10}`"
        :lazy-src="`https://picsum.photos/10/6?image=${id * 5 + 10}`"
        class="grey lighten-2"
        @click="showImage(id)"
      ></v-img>
   <v-card-text>
     Hello {{id}}
   </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'pictureTile',
    props: {
      id: {
        
      }
    },
    data: () => ({
      
    }),
    methods: {
      showImage(id) {
        this.$emit("showImage", id)
        console.log(id)
      }
    }
  }
</script>
