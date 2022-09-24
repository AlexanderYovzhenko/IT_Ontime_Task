<script setup lang="ts"></script>

<template>
  <div class="welcome">
    <h1>Добро пожаловать в наш сервис!</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.2rem;
  top: -10px;
  text-align: center;
}

@media (min-width: 1024px) {
  .welcome h1 {
    text-align: left;
  }
}
</style>
