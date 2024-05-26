<template>
  <div>
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
  </div>

  <div class="container">
    <Button @click="goHome" class="btn btn-return mb-3" label="Wróć" />
    <div v-if="service">
      <div class="card mb-3">
        <div class="card-body row">
          <div class="col-md-8">
            <h3 class="card-title">Warsztat {{ service.name }}</h3>
            <h4 class="card-subtitle mb-2 text-muted">O nas</h4>
            <p class="card-text">{{ service.description }}</p>
            <h4 class="card-subtitle mb-2 text-muted">Czym się zajmujemy?</h4>
            <p class="card-text">{{ service.props.join(', ') }}</p>
            <h4 class="card-subtitle mb-2 text-muted">Gdzie się znajdujemy? </h4>
            <p class="card-text">{{service.city}}</p>
            <div class="mt-4">
              <h4 class="card-subtitle mb-3 text-muted">Treść zgłoszenia</h4>
              <FloatLabel class="mt-4">
                <Textarea v-model="reservationDetails" rows="5" cols="30"></Textarea>
                <label>Informacje do rezerwacji</label>
              </FloatLabel>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex flex-column justify-content-start h-100">
              <h4>Umów się na wizytę</h4>
              <v-date-picker v-model="reservationDate" mode="dateTime" class="w-100 mb-3" />
              <button @click="makeReservation" class="btn btn-blue w-100">Wyślij rezerwację</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';

export default {
  name: 'ShopDetails',
  data() {
    return {
      service: null,
      reservationDate: new Date(),
      reservationDetails: '',
      userId: '',
      userName: '',
      userLastname: '',
      userType: 0, 
      userVersion: 0, 
    };
  },
  components: {
    Button,
    FloatLabel,
    Textarea,
  },
  async mounted() {
    await this.fetchServiceDetails();
    await this.fetchLoggedInUser(); 
  },
  methods: {
    async fetchServiceDetails() {
      try {
        const serviceId = this.$route.query.serviceId;
        const response = await axios.get(`http://localhost:5500/carservicedb/services/${serviceId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.service = response.data;
      } catch (error) {
        console.error('Błąd pobierania usługi:', error);
      }
    },
    async fetchLoggedInUser() {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error("Brak dostępnego tokenu autoryzacyjnego.");
        return;
      }
      const response = await axios.get('http://localhost:5500/carservicedb/currentUser', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      this.userId = response.data._id;
      this.userName = response.data.name;
      this.userLastname = response.data.lastname;
      this.userType = response.data.type; 
      this.userVersion = response.data.__v;
    },
    async makeReservation() {
      try {
        const reservationData = {
          userId: this.userId,
          userName: this.userName,
          userLastname: this.userLastname,
          serviceName: this.service.name,
          reservationDate: this.reservationDate,
          reservationDetails: this.reservationDetails,
        };
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:5500/carservicedb/reservations', reservationData, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Rezerwacja udana:', response.data);

        if (this.userType === 1 || this.userVersion === 1) {
          this.$router.push({ name: 'AdminView' });
        } else {
          this.$router.push({ name: 'HomePage' });
        }
      } catch (error) {
        console.error('Błąd podczas rezerwacji:', error);
      }
    },
    goHome() {
      this.$router.push({ name: 'HomePage' });
    },
  }
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

.card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-subtitle {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
