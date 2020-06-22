import Vue from "vue";
import App from "./App";
import router from "./router";
import example from "./utils/example/e.g.index";
import Vuex from "vuex";
import {
    store
} from './store'
import {
    BootstrapVue,
    IconsPlugin
} from "bootstrap-vue";
import Clipboard from "v-clipboard";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/vs2015.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

example.activate();

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueHighlightJS);
Vue.use(Clipboard);
Vue.use(Vuex)

/* eslint-disable no-new */
// @ts-ignore
new Vue({
    el: "#app",
    router,
    components: {
        App
    },
    template: "<App/>",
    store
});
