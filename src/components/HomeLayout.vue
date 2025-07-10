<script setup>
    import Header from './Header.vue';
</script>

<template>
<div class="min-h-full">
<Header></Header>
<router-view />
<Toaster />
</div>
</template>

<style scoped>

</style>
