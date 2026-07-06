<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import { useCountrySearch } from '@/composables/useCountrySearch'
import type { Country } from '@/types/index.ts'

const router = useRouter()
const { searchQuery, results, isLoading, error } = useCountrySearch()

function handleSelectCountry(country: Country) {
  // Phase 5 will introduce saving to the userStore.
  // For now, we will navigate to check our dynamic routing parameter setup.
  router.push(`/brief/${country.cca2.toLowerCase()}`)
}
</script>

<template>
  <div class="max-w-xl mx-auto my-12 space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">
        Where are you head tracking to?
      </h1>
      <p class="text-lg text-slate-600">
        Enter your destination country to prepare your travel intelligence brief.
      </p>
    </div>

    <div class="relative bg-white p-6 rounded-xl shadow-xs border border-slate-200">
      <BaseInput
        id="country-search"
        label="Destination Country"
        placeholder="e.g. Japan, France, Mexico..."
        v-model="searchQuery"
        :error="error"
      />

      <!-- Loading Indicator Overlay -->
      <div v-if="isLoading" class="absolute right-9 top-[43px]">
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Live Auto-Suggest Box Dropdown -->
      <ul
        v-if="results.length > 0"
        class="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 divide-y divide-slate-100"
      >
        <li v-for="country in results" :key="country.cca3">
          <button
            type="button"
            @click="handleSelectCountry(country)"
            class="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors text-sm font-medium text-slate-700"
          >
            <img
              :src="country.flags.svg"
              :alt="country.flags.alt || country.name.common"
              class="w-6 h-4 object-cover rounded-xs"
            />
            <span>{{ country.name.common }}</span>
            <span class="text-xs text-slate-400 font-normal ml-auto">
              {{ country.subregion }}
            </span>
          </button>
        </li>
      </ul>

      <!-- Empty State Indicator -->
      <div
        v-if="searchQuery.trim() && !isLoading && results.length === 0 && !error"
        class="mt-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 text-center"
      >
        No countries matched your search criteria.
      </div>
    </div>
  </div>
</template>
