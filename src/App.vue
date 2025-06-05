<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <!-- Chỉ hiện Carousel nếu đang ở trang chủ -->
    <BootstrapCarousel v-if="isHomePage" />

    <main class="flex-grow px-4 bg-gray-100 text-gray-800">
      <RouterView /> <!-- HIỂN THỊ TRANG TƯƠNG ỨNG (gồm cả trang AuthView.vue) -->
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import BootstrapCarousel from './components/BootstrapCarousel.vue'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>
