<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
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
/* === Featured Section === */
.featured-section {
  padding: 60px 20px;
  background-color: #fef9f5;
  text-align: center;
}

.section-title {
  font-size: 28px;
  margin-bottom: 40px;
  color: #d84315;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* === Product Grid === */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 32px;
  max-width: 1300px;
  margin: auto;
  padding: 0 10px;
}

a.product-card {
  text-decoration: none;
  color: inherit;
}

.product-card {
  background-color: #fff;
  padding: 22px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
}

.product-price {
  font-size: 16px;
  color: #e53935;
  font-weight: 600;
}

/* Optional Buy Button */
.buy-button {
  margin-top: 14px;
  padding: 10px 24px;
  font-size: 15px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background-color: #e64a19;
  transform: translateY(-2px);
}

/* === Carousel Styling === */
.carousel-item img {
  max-width: 100%;
  height:80px;
  object-fit:contain;
  object-position: center;
  display: flex;
}

.carousel-indicators [data-bs-target] {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 6px;
  transition: all 0.3s ease;
}

.carousel-indicators .active {
  background-color: #ff5722;
  transform: scale(1.3);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.6));
}

/* === Responsive Adjustments === */
@media (max-width: 768px) {
  .carousel-item img {
    height: 200px;
  }

  .section-title {
    font-size: 22px;
  }

  .product-card {
    padding: 16px;
  }

  .product-name,
  .product-price {
    font-size: 14px;
  }
}

  </style>
  