<script setup>
import { ref, reactive } from 'vue';
import { PhotoIcon } from "@heroicons/vue/24/solid";
import axiosClient from "../axios";
import axios from 'axios';
import { toast } from 'vue-sonner';
import router from '../router';


const data = reactive({
  label: '',
  image: null
});

const token = localStorage.getItem('token');

// const uploadImage = () => {
//   const formData = new FormData();
//   formData.append('image', data.value.image);
//   formData.append('label', data.value.label);

//   axiosClient.post('/api/image', formData)
//     .then((response) => {
//       router.push({name: 'MyImages'});
//     });
// }

const uploadImage = async () => {
  const formData = new FormData();
  formData.append('image', data.image); // or the proper field name expected by your API
  formData.append('label', data.label);

  try {
    const response = await axios.post('/api/image', formData, {
      baseURL: 'http://localhost:8000',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // your token here
      },
    });
    router.push({ name: 'MyImages' });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Laravel validation error
      const validationErrors = error.response.data.errors;

      if (validationErrors.image) {
        toast.warning(`Image Error: ${validationErrors.image[0]}`);
      }

      if (validationErrors.label) {
        toast.warning(`Label Error: ${validationErrors.label[0]}`);
      }
    } else {
      // Generic error
      toast.warning('Something went wrong during upload.');
      console.error(error);
    }
  }
};

const handleImageUpload = (event) => {
  data.image = event.target.files[0];
};

</script>
<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main>
    <form @submit.prevent="uploadImage">
      <div class="m-4">
        <label
          for="file-upload"
          class="block text-sm/6 font-medium text-gray-900"
          >Upload photo</label
        >
        <div
          class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        >
          <div class="text-center">
            <PhotoIcon
              class="mx-auto size-12 text-gray-300"
              aria-hidden="true"
            />
            <div class="mt-4 flex text-sm/6 text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-cyan-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="handleImageUpload"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <div class="m-4">
        <label for="label" class="block text-sm/6 font-medium text-gray-900"
          >Label</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="label"
            id="label"
            v-model="data.label"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div class="m-4">
         <button type="submit" class="cursor-pointer rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Upload</button>
      </div>
    </form>
  </main>
  </div>
</template>
<style scoped></style>
