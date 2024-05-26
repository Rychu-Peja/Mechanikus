<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center mb-4">Zaloguj się</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Hasło</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Zaloguj</button>
            <router-link to="/register">Zarejestruj się!</router-link>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginLayout",
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
  console.log('Login method called');
  try {
    const response = await axios.post('http://localhost:5500/carservicedb/login', {
      email: this.email,
      password: this.password
    });
    console.log('response', response);  
    if (response.data.user) {
      console.log("Login successful!", response.data.user);
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('userLastname', response.data.user.lastname);
      localStorage.setItem('authToken', response.data.token); 
      this.determineRedirect(response.data.user.type || response.data.user.__v);  
    } else {
      this.error = "Nieprawidłowy email lub hasło.";
    }
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token); 
    }
  } catch (error) {
    console.error("Login error:", error);
    this.error = "Nieprawidłowy email lub hasło.";
  }
},
determineRedirect(userType) {
  if (userType === 0) {
    this.$router.push({ name: 'HomePage' });
  } else if (userType === 1) {
    this.$router.push({ name: 'AdminView' });
  }
},

  created() {
    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            this.$router.push({ name: "HomePage" });
        }
    }
  },

  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
