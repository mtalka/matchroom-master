<template>
  <v-app>
    <v-main>
      <Main />
    </v-main>
    <v-snackbar v-model="show" timout="4000">
      <span>&copy; {{ new Date().getFullYear() }} M.Talka | matchroomboss.com is not affiliated with FaceIt</span>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-footer color="rgba(0, 0, 0, 0)" padless>
      <v-spacer></v-spacer>
      <v-icon class="info-icon" @click="show = !show">mdi-information-outline mdi-36px</v-icon>

      <!-- <div></div> -->
    </v-footer>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main
  },

  data: () => ({
    show: false
  })
};
</script>

<style scoped>
.info-icon {
  margin:2rem;
}
</style>