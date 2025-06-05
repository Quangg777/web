<template>
  <div class="food-list-container">
    <div class="food-card" v-for="(item, index) in sideDishes" :key="index">
      <RouterLink :to="`/food/${item.name}`">
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
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const showMessage = ref(false);
const messageText = ref('');
let timeoutId: number | undefined;

const allDishes = [
  {
    name: 'Cơm Chiên',
    description: 'Cơm chiên vàng giòn, thơm ngon khó cưỡng.',
    price: 40000,
    image: '/comchien.jpg',
    category: 'Món Chính', // SỬA ĐÚNG
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
  {
    name: 'Hamburger',
    description: 'Hamburger nhân thịt đậm đà, phô mai tan chảy.',
    price: 50000,
    image: '/humberger.jpg',
    category: 'Món Phụ', // SỬA ĐÚNG: 'Món Phụ'
  },
  {
    name: 'Sushi',
    description: 'Sushi cá hồi tươi ngon, cơm mềm dẻo.',
    price: 60000,
    image: '/sushi.jpg',
    category: 'Món Phụ', // SỬA ĐÚNG
  },

  // Món phụ (Side dishes)
  {
    name: 'Khoai Tây Chiên',
    description: 'Khoai tây chiên giòn rụm, ngon miệng.',
    price: 20000,
    image: '/khoaitaychien.jpg',
    category: 'Món Phụ', // SỬA ĐÚNG
  },
  {
    name: 'Xúc Xích Chiên',
    description: 'Xúc xích chiên giòn, thơm, phù hợp ăn vặt.',
    price: 22000,
    image: '/xucxichchien.jpg',
    category: 'Món Phụ', // SỬA ĐÚNG
  },
  {
    name: 'Salad Trộn',
    description: 'Salad tươi mát với sốt mè rang.',
    price: 30000,
    image: '/saladtron.jpg',
    category: 'Món Phụ', // SỬA ĐÚNG
  },
  // Thêm các món tráng miệng và đồ uống nếu bạn có
  {
    name: 'Panna Cotta',
    description: 'Món tráng miệng Ý béo mịn, ngọt ngào.',
    price: 35000,
    image: '/PannaCottajpg.jpg',
    category: 'Tráng Miệng', // SỬA ĐÚNG
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
];

// Sử dụng computed để chỉ lấy các món có category là 'Món Phụ'
const sideDishes = computed(() => {
  return allDishes.filter(item => item.category === 'Món Phụ'); // SỬA ĐÚNG: 'Món Phụ'
});

const handleAddToCart = (item: typeof allDishes[0]) => {
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

.food-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-content: center;
  position: relative;
  min-height: 400px;
}

.food-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.food-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.food-card .food-image {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.food-card h3 {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.food-card p {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
  flex-grow: 1;
}

.food-card .price {
  font-weight: bold;
  color: #e44d26;
  font-size: 1.1em;
  margin-top: auto;
  margin-bottom: 15px;
}

.buy-button {
  background-color: #e44d26;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  width: 100%;
}

.buy-button:hover {
  background-color: #f76b42;
}

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