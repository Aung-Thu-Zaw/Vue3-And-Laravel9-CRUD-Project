import "./bootstrap";
import { createApp } from "vue";
import router from "./router";
import app from "./layouts/App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
createApp(app).use(router).use(VueSweetalert2).mount("#app");
