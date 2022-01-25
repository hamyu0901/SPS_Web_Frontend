// The Vue build version to load with the `import` command 
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store.js';
import axios from 'axios';
import 'babel-polyfill';
import 'es6-promise';
import 'reset-css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueChart from 'vue-chartjs';
import Vue2DatePicker from 'vue2-datepicker';
import saveAs from 'file-saver';
import VueI18n from 'vue-i18n';
import i18n from '@/plugins/i18n';
import 'expose-loader?$!expose-loader?jQuery!jquery';
import VueNotifications from 'vue-notification';
import VueSocketIO from 'vue-socket.io';
import VueLogger from 'vuejs-logger';
import * as VueMenu from '@hscmap/vue-menu';
import SlideUpDown from 'vue-slide-up-down';
import VueUploadComponent from 'vue-upload-component';
import Moment from 'moment';
import VueMomentJS from 'vue-momentjs';
import 'devextreme/dist/css/dx.dark.css';
import { verify } from 'crypto';
import http from 'http';
import cheetahGrid from 'vue-cheetah-grid';
let CanvasJS = require('@/commons/canvasjs/canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

const isProduction = process.env.NODE_ENV === 'production';
const service = require('@/service/service');
const serviceHandle = new service.Service();
const debug = new service.debug();
const notify = new service.notify();
const shield = new service.shield();
const release = new service.release();
const factoryInfo = new service.factory(axios, url());
factoryInfo.initialize();
factoryInfo.initBoothType();

Vue.config.productionTip = false
const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
}; 

function url() {
  if ((document.location.href.slice(0, 5)) == 'https') {
    return document.location.href.slice(0, (document.location.href.length-1));
  }
  else {
    let baseAddress = document.location.href.slice(4, 7);
    baseAddress += (document.location.href.split('//')[1].split(':')[0] + ':8000');
    return baseAddress = 'http' + baseAddress;
  }

}


Vue.prototype.$http = axios.create({
  baseURL: url(),
  timeout: 600000,
  httpAgent: new http.Agent({ keepAlive: true })
});

Vue.prototype.$saveAs = saveAs;
Vue.prototype.$httpsBaseUrl = url();
Vue.prototype.$socket = VueSocketIO;
Vue.prototype.$debug = debug;
Vue.prototype.$shield = shield;
Vue.prototype.$style = serviceHandle.getStyle();
Vue.prototype.$release = release;
Vue.prototype.$info = factoryInfo;
Vue.prototype.$chart = CanvasJS;
Vue.prototype.$alarm = service.alarmNotify;

function popmsg(text) {
  Vue.notify({
    group: 'pushAlarm',
    text: text
  })
}
function networkError(message) {
  if (message == 'Network Error') {
    Vue.notify({
      group: 'dyloginerror',
      text: 'Network Error',
      type: 'error'
    });
    this.$router.push('/login');
  }
}


function language() {
  this.$store.dispatch('setLanguage', this.getLanguage);
  this.$i18n.locale = this.getLanguage;
  this.$http.post(`${this.baseUrl}/info/language`, { language: this.getLanguage }).then(async (result) => {
    if (result.data == '') {

    }
    else {
      this.$log.info('Server [' + this.$i18n.locale + '] language setting.');
    }
  }).catch((error) => {
    this.$log.error(error);
  })
}
Vue.prototype.$popmsg = popmsg;
Vue.prototype.$networkError = networkError;
Vue.prototype.$language = language;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;  

// #237ffe 2d77f1
Vue.use(Vuetify, {
  theme: {
    "dy_blue_dark": "#009cff",
    "dy_blue_light": "#237ffe",
    "dy_conch": "#7ea2d3",
    "dy_green": "#0ca889",
    "dy_navText": "#606a8f",
    "dy_navText_light": "#5d6685",
    "dy_navArea_dark": "#181a27",
    "dy_navArea_light": "#d3dfed",
    "dy_white": "#ffffff",
    "dy_maintenance_tab": "#21263a",
    "dy_maintenance_text": "#238ffe",
    "dy_mainTab_over": "#4692fe",
    "dy_navigationDrawer_over": "#027af5"
  }
})
Vue.use(VueChart);
Vue.use(Vue2DatePicker);
Vue.use(cheetahGrid);
Vue.use(VueI18n);
Vue.use(VueNotifications);
Vue.use(new VueSocketIO({
  connection: url(),
}));
Vue.use(VueLogger, options);
Vue.use(VueMenu);
Vue.use(VueMomentJS, Moment);
Vue.component('slide-up-down', SlideUpDown);
Vue.component('file-upload', VueUploadComponent);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})