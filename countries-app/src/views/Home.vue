<template>
  <div class="flex min-h-screen bg-sky-100">
    <!-- Sidebar -->
    <aside class="w-60 bg-gray-700 text-white p-4 space-y-4">
      <div class="bg-gray-400 rounded-lg py-2 text-center text-lg font-bold">Logo</div>
      <nav class="space-y-2">
        <button class="w-full text-left bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">Home</button>
        <button class="w-full text-left px-4 py-2 hover:bg-gray-600 rounded-lg">Vista 1</button>
        <button class="w-full text-left px-4 py-2 hover:bg-gray-600 rounded-lg">Vista 2</button>
      </nav>
    </aside>

    <!-- Contenido -->
    <main class="flex-1 p-8">
      <!-- Título -->
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Países Destacados</h1>

      <!-- Barra de búsqueda -->
      <div class="flex justify-center mb-8">
        <div class="relative w-full max-w-xl">
          <!-- Input y botón -->
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Escribe el país que deseas ver"
            class="w-full bg-white rounded-full shadow-md text-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <!-- Grid de tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="country in filteredCountries" :key="country.code"
             class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
             @click="openModal(country)">
          <img src="https://via.placeholder.com/400x200?text=Imagen+del+País" alt="Imagen del país"
               class="w-full h-40 object-cover rounded-t-3xl" />
          <div class="p-4">
            <router-link :to="`/country/${country.code}`"
                         class="text-xl font-bold text-blue-600 hover:underline block">
              {{ country.emoji }} {{ country.name }}
            </router-link>
            <p class="text-sm text-gray-600">{{ country.continent?.name }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de detalles del país -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="modalCountry.imageUrl" alt="Imagen del país" class="w-full h-40 object-cover rounded-t-3xl" />
        <h2 class="text-2xl font-bold mt-4">{{ modalCountry.name }}</h2>
        <p class="text-sm text-gray-600">{{ modalCountry.continent }}</p>
        <p class="mt-2"><strong>Capital:</strong> {{ modalCountry.capital }}</p>
        <p><strong>Language:</strong> {{ modalCountry.language }}</p>
        <p><strong>Population:</strong> {{ modalCountry.population }} people</p>
        <p><strong>Currency:</strong> {{ modalCountry.currency }}</p>
        <p><strong>Region:</strong> {{ modalCountry.region }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`

// Definir las variables reactivas
const searchTerm = ref('')
const isModalOpen = ref(false)
const modalCountry = ref({})

const destacados = ['GB', 'AR', 'ES', 'IT', 'CL', 'AD', 'CN', 'FR', 'PE']

const { result } = useQuery(GET_COUNTRIES)
const countries = computed(() => result.value?.countries || [])

// Verifica el contenido de los países obtenidos
console.log('Países obtenidos:', countries.value)

// Filtrar los países destacados
const filteredCountries = computed(() =>
  countries.value.filter(country => destacados.includes(country.code))
)

// Función para abrir el modal con los detalles del país
function openModal(country) {
  modalCountry.value = country
  isModalOpen.value = true
}

// Función para cerrar el modal
function closeModal() {
  isModalOpen.value = false
}

// Función para realizar la búsqueda
function buscarPais() {
  console.log(`Buscando país: ${searchTerm.value}`)
}
</script>
