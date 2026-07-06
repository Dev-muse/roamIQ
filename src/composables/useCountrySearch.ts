import { ref, watch } from 'vue'
import type { Country } from '@/types/index.ts'

export function useCountrySearch() {
  const searchQuery = ref('')
  const results = ref<Country[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function searchCountries(query: string) {
    const cleanQuery = query.trim()
    if (!cleanQuery) {
      results.value = []
      error.value = null
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Fetch only the explicit fields structured in our Country interface
      const fields =
        'name,capital,currencies,languages,region,subregion,population,flags,latlng,cca2,cca3,tld'
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(cleanQuery)}?fields=${fields}`,
      )

      if (response.status === 404) {
        results.value = []
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch country data')
      }

      const data: Country[] = await response.json()
      results.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while searching'
      results.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Handle debouncing inside the composable using watch
  watch(searchQuery, (newQuery) => {
    const delayDebounceFn = setTimeout(() => {
      searchCountries(newQuery)
    }, 400)

    // Vue's watch passes an onWatcherCleanup callback function as the 3rd parameter
    // or we can clean it up dynamically inside an effect.
    return () => clearTimeout(delayDebounceFn)
  })

  return {
    searchQuery,
    results,
    isLoading,
    error,
  }
}
