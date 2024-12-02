import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
import { fab } from '@fortawesome/free-brands-svg-icons'; 

// Thêm toàn bộ icon từ `fas` vào thư viện
library.add(fas,fab);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
