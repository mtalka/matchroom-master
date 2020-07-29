<template>
  <v-container fluid>
    <v-btn text @click="testThis">SAATANA</v-btn>
    <v-row justify="center">
        <v-col cols=“12” lg=“6”>
          <h3>Team 1</h3>
          <MapComponent v-for="map of maps" v-bind:key="map" v-bind:mapName="map" v-bind:faction1="true" />
        </v-col>
      <v-divider vertical></v-divider>
        <v-col cols=“12” lg=“6”>
          <h3>Team 2</h3>
          <MapComponent v-for="map of maps" v-bind:key="map" v-bind:mapName="map" v-bind:faction1="false" />
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import MapComponent from "@/components/MapComponent";

export default {
  name: "Main",
  components: {
    MapComponent
  },
  methods: {
    testThis() {
      this.$store.dispatch("fetchRosters", "1-396ea0e2-3925-4b94-9298-242ab5ce9b1d")
      .then(console.log(this.$store.state))
    }
  },

  data: () => ({
    maps: [
      "de_mirage",
      "de_dust2",
      "de_inferno",
      "de_cache",
      "de_vertigo",
      "de_nuke",
      "de_train",
      "de_overpass"
    ]
  })
};
</script>
