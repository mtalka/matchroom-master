<template>
  <v-container>
    <v-card dense elevation="1">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-text>
            <div class="map-wrap">
              <span class="map-title">{{this.mapName}}</span>
              <div class="average-wrapper">
                <span>Avg. Win% </span>
                <span class="map-win-rate" v-bind:style="{ color: winRateColor }">{{mapTheMapWinRates}}</span>
              </div>
              <div class="average-wrapper">
                <span>Avg. K/D </span>
                <span class="map-kd-avg" v-bind:style="{ color: kdAvgColor }">{{mapTheMapKdAvgs}}</span>
              </div>
            </div>
          </v-card-text>
        </div>

        <v-avatar class="ma-3" size="75" tile>
          <v-img :src="imagePath"
            class="shrink mt-1"></v-img>
        </v-avatar>
      </div>
    </v-card>
    <v-expansion-panels tile>
    <v-expansion-panel>
        <v-expansion-panel-header>Individual statistics</v-expansion-panel-header>
        <v-expansion-panel-content>
    <v-data-table
      dense
      :headers="headers"
      :items="mapIntoObjects"
      :items-per-page="5"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: "MapComponent",
  props: ["faction1", "mapName", "loading"],
  computed: {
    imagePath() {
      return require(`@/assets/maps/${this.mapName}.jpg`);
    },
    mapTheNicknames() {
        const playersToHandle = this.faction1 ? this.$store.state.faction1players : this.$store.state.faction2players;
      return playersToHandle.flatMap(p => p.name);
    },
    mapTheMapWinRates() {
        const playersToHandle = this.faction1 ? this.$store.state.faction1players : this.$store.state.faction2players;
      const winRates = playersToHandle.flatMap(p =>
        p.segments
          .filter(s => s.label === this.mapName)
          .map(s => s.stats)
          .map(s => Number(s["Win Rate %"]))
      );
      return (winRates.reduce((a, b) => a + b, 0) / winRates.length).toFixed(2);
    },
    mapTheMapKdAvgs() {
                const playersToHandle = this.faction1 ? this.$store.state.faction1players : this.$store.state.faction2players;
      const kdAvgs = playersToHandle.flatMap(p =>
        p.segments
          .filter(s => s.label === this.mapName)
          .map(s => s.stats)
          .map(s => Number(s["Average K/D Ratio"]))
      );
      return (kdAvgs.reduce((a, b) => a + b, 0) / kdAvgs.length).toFixed(2);
    },
    mapIntoObjects() {
                const playersToHandle = this.faction1 ? this.$store.state.faction1players : this.$store.state.faction2players;
      const players = [];
      playersToHandle.forEach(p => {
        const player = {};
        player.name = p.name;
        player.kdAvg = p.segments
          .filter(s => s.label === this.mapName)
          .map(s => s.stats)
          .map(s => s["Average K/D Ratio"]);
        player.winRate = p.segments
          .filter(s => s.label === this.mapName)
          .map(s => s.stats)
          .map(s => s["Win Rate %"]);
        players.push(player);
      });
      return players;
    },
    winRateColor() {
      const winRate = this.mapTheMapWinRates;
      if (winRate >= 55) {
        return "green";
      } else if (winRate >= 50) {
        return "yellowgreen";
      } else if (winRate >= 45) {
        return "orange";
      } else {
        return "red";
      }
    },
    kdAvgColor() {
      const kdAvg = this.mapTheMapKdAvgs;
      if (kdAvg >= 1.25) {
        return "green";
      } else if (kdAvg >= 1.1) {
        return "yellowgreen";
      } else if (kdAvg >= 1) {
        return "orange";
      } else {
        return "red";
      }
    }
  },

  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "K/D", value: "kdAvg" },
      { text: "Win rate", value: "winRate", align: "right" }
    ]
  })
};
</script>

<style scoped>
.map-wrap {
  display: flex;
  flex-direction: column;
}
.map-title {
  font-weight: 600;
  font-size: 1.15rem;
}
.map-win-rate {
  font-weight: 600;
}
.map-kd-avg {
  font-weight: 600;
}
.average-wrapper {
    display: flex;
    justify-content: space-between;
    width: 125px;
}
</style>