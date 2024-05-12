<!-- Mechanikus/src/components/DataServices.vue -->
<template>
  <div class="data-services">
    <h2>Usługi</h2>
    <div class="row">
      <div v-for="service in services" :key="service._id" class="col mb-4">
        <Card style="width: 25rem; overflow: hidden" class="mx-auto mb-3">
          <template #header>
            <img :src="service.imagePath || '/src/assets/warsztat.jpg'" alt="warsztat" style="max-width: 100%;" />
          </template>
          <template #title>{{ service.name }}</template>
          <!-- Convert array of props to a comma-separated sentence -->
          <template #subtitle>{{ service.props.join(', ') }}</template>
          <template #content>
            <p>{{ service.description }}</p>
          </template>
          <template #footer>
            <RouterLink :to="{ name: 'ShopDetails', query: { serviceId: service._id } }">
              <Button class="btn btn-blue" label="Szczegóły" />
            </RouterLink>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Card from 'primevue/card';
import Button from 'primevue/button';


export default {
  name: 'DataServices',
  props: {
    services: {
      type: Array,
      required: true
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
