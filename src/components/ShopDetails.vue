<template>
  <div class="container">
    <h2>Shop Details</h2>
    <div v-if="service">
      <div class="card mb-3">
        <div class="card-body">
          <h3 class="card-title">Warsztat {{ service.name }}</h3>
          <h4 class="card-subtitle mb-2 text-muted">O nas</h4>
          <p class="card-text">{{ service.description }}</p>
          <h4 class="card-subtitle mb-2 text-muted">Czym się zajmujemy?</h4>
          <p class="card-text">{{ service.props }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "ShopDetails",
    props: ['service'],
    data() {
        return {
            service: null
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
  }
}
  </script>
  
  <style scoped>
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  </style>
  