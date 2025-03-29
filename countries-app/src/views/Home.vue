<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Lista de Países</h1>
  
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar país..."
        class="border px-4 py-2 mb-4 w-full rounded-md"
      />
  
      <div v-if="loading">Cargando países...</div>
      <div v-else-if="error">Error al cargar: {{ error.message }}</div>
  
      <ul v-else>
        <li
          v-for="country in filteredCountries"
          :key="country.code"
          class="mb-2 cursor-pointer hover:underline"
          @click="goToCountry(country.code)"
        >
          {{ country.name }} ({{ country.code }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useQuery } from '@vue/apollo-composable'
  import { gql } from '@apollo/client/core'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const searchTerm = ref('')
  const router = useRouter()
  
  const GET_COUNTRIES = gql`
    query {
      countries {
        code
        name
      }
    }
  `
  
  const { result, loading, error } = useQuery(GET_COUNTRIES)
  
  const filteredCountries = computed(() => {
    if (!result.value) return []
    return result.value.countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
  
  const goToCountry = (code) => {
    router.push(`/country/${code}`)
  }
  </script>
  