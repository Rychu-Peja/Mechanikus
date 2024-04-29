<template>
  <div class="sidebar">
    <h2 class="sidebar-title">Usterka</h2>
    <div class="sidebar-content">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="option1">
        <label class="form-check-label" for="option1">Opony</label>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="option2">
        <label class="form-check-label" for="option2">Silnik</label>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="option3">
        <label class="form-check-label" for="option3">Elektryka</label>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="option4">
        <label class="form-check-label" for="option4">Inne</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style scoped>
.sidebar {
  width: 170px;
  background-color: #f8f9fa;
  padding: 20px;
  height: 100vh; 
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