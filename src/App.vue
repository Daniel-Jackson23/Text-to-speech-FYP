<script setup>
import {RouterLink, RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="max-w-8xl mx-auto max-h-full px-4 sm:px-8 md:px-8 bg-primary-blue dark:bg-slate-800">
    <header>
      <NavBar />
    </header>
  </div>
  <RouterView/>
</template>

<style>
html.dark{
  color-scheme: dark;
}
body, header{
  @apply bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-50
}
</style>
