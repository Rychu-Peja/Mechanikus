<template>
  <div>
    <!-- Navbar -->
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
        <div class="ps-3">
          <button @click="logout" class="btn btn-danger">Wyloguj</button>
        </div>
      </div>
    </nav>

    <!-- Sekcja Dodawania i Listy Usług -->
    <div class="container mt-4">
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
        <div class="mb-3">
          <label for="description" class="form-label">Miasto</label>
          <textarea class="form-control" v-model="newService.city" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Dodaj Usługę</button>
      </form>
    </div>

    <!-- Lista Dostępnych Usług -->
    <div class="container mt-4">
      <h2>Dostępne Usługi</h2>
      <DataTable :value="services" class="mt-4">
        <Column field="name" header="Nazwa"></Column>
        <Column field="props" header="Atrybuty"></Column>
        <Column field="city" header="Miasto"></Column>
        <Column header="Akcje">
          <template #body="slotProps">
            <button class="btn btn-danger ms-2" @click="deleteService(slotProps.data._id)">
              Usuń
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "Services",
  components: {
    DataTable,
    Column
  },
  data() {
    return {
      services: [],
      newService: {
        name: '',
        props: '',
        description: '',
        city: ''
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
        console.error('Error fetching services:', error);
      }
    },
    async addService() {
      try {
        const response = await axios.post('http://localhost:5500/carservicedb/addServices', this.newService);
        this.services.push(response.data);
        this.resetServiceForm();
      } catch (error) {
        console.error('Error adding service:', error);
      }
    },
    resetServiceForm() {
      this.newService = {
        name: '',
        props: '',
        description: '',
        city: ''
      };
    },
    async deleteService(serviceId) {
      try {
        await axios.delete(`http://localhost:5500/carservicedb/deleteServices/${serviceId}`);
        this.services = this.services.filter(service => service._id !== serviceId);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    },
    logout() {
      localStorage.removeItem('loggedIn');
      this.$router.push({ name: "LoginLayout" });
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
