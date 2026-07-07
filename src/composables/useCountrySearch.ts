// src/composables/useCountrySearch.ts
import { ref, watch } from 'vue'
import type { Country } from '@/types/index'

export function useCountrySearch() {
  const searchQuery = ref('')
  const results = ref<Country[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const noResults = ref(false)

  async function searchCountries(query: string) {
    const cleanQuery = query.trim()
    if (!cleanQuery) {
      results.value = []
      error.value = null
      noResults.value = false // ADD THIS LINE: Reset the state when input is cleared
      return
    }

    isLoading.value = true
    error.value = null
    noResults.value = false

    try {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(cleanQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error('Auth error: Check your API key')
        }
        // Set to empty results instead of throwing an error that breaks the UI
        results.value = []
        noResults.value = true
        return
      }

      const responseData = await response.json()

      // Dig into the v5 response envelope to get the actual array
      if (responseData && responseData.data && Array.isArray(responseData.data.objects)) {
        results.value = responseData.data.objects
        noResults.value = results.value.length === 0 // Set to true if empty
      } else {
        results.value = []
        noResults.value = true
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while searching'
      results.value = []
      noResults.value = true
    } finally {
      isLoading.value = false
    }
  }

  // Correct Vue 3 debounce using onCleanup
  watch(searchQuery, (newQuery, oldQuery, onCleanup) => {
    const delayDebounceFn = setTimeout(() => {
      searchCountries(newQuery)
    }, 400)

    // This correctly cancels the previous timer if the user types again within 400ms
    onCleanup(() => {
      clearTimeout(delayDebounceFn)
    })
  })

  return {
    searchQuery,
    results,
    isLoading,
    error,
    noResults,
  }
}
