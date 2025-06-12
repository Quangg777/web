<template>
  <div class="food-list-container">
    <div class="food-card" v-for="(item, index) in foodItems" :key="index">
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
import { ref } from 'vue'; // Import ref để quản lý trạng thái phản ứng
import { useCartStore } from '@/stores/cart'; // Đảm bảo đường dẫn này đúng với vị trí tệp cart.ts của bạn

const cartStore = useCartStore();

// Khai báo các biến để quản lý thông báo toast
const showMessage = ref(false); // Biến kiểm soát hiển thị/ẩn thông báo
const messageText = ref(''); // Nội dung của thông báo
let timeoutId: ReturnType<typeof setTimeout> | undefined;
 // Dùng để lưu trữ ID của setTimeout để có thể xóa nó

// Dữ liệu danh sách món ăn
const foodItems = [
  // Món chính
  {
    name: 'Cơm Chiên',
    description: 'Cơm chiên vàng giòn, thơm ngon khó cưỡng.',
    price: 40000,
    image: '/comchien.jpg',
    category: 'mon-chinh',
  },
  {
    name: 'Cơm Cuộn',
    description: 'Cơm cuộn đầy đặn, phong cách Nhật Bản.',
    price: 45000,
    image: '/comcuon.jpg',
    category: 'mon-chinh',
  },
  {
    name: 'Cơm Gà',
    description: 'Cơm gà truyền thống, thịt gà mềm ngon.',
    price: 50000,
    image: '/comga.jpg',
    category: 'mon-chinh',
  },
  {
    name: 'Gyudon',
    description: 'Cơm bò xào hành kiểu Nhật thơm ngon.',
    price: 55000,
    image: '/gyudon.jpg',
    category: 'mon-chinh',
  },
  {
    name: 'Ramen',
    description: 'Mì ramen nước dùng đậm đà kiểu Nhật.',
    price: 55000,
    image: '/ramen.jpg',
    category: 'mon-chinh',
  },
  {
    name: 'Mỳ Ý',
    description: 'Mỳ Ý sốt cà chua và thịt bằm truyền thống.',
    price: 48000,
    image: '/myy.jpg',
    category: 'mon-chinh',
  },
  {
    name: 'Hamburger',
    description: 'Hamburger nhân thịt đậm đà, phô mai tan chảy.',
    price: 50000,
    image: '/humberger.jpg',
    category: 'mon-phu',
  },
  {
    name: 'Sushi',
    description: 'Sushi cá hồi tươi ngon, cơm mềm dẻo.',
    price: 60000,
    image: '/sushi.jpg',
    category: 'mon-phu',
  },

  // Món phụ
  {
    name: 'Khoai Tây Chiên',
    description: 'Khoai tây chiên giòn rụm, ngon miệng.',
    price: 20000,
    image: '/khoaitaychien.jpg',
    category: 'mon-phu',
  },
  {
    name: 'Xúc Xích Chiên',
    description: 'Xúc xích chiên giòn, thơm, phù hợp ăn vặt.',
    price: 22000,
    image: '/xucxichchien.jpg',
    category: 'mon-phu',
  },
  {
    name: 'Salad Trộn',
    description: 'Salad tươi mát với sốt mè rang.',
    price: 30000,
    image: '/saladtron.jpg',
    category: 'mon-phu',
  },

  // Tráng miệng & đồ uống
  {
    name: 'Panna Cotta',
    description: 'Món tráng miệng Ý béo mịn, ngọt ngào.',
    price: 35000,
    image: '/PannaCottajpg.jpg',
    category: 'trang-mieng',
  },
  {
    name: 'Trà Chanh',
    description: 'Trà chanh tươi mát, giải nhiệt ngày hè.',
    price: 15000,
    image: '/traicay.jpg',
    category: 'trang-mieng',
  },
  {
    name: 'Trà Lài',
    description: 'Trà lài thơm dịu, dễ chịu và thư giãn.',
    price: 12000,
    image: '/tralai-550x550.png',
    category: 'trang-mieng',
  },
  {
    name: 'Trà Sữa',
    description: 'Trà sữa trân châu ngọt ngào, béo thơm.',
    price: 25000,
    image: '/ts.png',
    category: 'trang-mieng',
  },
  {
    name: 'Trái Cây Tươi',
    description: 'Mix nhiều loại trái cây tươi ngon mát lạnh.',
    price: 25000,
    image: '/traicay.jpg',
    category: 'trang-mieng',
  },
  {
    name: 'Sukicha',
    description: 'Trà sữa Sukicha thơm béo, topping trân châu giòn dai.',
    price: 25000,
    image: '/sukicha.jpg',
    category: 'trang-mieng',
  },
];

// Hàm xử lý khi nút "Mua ngay" được bấm
const handleAddToCart = (item: typeof foodItems[0]) => {
  cartStore.addToCart(item); // Thêm món ăn vào giỏ hàng thông qua Pinia store
  console.log('Món ăn đã được thêm:', item.name); // Log để debug
  console.log('Giỏ hàng hiện tại:', cartStore.items); // Log để debug

  // Hiển thị thông báo toast
  messageText.value = `${item.name} đã được thêm vào giỏ hàng!`; // Đặt nội dung thông báo
  showMessage.value = true; // Bật cờ hiển thị thông báo

  // Xóa timeout cũ nếu có (để tránh thông báo biến mất quá sớm nếu người dùng bấm liên tục)
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  // Đặt timeout mới để ẩn thông báo sau 3 giây
  timeoutId = setTimeout(() => {
    showMessage.value = false; // Tắt cờ hiển thị
    messageText.value = ''; // Xóa nội dung thông báo
  }, 3000); // 3000ms = 3 giây
};
</script>

<style scoped>
/* ============================== */
/* Layout container */
.food-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 40px;
  position: relative;
  background-color: #f9f9f9;
  min-height: 500px;
}

/* ============================== */
/* Food card style */
.food-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 16px;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
}

.food-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* ============================== */
/* Image and link styles */
.food-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.food-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 14px;
}

/* ============================== */
/* Text styles */
h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

p {
  font-size: 0.92em;
  color: #666;
  margin-bottom: 10px;
  flex-grow: 1;
}

.price {
  font-size: 1rem;
  font-weight: bold;
  color: #e53935;
  margin-top: auto;
}

/* ============================== */
/* Button styles */
.buy-button {
  margin-top: 16px;
  padding: 10px 0;
  width: 100%;
  background: linear-gradient(135deg, #ff6f00, #ff5722);
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background: linear-gradient(135deg, #e65100, #e64a19);
  transform: scale(1.05);
}

/* ============================== */
/* Toast notification styles */
.toast-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background-color: rgba(56, 142, 60, 0.95);
  color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
  min-width: 280px;
  text-align: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out, visibility 0.4s ease-out;
}

.toast-notification.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.food-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding: 2rem;
  background-color: var(--color-background-soft);
}

/* Card Container */
.food-card {
  width: 240px;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--color-background);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  border: 1px solid var(--color-border);
}

.food-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--color-border-hover);
}

/* Image Styling */
.food-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

/* Text Elements */
.food-card h3 {
  font-size: 1.125rem; /* 18px */
  margin: 0 0 0.5rem;
  color: var(--color-heading);
  font-weight: 600;
  text-align: center;
}

.food-card p {
  font-size: 0.875rem; /* 14px */
  color: var(--color-text);
  margin: 4px 0;
  line-height: 1.5;
  text-align: center;
}

/* Price */
.food-card .price {
  font-size: 1rem; /* 16px */
  color: #ff4081;
  font-weight: 700;
  margin-top: 0.75rem;
}

/* Buy Button */
.buy-button {
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background-color: #e64a19;
  transform: scale(1.05);
}

/* Responsive Layout */
@media (max-width: 768px) {
  .food-card {
    width: 100%;
    max-width: 320px;
  }

  .food-list-container {
    padding: 1.5rem;
  }
}

</style>