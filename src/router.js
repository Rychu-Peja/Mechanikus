import { createRouter, createWebHistory } from "vue-router";
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import Login from "./components/Login.vue";
import LoginLayout from "./views/LoginLayout.vue";
import RegisterLayout from "./views/RegisterLayout.vue"

const routes = [
  {
    name: "NavBar",
    component: NavBar,
    path: "/",
  },
  {
    name: "SideBar",
    component: SideBar,
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
