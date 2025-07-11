<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import GuestLayout from "../components/GuestLayout.vue";
import axios from 'axios';
import { toast } from 'vue-sonner';

const router = useRouter();

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const registerUser = async () => {
  try {
    const response = await axios.post('https://laravue-api-production.up.railway.app/api/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const token = response.data.token;
  
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    formData.name= '';
    formData.email= '';
    formData.password= '';
    formData.password_confirmation= '';
    toast.success(response.data.message);
    
    console.log(response.data.message)
    router.push('/');
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log('Validation Errors:', error.response.data.errors);
      toast.error('Something went wrong, try again !!!');
    }
  }
}


</script>
<template>
  <GuestLayout>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
        >
            Register Your Account
          </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-4" @submit.prevent="registerUser">
          <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-900"
              >Your name</label
            >
            <div class="mt-2">
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                type="email"
                id="email"
                v-model="formData.email"
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
                v-model="formData.password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label
                for="password-confirmation"
                class="block text-sm/6 font-medium text-gray-900"
                >Retype Password</label
              >
            </div>
            <div class="mt-2">
              <input
                type="password"
                id="password-confirmation"
                v-model="formData.password_confirmation"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center cursor-pointer rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create account
            </button>
          </div>
        </form>
         <p class="mt-10 text-center text-sm/6 text-gray-500">
          Already Have An Account?
          <a
            @click="router.push('/login')"
            href="#"
            class="font-semibold text-cyan-600 hover:text-cyan-500"
            >Sign in</a
          >
        </p>
      </div>
    </div>
  </GuestLayout>
</template>
<style scoped></style>
