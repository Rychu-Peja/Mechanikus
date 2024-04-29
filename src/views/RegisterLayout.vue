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
                <label for="name" class="form-label">Nazwisko</label>
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
                <RouterLink to="/login">Masz już konto? Zaloguj się!</RouterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
  </template>


  <script>
export default {
  name: "RegisterLayout",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  },
  mounted() {
    const userService = new userService("mongodb://localhost:5173/carservice");
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Hasła nie są takie same.";
        return;
      }

      try {
        await userService.registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        // Handle successful registration (e.g., redirect to login or home page)
        console.log("Registration successful!");
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error("Registration error:", error);
        this.error = "Wystąpił błąd podczas rejestracji.";
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