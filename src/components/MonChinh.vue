<template>
  <div class="food-list-container">
    <div class="food-card" v-for="(item, index) in mainDishes" :key="index">
      <RouterLink :to="`/food/${item.name}`" class="food-link">
        <img :src="item.image" :alt="item.name" class="food-image" />
      </RouterLink>
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p class="price">{{ item.price }}₫</p>
      <button class="buy-button" @click="handleAddToCart(item)">Mua ngay</button>
    </div>

    <div v-if="showMessage" class="toast-notification" :class="{ 'show': showMessage }">
      {{ messageText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const showMessage = ref(false);
const messageText = ref('');
let timeoutId: number | undefined;

const mainDishes = [
  {
    name: 'Cơm Chiên',
    description: 'Cơm chiên vàng giòn, thơm ngon khó cưỡng.',
    price: 40000,
    image: '/comchien.jpg',
    category: 'Món Chính', // SỬA ĐÚNG: 'Món Chính'
  },
  {
    name: 'Cơm Cuộn',
    description: 'Cơm cuộn đầy đặn, phong cách Nhật Bản.',
    price: 45000,
    image: '/comcuon.jpg',
    category: 'Món Chính', // SỬA ĐÚNG
  },
  {
    name: 'Cơm Gà',
    description: 'Cơm gà truyền thống, thịt gà mềm ngon.',
    price: 50000,
    image: '/comga.jpg',
    category: 'Món Chính', // SỬA ĐÚNG
  },
  {
    name: 'Gyudon',
    description: 'Cơm bò xào hành kiểu Nhật thơm ngon.',
    price: 55000,
    image: '/gyudon.jpg',
    category: 'Món Chính', // SỬA ĐÚNG
  },
  {
    name: 'Ramen',
    description: 'Mì ramen nước dùng đậm đà kiểu Nhật.',
    price: 55000,
    image: '/ramen.jpg',
    category: 'Món Chính', // SỬA ĐÚNG
  },
  {
    name: 'Mỳ Ý',
    description: 'Mỳ Ý sốt cà chua và thịt bằm truyền thống.',
    price: 48000,
    image: '/myy.jpg',
    category: 'Món Chính', // SỬA ĐÚNG
  },
];

const handleAddToCart = (item: typeof mainDishes[0]) => {
  cartStore.addToCart(item);
  console.log('Món ăn đã được thêm:', item.name);
  console.log('Giỏ hàng hiện tại:', cartStore.items);

  messageText.value = `${item.name} đã được thêm vào giỏ hàng!`;
  showMessage.value = true;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    showMessage.value = false;
    messageText.value = '';
  }, 3000);
};
</script>

<style scoped>
@import '../assets/foodStyle.css';

/* ... CSS của bạn ... */

.toast-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background-color: rgba(40, 167, 69, 0.9);
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out, visibility 0.4s ease-out;
  font-size: 1.3em;
  min-width: 300px;
  text-align: center;
}

.toast-notification.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
</style>