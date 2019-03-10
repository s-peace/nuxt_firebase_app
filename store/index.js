import Vuex from 'vuex'
import createPersisitedState from "vuex-persistedstate";

export const state = () => ({
  message: 'count number',
  counter: 0,
});

export const mutations = {
  doit(state) {
    let n = Math.floor(Math.random() * 10);
    state.counter += n;
    state.message = 'add ' + n + '.';
  },
  reset(state) {
    state.counter = 0;
    state.message = "reset now...";
  },
}

export const plugins = [
  createPersisitedState(),
]

// export default createStore