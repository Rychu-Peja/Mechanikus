<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center mb-4">Zarejestruj się</h2>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="name" class="form-label">Imię</label>
            <input type="text" class="form-control" id="name" v-model="name" required />
          </div>
          <div class="mb-3">
            <label for="lastname" class="form-label">Nazwisko</label>
            <input type="text" class="form-control" id="lastname" v-model="lastname" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Hasło</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Potwierdź hasło</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Zarejestruj się</button>
            <router-link to="/login">Masz już konto? Zaloguj się!</router-link>
          </div>
        </form>
        <div v-if="error" class="alert alert-danger mt-3" role="alert">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterLayout",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Hasła nie są takie same.";
        return;
      }

      try {
        const response = await axios.post('http://localhost:5500/carservicedb/users', {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        console.log("Registration successful!", response.data);
        
        this.$router.push({ name: "HomePage" });
      } catch (error) {
        console.error("Registration error:", error);
        this.error = "Wystąpił błąd podczas rejestracji.";
      }
    },
    async loginAfterRegistration() {
      // Proces logowania po rejestracji
      try {
        // Wywołanie procesu logowania
        await userService.loginUser({
          email: this.email,
          password: this.password,
          
        });
        console.log("zalogowano po rejetsracji")
      } catch (error) {
        console.error("Login error:", error);
        throw error; // Przekaż błąd do wywołującego
      }
    },
  },
}
</script>

<style scoped>
.register-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
