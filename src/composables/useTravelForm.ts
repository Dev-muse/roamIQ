import { ref, computed } from 'vue'

export function useTravelForm() {
  const startDate = ref('')
  const endDate = ref('')
  const passportCountry = ref('')

  // Live validation calculations using computed properties (Vue's equivalent to useMemo)
  const errors = computed(() => {
    const errs: { startDate?: string; endDate?: string; passportCountry?: string } = {}

    if (!startDate.value) return errs

    const now = new Date()
    // Strip time out for a clean calendar date comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const start = new Date(startDate.value)

    if (start < today) {
      errs.startDate = 'Departure date cannot be in the past'
    }

    if (!endDate.value) return errs
    const end = new Date(endDate.value)

    if (end < start) {
      errs.endDate = 'Return date must be after your departure date'
    } else {
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > 30) {
        errs.endDate = 'Briefs are currently limited to a maximum of 30 days'
      }
    }

    return errs
  })

  const isValid = computed(() => {
    return (
      !!startDate.value &&
      !!endDate.value &&
      !!passportCountry.value &&
      Object.keys(errors.value).length === 0
    )
  })

  return {
    startDate,
    endDate,
    passportCountry,
    errors,
    isValid,
  }
}
