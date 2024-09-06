import type { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/Home.vue';
import TravelEdit from '../views/TravelEdition.vue';
import TravelList from '../views/TravelList.vue';
import Page404 from '../views/Page404View.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'My travels',
    },
  },
  {
    path: '/travels',
    name: 'travel-list',
    component: TravelList,
    meta: {
      title: 'Travels list',
    },
  },
  {
    path: '/travel-edit/:id',
    name: 'travel-edit',
    component: TravelEdit,
    meta: {
      title: 'Edition',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-404',
    component: Page404,
    meta: {
      title: 'Page Not Found',
    },
  },
];
