<script setup >

  import { ref, onMounted } from 'vue';
  import axiosClient from '../axios'
  import { toast } from 'vue-sonner';

  // const images = ref([
  //   {
  //     id: 1,
  //     label: 'Earthen Bottle',
  //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
  //   },
  //   {
  //     id: 2,
  //     label: 'Nomad Tumbler',
  //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
  //   },
  //   {
  //     id: 3,
  //     label: 'Focus Paper Refill',
  //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
  //   },
  //   {
  //     id: 4,
  //     label: 'Machined Mechanical Pencil',
  //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
  //   },
  // ]);

  const images = ref([]);

  const deleteImage = (id) => {
    if(!confirm("Are you sure you want to delete this image?")){
      return;
    }
    try {
      axiosClient.delete(`/api/image/${id}`)
        .then((response) => {
          if (response.status === 204) {
            console.log('Image deleted successfully!');
            images.value = images.value.filter(image => image.id !== id);
            toast.success('Image deleted!!!')
          } else {
            console.log('Delete response:', response);
          }
        });
    } catch (error) {
      console.error('Delete failed:', error.response?.data || error.message);
    }
  };
  const copyImageUrl = (image) => {
    if (!image || !image.path) {
      alert("Image path not found");
      return;
    }
    navigator.clipboard.writeText(image.path)
      .then(() => {
        alert("Image URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy image URL");
      });
  }

  onMounted(() => {
    axiosClient.get('/api/image')
      .then((response) => {
        console.log(response.data)
        images.value = response.data;
      });
  });
</script>
<template>
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        My Photo Gallary
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="bg-white">
        <div
          class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
        >
          <h2 class="sr-only">Products</h2>

          <div
            class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          >
            <a
              v-for="image in images"
              :key="image.id"
              class="group"
            >
              <img
                :src="image.path"
                :alt="image.label"
                class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 class="mt-4 text-sm text-gray-700">Label: {{ image.label }}</h3>
              <div class="flex justify-center gap-4 mt-4">
                <button @click="copyImageUrl(image)" class="px-3 py-1 w-[100px] rounded-lg text-center transition duration-1000 hover:bg-[radial-gradient(ellipse_at_center,_white,_white,_#a5f3fc,_#06b6d4))] bg-[radial-gradient(ellipse_at_center,_white,_white,_#67e8f9,_#06b6d4))] shadow-md text-purple-800 hover:bg-cyan-300 cursor-pointer">Copy Url</button>
                <button @click="deleteImage(image.id)" class="px-3 py-1 w-[100px] rounded-lg text-center transition duration-1000 hover:bg-[radial-gradient(ellipse_at_center,_white,_white,_#a5f3fc,_#06b6d4))]  bg-[radial-gradient(ellipse_at_center,_white,_white,_#67e8f9,_#06b6d4))] shadow-md text-orange-800 hover:bg-cyan-300 cursor-pointer">Delete</button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
<style scoped></style>
