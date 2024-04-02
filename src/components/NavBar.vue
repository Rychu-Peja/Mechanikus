<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container"> 
        <a class="navbar-brand" href="#">Mechanikus</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Rezerwacje</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Warsztaty</a>
            </li>
          </ul>
        </div>
        <div class="navbar-search"> 
          <input type="text" class="form-control" placeholder="Wyszukaj">
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .container {
    padding-left: 15px; 
    padding-right: 15px; 
  }
  
  .navbar-search {
    margin-left: auto; 
    margin-right: auto; 
  }
  </style>
  