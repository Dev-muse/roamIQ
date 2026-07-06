<script setup lang="ts">
interface Props {
  id: string
  label?: string
  placeholder?: string
  type?: string
  error?: string | null
}

// Automatically binds to v-model on the parent side
const model = defineModel<string>({ default: '' })

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-sm font-medium text-slate-700">
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type || 'text'"
      v-model="model"
      :placeholder="placeholder"
      class="w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
      :class="[
        error
          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
          : 'border-slate-300 focus:border-indigo-500',
      ]"
    />

    <span v-if="error" class="text-xs text-rose-600 mt-0.5">
      {{ error }}
    </span>
  </div>
</template>
