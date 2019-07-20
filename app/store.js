import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    data: false,
    socket: {
      isConnected: false,
      reconnectError: false,
    }
  },
  actions: {
  },
  mutations: {
    setInfo(state, data) {
      state.data = data;
    },
    addInfo(state, data) {
      state.data.push(...data);
    },
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE (state)  {
      state.socket.isConnected = false;
    },
    /*SOCKET_ONERROR (state, event)  {
      console.error(state, event);
    },*/
    SOCKET_ONMESSAGE (state, message) {
      let msg = JSON.parse(message.data);
      state.data.forEach(element => {
        if(msg[element.id]) {
          let isStep = Math.abs(element.priceUsd - msg[element.id]);
          if(isStep > 0.01 || (msg[element.id] < 1 && isStep > 0.00000001)){
            if(element.priceUsd > msg[element.id]) element.update = 'is-up';
            else element.update = 'is-down';
            setTimeout(() => element.update = '', 100);
          }
          element.priceUsd = msg[element.id];
        }
      });
    },
    /*SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },*/
  }
});

export default store;
