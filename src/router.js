import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import SideBar from "./components/SideBar.vue";
import Login from "./components/Login.vue";
import LoginLayout from "./views/LoginLayout.vue";
import RegisterLayout from "./views/RegisterLayout.vue"

const routes = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
  },
  {
    name: "LoginLayout",
    component: () => LoginLayout,
    path: "/login",
  },
  {
    name: "Register",
    component: () => RegisterLayout,
    path: "/register"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
