// main.ts
import './assets/main.css';
import './assets/base.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // <-- Thêm dòng này
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createRouter, createWebHistory } from 'vue-router'
import * as lucide from 'lucide-vue-next'


const app = createApp(App);
const pinia = createPinia(); // <-- Khởi tạo Pinia

app.use(router);
app.use(pinia); // <-- Sử dụng Pinia trong ứng dụng Vue của bạn

app.mount('#app');
