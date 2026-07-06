<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
    <AppHeader />

    <main class="grow max-w-7xl w-full mx-auto px-4 py-8">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>
