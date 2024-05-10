<template>
  <div class="container">
    <button @click="goHome" class="btn btn-return">Wróć</button>
    <div v-if="service">
      <div class="card mb-3">
        <div class="card-body row">
          <div class="col-md-8">
            <h3 class="card-title">Warsztat {{ service.name }}</h3>
            <h4 class="card-subtitle mb-2 text-muted">O nas</h4>
            <p class="card-text">{{ service.description }}</p>
            <h4 class="card-subtitle mb-2 text-muted">Czym się zajmujemy?</h4>
            <p class="card-text">{{ service.props }}</p>
          </div>
          <div>
            <textarea v-model="reservationDetails" placeholder="Dodatkowe informacje"></textarea>
          </div>
          <div class="col-md-4">
            <div class="d-flex flex-column justify-content-between h-100 pt-2">
              <h4>Umów się na wizytę</h4>
              <v-date-picker v-model="reservationDate" mode="dateTime" class="w-100" />
              <button @click="makeReservation" class="btn btn-blue mt-3 w-100">Wyślij rezerwację</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShopDetails',
  data() {
    return {
      service: null,
      reservationDate: new Date(),
      reservationDetails: '',
      userId: '', // Zmienna przechowująca identyfikator użytkownika
      userName: '',
      userLastname: '',
    };
  },
  mounted() {
    this.fetchServiceDetails();
    this.fetchLoggedInUser(); // Pobierz dane użytkownika po załadowaniu komponentu
  },
  methods: {
    async fetchServiceDetails() {
      try {
        const serviceId = this.$route.query.serviceId;
        const response = await axios.get(`http://localhost:5500/carservicedb/services/${serviceId}`);
        this.service = response.data;
      } catch (error) {
        console.error('Błąd pobierania usługi:', error);
      }
    },
    async fetchLoggedInUser() {
      try {
        // Zakładając, że serwer zwraca dane zalogowanego użytkownika
        const response = await axios.get('http://localhost:5500/carservicedb/currentUser');
        this.userId = response.data._id; // Zakładam, że ID użytkownika to `_id`
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
      }
    },
    async makeReservation() {
      try {
        const response = await axios.post('http://localhost:5500/carservicedb/reservations', {
          userId: this.userId,
          userName: this.userName,
          userLastname: this.userLastname,
          serviceName: this.service.name,
          reservationDate: this.reservationDate,
          reservationDetails: this.reservationDetails,
        });
        console.log('Rezerwacja udana:', response.data);
        this.$router.push({ name: 'Reservations' });
      } catch (error) {
        console.error('Błąd rezerwacji:', error);
      }
      this.goHome()
    },
    goHome() {
      this.$router.push({ name: 'HomePage' });
    },
  },
};
</script>

<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
}

.btn-return {
  background-color: rgb(0, 110, 255);
  color: white;
  margin-top: 15px;
  margin-bottom: 15px;
}

.btn-blue {
  background-color: rgb(0, 110, 255);
  color: white;
}

.v-date-picker, .btn-blue {
  width: 100%;
}

.mt-3 {
  margin-top: 15px;
}

.card-title {
  margin-bottom: 45px;
}
</style>
