import 'virtual:uno.css';
import '@/styles/eve.css';
import './docs.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import NotFound from './layout/NotFound.vue';
import { pages } from './registry';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...pages.map((p) => ({ path: p.path, component: p.load, meta: { page: p } })),
    { path: '/:rest(.*)*', component: NotFound },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash, top: 64 };
    return { top: 0 };
  },
});

createApp(App).use(router).mount('#app');
