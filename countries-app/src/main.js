import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './style.css'

import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './apollo/client' // este archivo lo acabamos de crear

import router from './router' // lo crearemos en el siguiente paso

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.mount('#app')
