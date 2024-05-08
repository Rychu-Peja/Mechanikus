<template>
  <!-- Navbar -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Mechanikus</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- Zmiana <a> na <router-link> -->
              <router-link class="nav-link" to="/reservations">Rezerwacje</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/services">Warsztaty</router-link>
            </li>
          </ul>
        </div>
        <div class="navbar-search">
          <input type="text" class="form-control" placeholder="Wyszukaj" />
        </div>
        <div class="ps-3">
          <button @click="logout" class="btn btn-danger">Wyloguj</button>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Services",
  components: {

  },
  methods: {
    logout() {
      // Usuń zmienną loggedIn z localStorage
      localStorage.removeItem('loggedIn');
      // Przejdź do strony logowania
      this.$router.push({ name: "LoginLayout" });
    },
  }
};
</script>

<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
}

.services {
  padding: 20px;
}
</style>
