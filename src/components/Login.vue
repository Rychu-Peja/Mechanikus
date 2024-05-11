<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center mb-4">Zaloguj się</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Hasło</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Zaloguj</button>
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
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5500/carservicedb/login', {
          email: this.email,
          password: this.password
        });

        // Przechowaj token w localStorage
        localStorage.setItem('authToken', response.data.token);
        // Ustaw zmienną loggedIn w localStorage jako true
        localStorage.setItem('loggedIn', true);
        // Przejdź do strony głównej
        this.$router.push({ name: 'HomePage' });
      } catch (error) {
        console.error("Błąd logowania:", error);
        this.error = "Nieprawidłowy email lub hasło.";
      }
    }
  },
  created() {
    if (localStorage.getItem('loggedIn')) {
      this.$router.push({ name: "HomePage" });
    }
  }
};
</script>

<style scoped>
.error {
  color: czerwony;
}
</style>
