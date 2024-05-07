import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);
app.use(VCalendar, {})
app.use(router);
app.mount("#app");
