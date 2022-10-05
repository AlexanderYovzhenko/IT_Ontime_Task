import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BidsView from "../views/BidsView.vue";
import BidFormView from "../views/BidFormView.vue";

const fieldsFormArray = [
  {
    type: "text",
    name: "name",
    placeholder: "Название",
    required: false,
    value: "Название",
  },
  {
    type: "text",
    name: "name",
    placeholder: "Название",
    required: false,
    value: "Название",
  },
  {
    type: "textarea",
    name: "description",
    placeholder: "Описание",
    required: false,
    value: "Описание",
  },
  {
    type: "date",
    name: "date",
    placeholder: "Дата",
    required: false,
    value: "Дата",
  },
];

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
      props: fieldsFormArray,
    },
    {
      // path: "/bidForm",
      // name: "bidForm",
      // component: BidFormView,
    },
  ],
});

export default router;
