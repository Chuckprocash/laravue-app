import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import HomeLayout from '../components/HomeLayout.vue';
import MyImages from '../pages/MyImages.vue';
import NotFound from '../pages/NotFound.vue';
import useUserStore from '../store/user';


const routes = [
    {
        path: '/',
        component: HomeLayout,
        children: [
            {path:'/', name:'Home', component: Home},
            {path:'/images', name:'MyImages', component: MyImages},
        ],
        beforeEnter: async (to, from, next) => {
            try { 
                const userStore = useUserStore()
                await userStore.fetchUser();
                next();
            } catch(error) {
                // console.error('Failed to fetch data', error)
                next(false);
            }
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;