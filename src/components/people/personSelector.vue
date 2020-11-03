<template>
  <v-autocomplete
    v-model="people"
    :items="allPeople"
    :loading="isLoading"
    :search-input.sync="search"
    :color="color"
    hide-no-data
    hide-selected
    multiple
    deletable-chips
    chips
    item-text="description"
    :label="label"
    :placeholder="placeholder"
    prepend-icon="fa-users"
    return-object
    @blur="updatePeople"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "fpPersonSelector",
  props: {
    photoId: {
      required: true
    },
    value: {
      type: Array
    },
    color: {
      type: String,
      default: "primary"
    },
    label: {
      type: String,
      default: "People"
    },
    placeholder: {
      type: String,
      default: "Begin typing to add people"
    }
  },
  data() {
    return {
      people: [],
      searchResults: [],
      isLoading: false,
      search: ""
    }
  },
  computed: {
    allPeople() {
      let x = this.searchResults.filter(person => {
        return this.people.map(p => p.personId).indexOf(person.personId) == -1 || this.people.map(p => this.makeDescription(p)).indexOf(this.makeDescription(person)) > -1
      })
      return x
    }
  },
  methods: {
    makeDescription(name) {
      let desc = name.lastName
      if(name.suffix) desc = `${desc} ${name.suffix}`
      desc = `${desc}, ${name.firstName} ${name.middleName}`
      return desc
    },
    async updatePeople() {
      this.isLoading = true
      try {
        let resp = await this.$http.post(`photos/${this.photoId}/people`, this.people)
        console.log(resp)      
      } catch(err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    }
  },
  watch: {
    async photoId(v) {
      if(v) {
        let resp = await this.$http.get(`photos/${v}/people`)
        let people = resp.data
        let ids = people.map(person => person.personId)
        console.log(people)
        let x = this.allPeople.filter(person => {
          return ids.indexOf(person.personId) > -1
        })
        console.log(x)
        
        let y = x.filter((v, i, a) => {
          return i == a.findIndex(p => p.personId === v.personId)
        })

        console.log(y)

        this.people = y
      }
    },
    async search() {
      if (this.allPeople.length > 0) return
      if (this.isLoading) return

      this.isLoading = true

      try {
        let resp = await this.$http.get("people")
        let names = resp.data.map(name => {
          name.description = this.makeDescription(name)
          return name
        })
        this.searchResults = names       
      } catch(err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
  }
}
</script>