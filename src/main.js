// Mechanikus/src/main.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);
app.use(router); // Użyj routera
app.use(VCalendar, {}); // Dodaj inne biblioteki
app.mount('#app'); // Zamontuj aplikację
