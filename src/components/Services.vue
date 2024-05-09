<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Mechanikus</router-link>
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
            <li class="nav-item">
              <router-link class="nav-link" to="/services">Warsztaty</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <!-- Formularz dodawania nowej usługi -->
      <h2>Dodaj Nową Usługę</h2>
      <form @submit.prevent="addService">
        <div class="mb-3">
          <label for="name" class="form-label">Nazwa Usługi</label>
          <input type="text" class="form-control" v-model="newService.name" required />
        </div>
        <div class="mb-3">
          <label for="props" class="form-label">Atrybuty Usługi</label>
          <input type="text" class="form-control" v-model="newService.props" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Opis</label>
          <textarea class="form-control" v-model="newService.description" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Dodaj Usługę</button>
      </form>

      <!-- Lista dostępnych usług z przyciskiem usuwania -->
      <h2 class="mt-5">Dostępne Usługi</h2>
      <ul>
        <li v-for="service in services" :key="service._id">
          {{ service.name }} - {{ service.props }}
          <button @click="deleteService(service._id)" class="btn btn-danger ms-2">Usuń</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Services",
  data() {
    return {
      services: [],
      newService: {
        name: '',
        props: '',
        description: ''
      }
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
    async addService() {
      try {
        // Wykonaj żądanie POST, aby dodać usługę
        const response = await axios.post('http://localhost:5500/carservicedb/services', this.newService);
        // Dodaj nową usługę do listy
        this.services.push(response.data);
        // Wyczyść formularz
        this.newService = {
          name: '',
          props: '',
          description: ''
        };
      } catch (error) {
        console.error('Błąd dodawania usługi:', error);
      }
    },
    async deleteService(serviceId) {
      try {
        // Wykonaj żądanie DELETE, aby usunąć usługę
        await axios.delete(`http://localhost:5500/carservicedb/services/${serviceId}`);
        // Zaktualizuj listę usług, usuwając wybrany element
        this.services = this.services.filter(service => service._id !== serviceId);
      } catch (error) {
        console.error('Błąd usuwania usługi:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
}

.ms-2 {
  margin-left: 0.5rem;
}
</style>
