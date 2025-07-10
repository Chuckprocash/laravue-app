<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { Bars3Icon,  XMarkIcon } from '@heroicons/vue/24/outline'
    import image from '../assets/face.jpg';
    import { ref, computed} from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';
    import { toast } from 'vue-sonner';
    import useUserStore from '../store/user'

 
    const route = useRoute();
    const router = useRouter();

    const userStore = useUserStore();

    let user = userStore.user;
    
    user = {...user, imageUrl: image};

    // console.log(user)

    const navigation = ref([
    { name: 'Dashboard', router: '/', current: true },
    { name: 'My Images', router: '/images', current: false },
    ]);


    const activePage = computed(() => {return route.path});

    const isToken = ref(localStorage.getItem('token'));
    const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      // debugger;
      if (!token) {
        toast.warning('No user is currently logged in.');
        return;
      }

      // Make API request to logout
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      // Clear token and headers
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      toast.success('Logged out successfully!');
      isToken.value = null;
      router.push('/login');
    } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.warning('You are already logged out.');
      console.log(error.response.message)
    } else {
      toast.error('Logout failed. Please try again.');
    }
  }
    };

</script>
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0">
            <img class="size-8" src="../assets/dev8t.png" alt="Your Company" @click="$router.push('/login')"/>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.router"
                :class="[
                  activePage === item.router
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</RouterLink>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <!-- <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true" />
              </button> -->

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton v-if="isToken"
                  class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="size-8 rounded-full"
                    :src="user.imageUrl"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                >
                  <MenuItem>
                    <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" @click="logout">Log Out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.router"
          :class="[
            activePage === item.router
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="activePage === item.router ? 'page' : undefined"
          >{{ item.name }}</RouterLink
        >
      </div>
      <div v-if="isToken" class="border-t border-gray-700 pt-4 pb-3">
        <div  class="flex items-center px-5">
          <div class="shrink-0">
            <img class="size-10 rounded-full" :src="user.imageUrl" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base/5 font-medium text-white">
              {{ user.name }}
            </div>
            <div class="text-sm font-medium text-gray-400">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            as="a"
            @click="logout"
            class="block rounded-md cursor-pointer px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >Log Out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
<style scoped></style>
