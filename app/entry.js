//import './index.html';
import './style.scss';
import '@babel/polyfill'; //IE10-11
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueNativeSock from 'vue-native-websocket';

Vue.use(VueNativeSock, 'wss://ws.coincap.io/prices?assets=ALL', { store: store });

new Vue({
  el: '#app',
  store,
  components: {
    app: App
  }
});

