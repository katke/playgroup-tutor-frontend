import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { CoolSelectPlugin } from "vue-cool-select";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://playgroup-tutor-api.herokuapp.com/"
    : "/";
var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(CoolSelectPlugin);
