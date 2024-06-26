<template>
    <div>
       <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" icon="pi pi-check" to="isAdmin ? '/admin' : '/'">Mechanikus</router-link>
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
  
      <div class="main-container">
        <div class="sidebar">
          <SideBar @applyFilters="applyFilters" />
        </div>
        <div class="services">
          <DataServices :services="filteredServices" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import DataServices from './DataServices.vue'
  import SideBar from './SideBar.vue';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import IconField from 'primevue/iconfield';
  import 'primeicons/primeicons.css'
  
  
  export default {
    name: 'AdminView',
    components: {
      DataServices,
      SideBar
    },
    data() {
      return {
        services: [], // Wszystkie usługi
        filteredServices: [], // Usługi po filtrze
        searchQuery: '', // Zapytanie wyszukiwania
        userName: '', // Imię zalogowanego użytkownika
        isAdmin: false,
      };
    },
    async mounted() {
      await this.fetchServices();
      await this.fetchLoggedInUser(); // Pobierz dane użytkownika podczas montowania komponentu
    },
    methods: {
      async fetchServices() {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get('http://localhost:5500/carservicedb/services', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.services = response.data;
          this.filteredServices = this.services; // Ustaw początkowe wartości
        } catch (error) {
          console.error('Błąd pobierania usług:', error);
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
          this.isAdmin = user.__v || user.type === 1;
        } else {
          console.log('Brak zalogowanego użytkownika.');
          this.userName = 'Gość';
        }
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
        this.userName = 'Gość';
      }
    },
    applyFilters({ city, props }) {
      this.filteredServices = this.services.filter(service => {
        const matchesCity = city ? service.city === city : true;
        const matchesProps = props.length ? props.every(prop => service.props.includes(prop)) : true;
        return matchesCity && matchesProps;
      });
    },
      filterServices() {
        const query = this.searchQuery.toLowerCase();
        this.filteredServices = this.services.filter(service =>
          service.name.toLowerCase().includes(query)
        );
      },
      logout() {
          localStorage.removeItem('loggedIn');
          localStorage.removeItem('user');
          this.$router.push({ name: "LoginLayout" });
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-search {
    width: 200px;
  }
  
  .navbar-text {
    color: white;
  }
  
  .main-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 15px;
  }
  
  .sidebar {
    flex: 0 0 180px;
    background-color: #f8f9fa;
    padding: 15px;
    box-sizing: border-box;
  }
  
  .services {
    flex: 1;
    padding: 5px;
    margin-left: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  