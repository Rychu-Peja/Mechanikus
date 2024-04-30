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
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    name: "Services",
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
      }
    }
  };
  </script>
  