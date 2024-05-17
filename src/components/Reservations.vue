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
          <div class="card-body">
            <h3>Serwis: {{ reservation.serviceName }}</h3>
            <h4>Data: {{ formatReservationDate(reservation.reservationDate) }}</h4>
            <h4>Zgłoszenie: {{ reservation.reservationDetails }}</h4>
            <button class="btn btn-danger mt-3" @click="cancelResesrvation(reservation._id)">Anuluj</button>
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
    formatReservationDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
    },
    async cancelResesrvation(reservationId){
      try{
        const response = await axios.delete(`http://localhost:5500/carservicedb/cancelReservation/${reservationId}`)
        if(response.status ===200){
          this.reservations = this.reservations.filter(reservation => reservation._id !== reservationId) 
          this.fetchReservations()
        }
      }
      catch(error){
        console.error('Błąd anulowania rezerwacji:', error);
      }
    },
    async fetchLoggedInUser() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        };
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          this.userName = user.name;
        } else {
          console.log('Brak zalogowanego użytkownika.');
          this.userName = 'Gość';
        }
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
        this.userName = 'Gość';
      }
    },
  },
  mounted() {
    this.fetchReservations();
    this.fetchLoggedInUser();
  }
};
</script>

<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
}
</style>