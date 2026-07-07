<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import { useCountrySearch } from '@/composables/useCountrySearch'
import { useTravelForm } from '@/composables/useTravelForm'
import type { Country } from '@/types'

const router = useRouter()
const { searchQuery, results, isLoading, error: searchError, noResults } = useCountrySearch()
const { startDate, endDate, passportCountry, errors, isValid } = useTravelForm()

const selectedCountry = ref<Country | null>(null)

function handleSelectCountry(country: Country) {
  selectedCountry.value = country
  // Updated path
  searchQuery.value = country.names.common
  results.value = []
}

function clearSelection() {
  selectedCountry.value = null
  searchQuery.value = ''
}

function handleSubmit() {
  if (!isValid.value || !selectedCountry.value) return

  // Updated path to alpha_2
  router.push(`/brief/${selectedCountry.value.codes.alpha_2.toLowerCase()}`)
}
</script>

<template>
  <div class="max-w-xl mx-auto my-12 space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">RoamIQ Briefing Engine</h1>
      <p class="text-lg text-slate-600">Generate your unified pre-trip intelligence report.</p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="space-y-6 bg-white p-6 rounded-xl shadow-xs border border-slate-200"
    >
      <div class="relative">
        <BaseInput
          id="country-search"
          label="1. Where are you traveling to?"
          placeholder="e.g. Japan, France, Italy..."
          v-model="searchQuery"
          :error="searchError"
          :disabled="!!selectedCountry"
        />

        <div v-if="isLoading" class="absolute right-3 top-9.5">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
        </div>

        <div
          v-if="selectedCountry"
          class="mt-2 flex items-center justify-between p-2.5 bg-indigo-50/50 rounded-lg border border-indigo-100"
        >
          <div class="flex items-center gap-3">
            <span class="text-xl">{{ selectedCountry.flag.emoji }}</span>
            <span class="text-sm font-semibold text-slate-800">{{
              selectedCountry.names.common
            }}</span>
          </div>
          <button
            type="button"
            @click="clearSelection"
            class="text-xs font-medium text-indigo-600 hover:text-indigo-800 underline"
          >
            Change
          </button>
        </div>

        <ul
          v-if="(results.length > 0 || noResults) && !selectedCountry"
          class="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 divide-y divide-slate-100"
        >
          <li v-for="country in results" :key="country.codes.alpha_3">
            <button
              type="button"
              @click="handleSelectCountry(country)"
              class="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors text-sm font-medium text-slate-700"
            >
              <span class="text-xl">{{ country.flag.emoji }}</span>
              <span>{{ country.names.common }}</span>
              <span class="text-xs text-slate-400 font-normal ml-auto">{{
                country.subregion
              }}</span>
            </button>
          </li>
          <li v-if="noResults && !isLoading" class="px-4 py-3 text-sm text-slate-500">
            No countries found matching "{{ searchQuery }}"
          </li>
        </ul>
      </div>

      <div v-if="selectedCountry" class="space-y-6 pt-4 border-t border-slate-100 animate-fadeIn">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            id="start-date"
            label="Departure Date"
            type="date"
            v-model="startDate"
            :error="errors.startDate"
          />
          <BaseInput
            id="end-date"
            label="Return Date"
            type="date"
            v-model="endDate"
            :error="errors.endDate"
          />
        </div>

        <BaseInput
          id="passport-country"
          label="2. What passport do you hold?"
          placeholder="e.g. United Kingdom, Canada..."
          v-model="passportCountry"
          :error="errors.passportCountry"
        />

        <button
          type="submit"
          :disabled="!isValid"
          class="w-full mt-4 bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-xs hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Intel Brief
        </button>
      </div>
    </form>
  </div>
</template>
