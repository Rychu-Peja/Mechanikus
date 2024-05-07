<template>
  <div class="container">
    <h2>Usługi</h2>
    <div class="row row-cols-3">
      <div v-for="service in services" :key="service._id" class="col mb-4">
        
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ service.name }}</h5>
            <p class="card-text">{{ service.props }}</p>
          </div>
          <RouterLink :to="{ name: 'ShopDetails', query: { serviceId: service._id } }"><button class="btn">Pokaz szczegóły</button></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DataServices",
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
  padding-left: 15px;
  padding-right: 15px;
}

.card {
  /* Dodatkowe style dla kart */
  margin-bottom: 20px;
}

.card-title {
  /* Dodatkowe style dla tytułu karty */
  font-size: 20px;
}

.card-text {
  /* Dodatkowe style dla tekstu karty */
  font-size: 16px;
}
</style>
