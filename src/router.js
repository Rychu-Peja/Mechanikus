import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import LoginLayout from "./views/LoginLayout.vue";
import RegisterLayout from "./views/RegisterLayout.vue"

const routes = [
  {
    name: "HomePage",
    component: HomePage,
    path: "/",
    // Dodaj meta-informację, że widok wymaga zalogowanego użytkownika
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "LoginLayout",
    component: () => LoginLayout,
    path: "/login",

    meta: {
      requiresGuest: true
    }
  },
  {
    name: "Register",
    component: () => RegisterLayout,
    path: "/register",

    meta: {
      requiresGuest: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('loggedIn')) {

    next({ name: "LoginLayout" });
  } else if (to.meta.requiresGuest && localStorage.getItem('loggedIn')) {
    next({ name: "HomePage" });
  } else {
    next(); 
  }
});

export default router;
