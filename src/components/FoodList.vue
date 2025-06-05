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
let timeoutId: number | undefined; // Dùng để lưu trữ ID của setTimeout để có thể xóa nó

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
/* Container cho toàn bộ danh sách món ăn */
.food-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 40px;
  position: relative; /* Quan trọng: để toast-notification không bị tràn ra ngoài nếu container có overflow */
  min-height: 500px; /* Đảm bảo có đủ không gian để toast hiển thị */
}

/* Card của từng món ăn */
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

/* Link của hình ảnh món ăn */
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

/* Tiêu đề món ăn */
h3 { /* Sử dụng h3 trực tiếp nếu bạn không có class food-title */
  font-size: 18px;
  font-weight: 600;
  color: #ff5722;
  margin-bottom: 6px;
}

/* Mô tả món ăn */
p {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
  flex-grow: 1; /* Cho phép mô tả mở rộng để chiếm không gian */
}

/* Giá món ăn */
.price {
  color: #d32f2f;
  font-weight: bold;
  margin: 8px 0;
  font-size: 16px;
  margin-top: auto; /* Đẩy giá xuống cuối nếu có nhiều mô tả */
}

/* Nút "Mua ngay" */
.buy-button {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: 500;
  width: 100%; /* Nút đầy đủ chiều rộng */
  margin-top: 15px; /* Khoảng cách từ giá */
}

.buy-button:hover {
  background-color: #e64a19;
  transform: scale(1.05);
}

/* CSS cho thông báo tùy chỉnh (Toast Notification) */
.toast-notification {
  position: fixed; /* Quan trọng để toast luôn hiển thị trên cùng và không bị ảnh hưởng bởi cuộn */
  top: 20px; /* <--- Thay đổi từ 'bottom' sang 'top' và đặt khoảng cách từ trên xuống */
  left: 50%; /* Canh giữa theo chiều ngang */
  transform: translateX(-50%) translateY(-100%); /* <--- Ban đầu ẩn *trên* màn hình và dịch sang trái 50% độ rộng của nó */
  background-color: rgba(40, 167, 69, 0.9); /* Màu xanh lá cây mờ */
  color: white; /* Chữ màu trắng */
  padding: 15px 30px; /* <--- Tăng padding để làm to hơn */
  border-radius: 10px; /* <--- Tăng border-radius */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3); /* <--- Đổ bóng đậm hơn */
  z-index: 1000; /* Đảm bảo thông báo hiển thị trên tất cả các element khác */
  opacity: 0; /* Ban đầu ẩn */
  visibility: hidden; /* Ban đầu không thể tương tác */
  transition: transform 0.4s ease-out, opacity 0.4s ease-out, visibility 0.4s ease-out; /* <--- Tăng thời gian transition */
  font-size: 1.3em; /* <--- Tăng kích thước chữ */
  min-width: 300px; /* <--- Tăng chiều rộng tối thiểu */
  text-align: center;
}

.toast-notification.show {
  opacity: 1; /* Khi có class 'show', hiện thông báo */
  visibility: visible; /* Khi có class 'show', hiển thị thông báo */
  transform: translateX(-50%) translateY(0); /* <--- Khi có class 'show', di chuyển xuống vị trí hiển thị */
}
</style>