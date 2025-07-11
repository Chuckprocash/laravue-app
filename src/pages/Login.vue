<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import GuestLayout from "../components/GuestLayout.vue";
import logo from '../assets/peticon-dog-3.svg';
import axios from 'axios';
import { toast } from 'vue-sonner';

const router = useRouter();
const credentials = reactive({
  email: '',
  password: '',
});

async function loginUser() {
  try {
    const response = await axios.post('https://laravue-api-production.up.railway.app/api/login', {
      email: credentials.email,
      password: credentials.password,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const token = response.data.token;
    // debugger;
    // Save the token (localStorage, Pinia/Vuex, or wherever)
    localStorage.setItem('token', token);

    // Set default Authorization header for all future Axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    toast.success('Login successful!');
    router.push('/');

    console.log(response.data.message)
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 422) {
        // Validation error (e.g., missing fields)
        const errors = error.response.data.errors;
        Object.values(errors).forEach(err => toast.error(err[0]));
      } else if (status === 401) {
        // Incorrect credentials
        toast.error('Invalid email or password.');
      } else {
        toast.error('Login failed. Please try again.');
      }

    } else {
      // Network error or server unreachable
      toast.error('Cannot connect to server.');
    }

    return null;
  }
}

</script>
<template>
  <GuestLayout>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          :src="logo"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="loginUser">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                type="email"
                id="email"
                v-model="credentials.email"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm/6 font-medium text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                type="password"
                id="password"
                v-model="credentials.password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center cursor-pointer rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Do Not Have An Account?
          <a
            @click="router.push('/register')"
            href="#"
            class="font-semibold text-cyan-600 hover:text-cyan-500"
            >Sign Up Now!</a
          >
        </p>
      </div>
    </div>
  </GuestLayout>
</template>
<style scoped></style>
