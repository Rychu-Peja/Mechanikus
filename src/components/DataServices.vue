<template>
  <div class="container">
    <h2>Usługi</h2>
    <div class="row row-cols-3">
      <div v-for="service in services" :key="service._id" class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ service.name }}</h5>
            <div class="card-image">
              <!-- Umieść tutaj obrazek -->
              <img src="\src\assets\warsztat.jpg" alt="Obrazek usługi" class="card-img-top" />
            </div>
            <p class="card-text">{{ service.props }}</p>
            <RouterLink :to="{ name: 'ShopDetails', query: { serviceId: service._id } }">
              <button class="btn btn-blue">Pokaż szczegóły</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataServices',
  data() {
    return {
      services: []
    };
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get('http://localhost:5500/carservicedb/services');
        this.services = response.data;
      } catch (error) {
        console.error('Błąd pobierania usług:', error);
      }
    },
  },
  showShopDetails(service) {
    this.$router.push({ name: 'ShopDetails', query: { serviceId: service._id } });
  }
};
</script>

<style scoped>
.container {
  width: calc(100% - 170px); /* Całkowita szerokość okna - szerokość sidebar */
  margin-left: 170px; /* Przesunięcie containera w prawo o szerokość sidebar */
  padding: 15px;
}

.card {
  /* Stała wysokość karty */
  height: 350px; /* Dostosuj wysokość według potrzeb */
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Wyśrodkuj elementy wewnątrz karty */
  height: 100%; /* Ustawienie wysokości elementów ciała karty na pełną wysokość karty */
}

.card-image img {
  width: 100%; /* Obrazek wypełnia całą szerokość kontenera */
  height: auto; /* Zachowuje proporcje obrazu */
  object-fit: cover; /* Zapewnia, że obrazek wypełnia dostępny obszar */
}

.card-image {
  margin-bottom: 10px; /* Miejsce na zdjęcie między tytułem a tekstem */
}

.card-title {
  font-size: 20px;
}

.card-text {
  font-size: 16px;
}

.btn-blue {
  background-color: rgb(0, 110, 255);
  color: white;
}
</style>
