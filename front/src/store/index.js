// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

function getTeams(searchParameter) {
  const baseUrl = `http://localhost:5000/api/getMatch/${searchParameter}`

  const faction1players = []
  const faction2players = []
  let faction1name = "";
  let faction2name = "";

  return axios
    .get(baseUrl)
    .then((result) => {

      faction1name = result.data.teams.faction1.name;
      faction2name = result.data.teams.faction2.name;

      for (const p of result.data.teams.faction1.roster) {
        const baseUrl = `http://localhost:5000/api/getPlayerStats/${p.player_id}`
        axios
          .get(baseUrl)
          .then((result) => {
            result.data.name = p.nickname;
            faction1players.push(result.data)
          })
      }

      for (const p of result.data.teams.faction2.roster) {
        const baseUrl = `http://localhost:5000/api/getPlayerStats/${p.player_id}`
        axios
          .get(baseUrl)
          .then((result) => {
            result.data.name = p.nickname;
            faction2players.push(result.data)
          })
      }
    })
    .then(() => {
      return {faction1players, faction2players, faction1name, faction2name}
    })
    .catch(error => {
      Promise.reject(error)
      throw new Error(`API ${error}`)
    })

}

export default new Vuex.Store({
  state: {
    faction1players: [],
    faction2players: [],
    faction1name: "",
    faction2name: ""
  },
  mutations: {
    UPDATE_TEAMS(state, data) {
      state.faction1players = data.faction1players;
      state.faction2players = data.faction2players;
      state.faction1name = data.faction1name;
      state.faction2name = data.faction2name;
    }
  },
  actions: {
    fetchRosters({ commit }, searchParameter) {
      getTeams(searchParameter).then((result) => {
        commit("UPDATE_TEAMS", result);
      });
    }
  },
  modules: {
  }
})
