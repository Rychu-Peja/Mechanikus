<!-- Mechanikus/src/components/DataServices.vue -->
<template>
  <div class="data-services">
    <h2>Usługi</h2>
    <div class="row row-cols-3">
      <div v-for="service in services" :key="service._id" class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ service.name }}</h5>
            <div class="card-image">
              <img src="/src/assets/warsztat.jpg" alt="Obrazek usługi" class="card-img-top" />
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
  padding: 15px;
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
