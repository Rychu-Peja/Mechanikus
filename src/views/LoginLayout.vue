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
             <RouterLink to="/register">Zarejestruj się!</RouterLink>
            </div>

          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginLayout",
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  