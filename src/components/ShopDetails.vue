<template>
  <div class="container">
    <!-- Przycisk "Wróć" -->
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
          <div class="col-md-4">
            <div class="d-flex flex-column justify-content-between h-100 pt-2">
              <h4>Umów się na wizytę</h4>
              <!-- Kalendarz i przycisk wyślij rezerwację -->
              <v-date-picker v-model="date" mode="dateTime" class="w-100" />
              <button class="btn btn-blue mt-3 w-100">Wyślij rezerwację</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const date = ref(new Date());

export default {
  name: 'ShopDetails',
  props: ['service'],
  data() {
    return {
      service: null,
    };
  },
  mounted() {
    this.fetchServiceDetails();
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
    goHome() {
      // Przekierowanie użytkownika do strony głównej
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
  background-color: rgb(0, 110, 255); /* Kolor przycisku */
  color: white;
  margin-top: 15px; /* Odstęp od górnej krawędzi */
  margin-bottom: 15px; /* Odstęp od dolnej krawędzi */
}

.btn-blue {
  background-color: rgb(0, 110, 255); /* Kolor przycisku */
  color: white; /* Kolor tekstu */
}

.v-date-picker, .btn-blue {
  width: 100%; /* Ustawia szerokość kalendarza i przycisku na 100% szerokości kontenera */
}

.mt-3 {
  margin-top: 15px; /* Dodatkowy odstęp między kalendarzem a przyciskiem */
}

.card-title {
  margin-bottom: 45px; /* Możesz dostosować wartość marginesu według potrzeb */
}
</style>
