// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import example from "./utils/example/e.g.index";

import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

example.activate();

Vue.config.productionTip = false;

/* eslint-disable no-new */
// @ts-ignore
new Vue({
    el: "#app",
    router,
    components: {
        App
    },
    template: "<App/>",
});
