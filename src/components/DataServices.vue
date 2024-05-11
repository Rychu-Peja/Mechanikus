<template>
  <h2 style="margin-bottom: 25px;">Usługi</h2>
  <div class="row row-cols-3 flex-wrap"> <!-- Dodanie flex-wrap -->
    <div v-for="service in services" :key="service._id" class="col mb-4">
      <Card style="width: 25rem; overflow: hidden" class="mx-auto mb-3"> <!-- Dodanie klas Bootstrapa -->
        <template #header>
          <img alt="warsztat" src="/src/assets/warsztat.jpg" style="max-width: 100%;" />
        </template>
        <template #title>{{ service.name }}</template>
        <template #subtitle>{{ service.props }}</template>
        <template #content>
          <p class="m-0"> <!--{{ service.desc }} --> </p>
        </template>
        <template #footer>
          <div class="flex gap-3 mt-1">
            <RouterLink :to="{ name: 'ShopDetails', query: { serviceId: service._id } }">
              <Button class="btn btn-blue" style="margin-left: 70%;" label="Szczegóły" /> <!-- Ustawienie marginesu auto -->
            </RouterLink>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Card from 'primevue/card';
import Button from 'primevue/button';


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
    }
  }
};
</script>

<style scoped>
.data-services {
  width: 100%;
  padding: 25px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.btn-blue {
  background-color: rgb(0, 110, 255);
  color: white;
}
</style>
