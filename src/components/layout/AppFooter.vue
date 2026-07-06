<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white border-t border-slate-200 py-6 mt-auto">
    <div class="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
      <p>&copy; {{ currentYear }} RoamIQ. All rights reserved.</p>
    </div>
  </footer>
</template>
