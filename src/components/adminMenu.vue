<template>
  <div class = "center">
    <v-menu offset-y>
      <template v-slot:activator="{on, attr}">
        <v-btn 
          icon 
          title="Admin Functions"
          v-bind='attr'
          v-on='on'
        ><v-icon>fa-cog</v-icon></v-btn>
      </template>
      <v-list flat>
        <v-subheader>Admin Menu</v-subheader>
        <v-list-item-group>
          <v-list-item @click="$store.commit('SET_NEW_USER_DIALOG', true)">
            <v-list-item-icon><v-icon>fa-user-plus</v-icon></v-list-item-icon>
            <v-list-item-title>Add User</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon><v-icon>fa-users</v-icon></v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <fp-new-user-dialog></fp-new-user-dialog>
  </div>
</template>

<script>
export default {
  name: "fpAdminMenu",
  data() {
    return {

    }
  }
}
</script>