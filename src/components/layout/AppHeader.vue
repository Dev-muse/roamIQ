<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink to="/" class="text-xl font-bold tracking-tight text-indigo-600">
        RoamIQ
      </RouterLink>

      <nav class="flex items-center gap-6">
        <RouterLink
          to="/"
          class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          active-class="text-indigo-600 font-semibold"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/saved"
          class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          active-class="text-indigo-600 font-semibold"
        >
          Saved Trips
        </RouterLink>

        <span
          class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
        >
          Free Tier
        </span>
      </nav>
    </div>
  </header>
</template>
