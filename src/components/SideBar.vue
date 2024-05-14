<template>
  <div class="sidebar p-shadow-3">
    <h2 class="sidebar-title">Usterka</h2>
    <div class="sidebar-content space-y-4">
      <div class="form-check flex items-center space-x-2" v-for="(option, index) in options" :key="index">
        <Checkbox :inputId="'option' + index" v-model="checkedOptions" :value="option" />
        <label :for="'option' + index">{{ option }}</label>
      </div>
    </div>
    <h2 class="sidebar-title" style="margin-top: 30px;">Miasto</h2>
    <Dropdown v-model="selectedCity" :options="cities" showClear optionLabel="name" placeholder="Wybierz miasto" :highlightOnSelect="false" style="width: 11rem;" @change="cityChanged" />
    <Button style="margin-top: 2rem;  width: 11rem;" class="btn btn-blue" label="Filtruj" @click="applyFilters" />
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import axios from 'axios';

export default {
  name: 'SideBar',
  components: {
    Checkbox,
    Dropdown,
    Button
  },
  data() {
    return {
      checkedOptions: [],
      options: ['Opony', 'Silnik', 'Elektryka', 'Inne'],
      cities: [],
      selectedCity: null
    };
  },
  methods: {
    fetchCities() {
      axios.get('http://localhost:5500/carservicedb/cities')
        .then(response => {
          this.cities = response.data.map(city => ({ name: city, code: city }));
        })
        .catch(error => console.error('Error fetching cities:', error));
    },
    cityChanged(city) {
      this.$emit('citySelected', city.code);
    },
  },
  mounted() {
    this.fetchCities();
  }
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  height: 100vh;
  position: absolute;
  left: 0;
  padding: 20px;
  margin-right: 20px;
  box-sizing: border-box;
}

.sidebar-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #6c757d;
}

.sidebar-content {
  margin-top: 10px;
}

.form-check-label {
  font-size: 16px;
  color: #6c757d;
}
.btn-blue {
  background-color: rgb(0, 110, 255);
  color: white;
}
</style>
