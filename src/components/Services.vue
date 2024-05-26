<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" icon="pi pi-check" to="/admin">Mechanikus</router-link>
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
          <div class="card flex justify-content-center">
            <MultiSelect v-model="newService.props" :options="props" optionLabel="name" optionValue="code" placeholder="Wybierz atrybuty"
              class="w-full md:w-20rem" required/>
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Opis</label>
          <textarea class="form-control" v-model="newService.description" required></textarea>
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">Miasto</label>
          <input type="text" class="form-control" v-model="newService.city" required />
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Obraz</label>
            <input type="file" class="form-control" @change="handleFileUpload" />
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
import MultiSelect from 'primevue/multiselect'; // Ensure this import

export default {
  name: "Services",
  components: {
    DataTable,
    Column,
    MultiSelect,
  },
  data() {
    return {
      services: [],
      newService: {
        name: '',
        props: [],  
        description: '',
        city: '',
        imageFile: null
      },
      props: [
        { name: 'Opony', code: 'Opony' },
        { name: 'Szyby', code: 'Szyby' },
        { name: 'Silnik', code: 'Silnik' },
        { name: 'Lakier', code: 'Lakier' },
        { name: 'Elektryka', code: 'Elektryka' },
        { name: 'Hamulce', code: 'Hamulce' },
        { name: 'Klimatyzacja', code: 'Klimatyzacja' },
        { name: 'Wymiana płynów', code: 'Płyny' },
        { name: 'Inne', code: 'Inne' },
      ]
    };
  },
  methods: {
    handleFileUpload(event) {
      this.newService.imageFile = event.target.files[0];
    },

    updateProps(event) {
      this.newService.props = event.target.value.split(',').map(item => item.trim());
    },

    async fetchServices() {
      try {
        const response = await axios.get('http://localhost:5500/carservicedb/services');
        this.services = response.data;
        this.services.forEach(service => {
          service.props = service.props.join(', ');
        });
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },

    async addService() {
      const formData = new FormData();
      formData.append('name', this.newService.name);
      formData.append('props', JSON.stringify(this.newService.props));
      formData.append('description', this.newService.description);
      formData.append('city', this.newService.city);
      if (this.newService.imageFile) {
        formData.append('image', this.newService.imageFile);
      }

      try {
        const response = await axios.post('http://localhost:5500/carservicedb/addServices', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.services.push(response.data);
        this.resetServiceForm();
      } catch (error) {
        console.error('Error adding service:', error);
      }
    },

    resetServiceForm() {
      this.newService = {
        name: '',
        props: [],
        description: '',
        city: '',
        imageFile: null
      };
      this.propsAsString = '';
    },

    async deleteService(serviceId) {
      try {
        await axios.delete(`http://localhost:5500/carservicedb/deleteServices/${serviceId}`);
        this.services = this.services.filter(service => service._id !== serviceId);
      } catch (error) {
        console.error('Error deleting service:', error);
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

    logout() {
      localStorage.removeItem('loggedIn');
      this.$router.push({ name: "LoginLayout" });
    }
  },
  mounted() {
    this.fetchServices();
    this.fetchLoggedInUser();
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
