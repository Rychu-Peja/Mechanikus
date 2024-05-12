<template>
  <div class="sidebar p-shadow-3">
    <h2 class="sidebar-title">Usterka</h2>
    <div class="sidebar-content space-y-4">
      <!-- Each checkbox item -->
      <div class="form-check flex items-center space-x-2">
        <Checkbox inputId="option1" v-model="checkedOptions" value="Opony" />
        <label class="form-check-label" for="option1">Opony</label>
      </div>
      <div class="form-check flex items-center space-x-2">
        <Checkbox inputId="option2" v-model="checkedOptions" value="Silnik" />
        <label class="form-check-label" for="option2">Silnik</label>
      </div>
      <div class="form-check flex items-center space-x-2">
        <Checkbox inputId="option3" v-model="checkedOptions" value="Elektryka" />
        <label class="form-check-label" for="option3">Elektryka</label>
      </div>
      <div class="form-check flex items-center space-x-2">
        <Checkbox inputId="option4" v-model="checkedOptions" value="Inne" />
        <label class="form-check-label" for="option4">Inne</label>
      </div>
    </div>
    <h2 class="sidebar-title" style="margin-top: 30px;">Miasto</h2>
    <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Wybierz miasto" checkmark :highlightOnSelect="false" style="width: 11rem;" />
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';

export default {
  name: 'SideBar',
  components: {
    Checkbox,
    Dropdown
  },
  data() {
    return {
      checkedOptions: []
    };
  }
};
</script>

<script setup>
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
    { name: 'Wybierz miasto', code: '' },
    { name: 'Gdańsk', code: 'GD' },
    { name: 'Gdynia', code: 'GDY' },
    { name: 'Sopot', code: 'SOP' },
    { name: 'Reda', code: 'RD' },
    { name: 'Żukowo', code: 'ZUK' },
    { name: 'Wejcherowo', code: 'WEJ' },
]);
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  height: 100vh; /* Full height of the viewport */
  position: absolute; /* Positioned absolutely */
  left: 0; /* Align with the left edge */
  padding: 20px; /* Adjust padding if required */
  margin-right: 20px;
  box-sizing: border-box; /* Ensure padding is included in width */
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
</style>
