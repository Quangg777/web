<template>
    <div class="slider">
      <button class="arrow" @click="prevSlide">&lt;</button>
  
      <div class="slide">
        <img :src="currentSlide.image" alt="food" class="slide-image" />
        <p class="slide-name">{{ currentSlide.name }}</p>
      </div>
  
      <button class="arrow" @click="nextSlide">&gt;</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Danh sách các món ăn
  const slides = [
    { name: 'Phở Bò', image: 'https://source.unsplash.com/400x300/?pho' },
    { name: 'Bún Chả', image: 'https://source.unsplash.com/400x300/?buncha' },
    { name: 'Bánh Mì', image: 'https://source.unsplash.com/400x300/?banhmi' }
  ]
  
  // Slide hiện tại
  const currentIndex = ref(0)
  
  // Slide đang hiển thị
  const currentSlide = computed(() => slides[currentIndex.value])
  
  // Chuyển slide
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
  }
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % slides.length
  }
  </script>
  
  <style scoped>
  .slider {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 20px;
  }
  
  .arrow {
    font-size: 24px;
    background-color: #ddd;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 8px;
  }
  
  .slide {
    text-align: center;
    max-width: 400px;
  }
  
  .slide-image {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
  
  .slide-name {
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  </style>
  