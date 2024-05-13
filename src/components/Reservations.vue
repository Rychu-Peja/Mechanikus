<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" icon="pi pi-check" to="/">Mechanikus</router-link>
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
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/services">Warsztaty</router-link>
            </li>
          </ul>
          <!-- Powitanie użytkownika -->
          <span class="navbar-text ms-auto me-3">Witaj, {{ userName || 'Gościu' }}</span>
          <!-- Pole wyszukiwania -->
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search" style="color:blue"></InputIcon>
            <InputText v-model="searchQuery" @input="filterServices" placeholder="Wyszukaj usługi" />
          </IconField>
        </div>
        <div class="ps-3">
          <Button @click="logout" class="btn btn-danger" label="Wyloguj" />
        </div>
      </div>
    </nav>

    <div class="container" style="margin-top: 15px;">
      <h2>Twoje rezerwacje</h2>
      <ul class="list-group">
        <li v-for="reservation in reservations" :key="reservation._id" class="list-group-item">
          <div class="cardbody">
          <h3>Serwis: {{ reservation.serviceName }}</h3>
          <h4>Data: {{ reservation.reservationDate }}</h4>
          <h4>Zgłoszenie: {{reservation.reservationDetails}}</h4>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Reservations",
  data() {
    return {
      reservations: []
    };
  },
  mounted() {
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const userId = localStorage.getItem('userId'); 
        const response = await axios.get(`http://localhost:5500/carservicedb/reservations/${userId}`);
        this.reservations = response.data;
      } catch (error) {
        console.error('Błąd pobierania rezerwacji:', error);
      }
    },
    logout() {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userId');
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
</style>
