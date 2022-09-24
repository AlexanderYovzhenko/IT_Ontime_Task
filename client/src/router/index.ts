import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BidsView from "../views/BidsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/bids",
      name: "bids",
      component: BidsView,
    },
  ],
});

export default router;
