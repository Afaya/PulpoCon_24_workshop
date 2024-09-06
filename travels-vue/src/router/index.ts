import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let title =
    (to.meta && (to.meta.title as string)) ||
    import.meta.env.VITE_APP_TITLE ||
    '';

  document.title = title;

  next();
});

export default router;
