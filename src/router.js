// Mechanikus/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginLayout from './views/LoginLayout.vue';
import RegisterLayout from './views/RegisterLayout.vue';
import ShopDetails from './components/ShopDetails.vue';
import Reservations from './components/Reservations.vue';
import Services from './components/Services.vue';
import AdminView from './components/AdminView.vue';

const routes = [
  {
    name: 'HomePage',
    component: HomePage,
    path: '/',
    meta: { requiresAuth: true }
  },
  {
    name: 'LoginLayout',
    component: LoginLayout,
    path: '/login',
    meta: { requiresGuest: true }
  },
  {
    name: 'Register',
    component: RegisterLayout,
    path: '/register',
    meta: { requiresGuest: true }
  },
  {
    name: 'ShopDetails',
    component: ShopDetails,
    path: '/shopdetails',
    props: (route) => ({ serviceId: route.query.serviceId })
  },
  {
    name: 'Reservations',
    component: Reservations,
    path: '/reservations',
    meta: { requiresAuth: true }
  },
  {
    name: 'Services',
    component: Services,
    path: '/services',
    meta: { requiresAuth: true }
  },
  {
    name: 'AdminView',
    component: AdminView,
    path: '/admin',
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn');
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'LoginLayout' });
  } else if (to.meta.requiresGuest && loggedIn) {
    next({ name: 'HomePage' });
  } else {
    // Check user type or version for protected routes
    if (to.meta.requiresAdmin && user && user.type !== 1) {
      next({ name: 'HomePage' });  // Redirect non-admin users
    } else {
      next();
    }
  }
});


export default router;
