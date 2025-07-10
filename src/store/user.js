import { defineStore } from 'pinia';
import axiosClient from '../axios';

const useUserStore = defineStore('user', {
    state: () => ({
        user: {}
    }),
    actions: {
        async fetchUser() {
            try {
                const { data } = await axiosClient.get('/api/profile');
                console.log('User fetched:', data);
                this.user = data.data;
            } catch (error) {
                 // console.error('Error fetching user:', error);
                throw error; // important if used with await in guards
            }
        }
    }
});


export default useUserStore;