<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
      </div>
  
      <!-- Slides -->
      <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="/public/ban-sac-am-thuc.jpg" class="d-block w-100" alt="Slide 1" style="height: 350px; ">

        </div>
        <div class="carousel-item">
          <img src="/public/amthuc2.jpg" class="d-block w-100" alt="Slide 2" style="height: 350px; ">
        </div>
        <div class="carousel-item">
          <img src="/public/amthuc3.jpg" class="d-block w-100" alt="Slide 3" style="height: 350px; ">
        </div>
      </div>
      <!-- Controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
    <section class="featured-section">
      <h2 class="section-title">✨ Sản Phẩm Nổi Bật</h2>
      <div class="product-grid">
          <RouterLink
  v-for="item in featuredItems"
  :key="item.name"
  :to="`/food/${item.name}`"
  class="product-card"
>
  <img :src="item.image" :alt="item.name" class="product-image" />
  <h3 class="product-name">{{ item.name }}</h3>
  <p class="product-price">{{ item.price }}₫</p>
</RouterLink>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
  import { foodItems } from '@/router/foodItems'
  import { onMounted } from 'vue'

onMounted(() => {
  console.log('Featured Items:', featuredItems.value)
})

  const featuredItems = computed (() =>
  foodItems.filter(item => item.isFeatured)
)
  </script>
  
  <style scoped>
.featured-section {
  padding: 40px 20px;
  background-color: #fff3e0;
  text-align: center;
}
a.product-card {
  text-decoration: none;
  color: inherit;
  display: block;
}
.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #ff5722;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  justify-content: center;
  text-decoration: none;
}

.product-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
}
.product-image:hover{
          transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-name {
  display: block;
  text-decoration: none;
  font-size: 16px;
  margin: 10px 0 5px;
}

.product-price {
  text-decoration: none;
  color: #e91e63;
  font-weight: bold;
}
.buy-button{
    margin-top: 12px;
    padding: 8px 16px;
    background-color: #ff5722;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}
  </style>
  