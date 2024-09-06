import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import './assets/scss/app.scss';

export const app = createApp(App);

app.use(router).mount('#app');
