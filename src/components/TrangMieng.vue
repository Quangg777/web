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
let timeoutId: ReturnType<typeof setTimeout> | undefined;


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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

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

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 30px;
}

.food-card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.food-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.food-card-link {
  text-decoration: none;
  color: inherit;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.food-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.food-card h3 {
  margin: 16px 0 8px;
  font-size: 1.25rem;
  color: #ff5722;
  font-weight: 600;
}

.food-card p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 6px;
}

.food-card strong {
  color: #d32f2f;
  font-size: 1.1rem;
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
.buy-button {
  margin: 0 16px 16px;
  background-color: #ff5722;
  color: #fff;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background-color: #e64a19;
  transform: scale(1.03);
}
</style>