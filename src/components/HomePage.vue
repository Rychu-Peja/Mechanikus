<template>
  <div>
    <!-- Navbar -->
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

    <!-- Struktura z SideBar i DataServices -->
    <div class="main-container">
      <!-- SideBar -->
      <div class="sidebar">
        <SideBar />
      </div>

      <!-- DataServices -->
      <div class="services">
        <DataServices />
      </div>
    </div>
  </div>
</template>

<script>
import DataServices from './DataServices.vue';
import SideBar from './SideBar.vue';

export default {
  name: "HomePage",
  components: {
    DataServices,
    SideBar
  },
  methods: {
    logout() {
      // Usuń zmienną loggedIn z localStorage
      localStorage.removeItem('loggedIn');
      // Przejdź do strony logowania
      this.$router.push({ name: "LoginLayout" });
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px;
}

.sidebar {
  flex: 0 0 180px; /* Ustalona szerokość SideBar */
  background-color: #f8f9fa;
  padding: 15px;
  box-sizing: border-box;
}

.services {
  flex: 1; /* DataServices wypełnia całą pozostałą szerokość */
  padding: 15px;
  margin-left: 15px; /* Odstęp od SideBar */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
