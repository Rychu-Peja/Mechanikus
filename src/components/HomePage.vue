<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Mechanikus</a>
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
              <a class="nav-link" href="#">Rezerwacje</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Warsztaty</a>
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
    
    <!-- Reszta zawartości strony -->
    <div class="container">
      <h2>Strona główna</h2>
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3">
          <div class="sidebar">
            <h2 class="sidebar-title">Usterka</h2>
            <div class="sidebar-content">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="option1">
                <label class="form-check-label" for="option1">Opony</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="option2">
                <label class="form-check-label" for="option2">Silnik</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="option3">
                <label class="form-check-label" for="option3">Elektryka</label>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="option4">
                <label class="form-check-label" for="option4">Inne</label>
              </div>
            </div>
          </div>
        </div>
        <!-- DataServices component -->
        <div class="col-md-9 services">
          <DataServices />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataServices from './DataServices.vue';
export default {
  name: "HomePage",
  components:{
    DataServices
  },
  methods: {
    // Metoda do wylogowywania użytkownika
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
.container {
  padding-left: 15px;
  padding-right: 15px;
}

.sidebar {
  width: 170px;
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh; 
}

.sidebar-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #6c757d;
}

.sidebar-content {
  margin-top: 10px;
}

.form-check-label {
  font-size: 16px;
  color: #6c757d;
}

.services {
  padding: 20px;
}
</style>
  