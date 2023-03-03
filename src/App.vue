<script setup>
import {RouterLink, RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="max-w-8xl mx-auto px-4 sm:px-8 md:px-8 bg-primary-blue">
    <header>
      <NavBar />
    </header>
  </div>
  <RouterView/>
</template>

<style scoped>

</style>
