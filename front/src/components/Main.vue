<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col sm="12" lg="6">
        <!-- <v-btn text @click="testThis">SAATANA</v-btn> -->
      <div class="logo">
                <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo1.png"
          transition="scale-transition"
          width="400"
        />
      </div>
        <v-text-field
          outlined
          placeholder="Match link or match ID"
          :color="textFieldColor"
          append-icon="mdi-magnify"
          v-model="matchToSearch"
          @click:append="searchMatch(matchToSearch)"
          @keydown.enter="searchMatch(matchToSearch)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="$store.state.faction1players.length > 0">
      <v-col sm="3" class="min-width-test">
        <h3 class="team-title">{{$store.state.faction1name.toUpperCase()}}</h3>
        <div class="names">
          <span v-for="name of faction1names" v-bind:key="name">{{ name }}</span>
        </div>
        <MapComponent
          v-for="map of maps"
          v-bind:key="map"
          v-bind:mapName="map"
          v-bind:faction1="true"
        />
      </v-col>
      <v-divider vertical v-if="!$vuetify.breakpoint.mobile"></v-divider>
      <v-col sm="3" class="min-width-test">
        <h3 class="team-title">{{$store.state.faction2name.toUpperCase()}}</h3>
        <div class="names">
          <span v-for="name of faction2names" v-bind:key="name">{{ name }}</span>
        </div>
        <MapComponent
          v-for="map of maps"
          v-bind:key="map"
          v-bind:mapName="map"
          v-bind:faction1="false"
        />
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="4000" :top="true">
      Match not found
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
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
    async searchMatch(matchSearchParameter) {
      const splitMatchSearchParameter = matchSearchParameter.split("/");
      const parameter =
        splitMatchSearchParameter[splitMatchSearchParameter.length - 1];
      this.$store.dispatch("fetchRosters", parameter)
      .catch(() => {
        this.snackbar = true;
      });
    }
  },
  data: () => ({
    matchToSearch: "",
    snackbar: false,
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
  }),
  computed: {
    faction1names() {
      return this.$store.state.faction1players.flatMap(p => p.name);
    },
    faction2names() {
      return this.$store.state.faction2players.flatMap(p => p.name);
    },
    textFieldColor() {
      return this.snackbar ? "red" : this.$vuetify.theme.dark.primary;
    }
  }
};
</script>

<style scoped>
.min-width-test {
  min-width: 375px;
}
.team-title {
  text-align: center;
  margin-bottom: .5rem;
}
.names {
  display: flex;
  justify-content: space-evenly;
}
.logo {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}
</style>