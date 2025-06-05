<template>
  <div class="food-list-container">
    <div class="food-card" v-for="(item, index) in desserts" :key="index">
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

const desserts = [
  {
    name: 'Panna Cotta',
    description: 'Món tráng miệng Ý béo mịn, ngọt ngào.',
    price: 35000,
    image: '/PannaCottajpg.jpg',
    category: 'Tráng Miệng', // SỬA ĐÚNG: 'Tráng Miệng'
  },
  {
    name: 'Trà Chanh',
    description: 'Trà chanh tươi mát, giải nhiệt ngày hè.',
    price: 15000,
    image: '/traicay.jpg',
    category: 'Tráng Miệng', // SỬA ĐÚNG (vì không có category 'drink' trong DB)
  },
  {
    name: 'Trà Lài',
    description: 'Trà lài thơm dịu, dễ chịu và thư giãn.',
    price: 12000,
    image: '/tralai-550x550.png',
    category: 'Tráng Miệng', // SỬA ĐÚNG
  },
  {
    name: 'Trà Sữa',
    description: 'Trà sữa trân châu ngọt ngào, béo thơm.',
    price: 25000,
    image: '/ts.png',
    category: 'Tráng Miệng', // SỬA ĐÚNG
  },
  {
    name: 'Trái Cây Tươi',
    description: 'Mix nhiều loại trái cây tươi ngon mát lạnh.',
    price: 25000,
    image: '/traicay.jpg',
    category: 'Tráng Miệng', // SỬA ĐÚNG
  },
  {
    name: 'Sukicha',
    description: 'Trà sữa Sukicha thơm béo, topping trân châu giòn dai.',
    price: 25000,
    image: '/sukicha.jpg',
    category: 'Tráng Miệng', // SỬA ĐÚNG
  },
];

const handleAddToCart = (item: typeof desserts[0]) => {
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

.food-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 40px;
  position: relative;
  min-height: 500px;
}

.food-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.food-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.food-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.food-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ff5722;
  margin-bottom: 6px;
}

p {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
  flex-grow: 1;
}

.price {
  color: #d32f2f;
  font-weight: bold;
  margin: 8px 0;
  font-size: 16px;
  margin-top: auto;
}

.buy-button {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: 500;
  width: 100%;
  margin-top: 15px;
}

.buy-button:hover {
  background-color: #e64a19;
  transform: scale(1.05);
}
</style>