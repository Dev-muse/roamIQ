<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-3xl font-bold">Travel Brief</h1>
    <p class="text-slate-600">Viewing brief ID: {{ route.params.id }}</p>
  </div>
</template>
