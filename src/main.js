import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './router';
import { Toaster } from 'vue-sonner';
import { createPinia } from 'pinia';



const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.component('Toaster', Toaster);

app.use(router);
app.mount('#app');



