import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CountryDetail from "../views/CountryDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:code",
    name: "CountryDetail",
    component: CountryDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
