// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import example from "./utils/example/e.g.index";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

example.activate();

Vue.config.productionTip = false;

import VueHighlightJS from "vue-highlightjs";

/*
 * Import Highlight.js theme
 * Find more: https://highlightjs.org/static/demo/
 */
import "highlight.js/styles/vs2015.css";

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

import Clipboard from "v-clipboard";
Vue.use(Clipboard);

/* eslint-disable no-new */
// @ts-ignore
new Vue({
    el: "#app",
    router,
    components: {
        App
    },
    template: "<App/>"
});
