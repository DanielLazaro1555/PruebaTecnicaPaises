<template>
    <div class="p-4">
      <button @click="goBack" class="mb-4 text-blue-600 underline">← Volver</button>
  
      <div v-if="loading">Cargando detalles...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else-if="country">
        <h1 class="text-2xl font-bold mb-2">{{ country.name }}</h1>
        <p><strong>Código:</strong> {{ country.code }}</p>
        <p><strong>Capital:</strong> {{ country.capital || 'No disponible' }}</p>
        <p><strong>Moneda:</strong> {{ country.currency || 'No disponible' }}</p>
        <p><strong>Idioma(s):</strong> {{ country.languages.map(lang => lang.name).join(', ') || 'No disponible' }}</p>
        <div v-if="country.states && country.states.length > 0">
          <p><strong>Estados:</strong></p>
          <ul class="list-disc list-inside">
            <li v-for="state in country.states" :key="state.code">{{ state.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useQuery } from '@vue/apollo-composable'
  import { gql } from '@apollo/client/core'
  import { computed } from 'vue'
  
  const route = useRoute()
  const router = useRouter()
  
  const GET_COUNTRY = gql`
    query getCountry($code: ID!) {
      country(code: $code) {
        code
        name
        capital
        currency
        languages {
          code
          name
        }
        states {
          code
          name
        }
      }
    }
  `
  
  // Se pasan las variables como función para que sean evaluadas reactivamente:
  const { result, loading, error } = useQuery(GET_COUNTRY, () => ({ code: route.params.code }))
  
  const country = computed(() => result.value ? result.value.country : null)
  
  const goBack = () => {
    router.back()
  }
  </script>
  