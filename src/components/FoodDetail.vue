<template>
  <div class="food-detail-container container my-5">
    <div v-if="foodItem" class="row">
      <div class="col-md-6 text-center">
        <img :src="foodItem.image" :alt="foodItem.name" class="food-detail-image img-fluid rounded shadow-sm">
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h1 class="ten">{{ foodItem.name }}</h1>
        <p class="lead text-muted">{{ foodItem.description }}</p>
        <p class="h3 text-danger mb-4">{{ foodItem.price.toLocaleString('vi-VN') }}₫</p>

        <div class="d-flex align-items-center mb-4">
          <button class="btn btn-outline-secondary me-3" @click="quantity = Math.max(1, quantity - 1)">-</button>
          <span class="h4 mb-0">{{ quantity }}</span>
          <button class="btn btn-outline-secondary ms-3" @click="quantity++">+</button>
        </div>

        <button class="btn btn-success btn-lg" @click="handleAddToCart(foodItem)"> 
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
    <div v-else class="alert alert-warning text-center">
      Không tìm thấy món ăn này.
      <router-link to="/" class="alert-link">Quay lại trang chủ</router-link>
    </div>

    <div v-if="showMessage" class="toast-notification" :class="{ 'show': showMessage }">
      {{ messageText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'; // Import watchEffect
import { useRoute } from 'vue-router';
import { foodItems } from '@/router/foodItems'; // Đảm bảo đường dẫn đúng
import { useCartStore } from '@/stores/cart'; // Import cart store

const route = useRoute();
const cartStore = useCartStore();

// Khai báo biến ref cho số lượng sản phẩm
const quantity = ref(1);

// Biến cho toast notification
const showMessage = ref(false);
const messageText = ref('');
let timeoutId: ReturnType<typeof setTimeout> | undefined;


// Sử dụng ref để giữ đối tượng foodItem được tìm thấy
const foodItem = ref<typeof foodItems[0] | undefined>(undefined);

// Sử dụng watchEffect để phản ứng với thay đổi của route.params.name
watchEffect(() => {
  const foodName = route.params.name as string;
  // Tìm món ăn trong danh sách foodItems
  foodItem.value = foodItems.find(item => item.name === foodName);
  // Reset số lượng về 1 khi món ăn thay đổi
  quantity.value = 1;
});


// Hàm xử lý khi nút "Thêm vào giỏ hàng" được bấm
const handleAddToCart = (item: typeof foodItems[0]) => {
  if (item) { // Đảm bảo item tồn tại
    // Thêm món ăn vào giỏ hàng với số lượng đã chọn
    // Sử dụng addToCart của Pinia store, truyền số lượng
    cartStore.addToCart(item, quantity.value); // Truyền item và quantity

    console.log('Món ăn đã được thêm:', item.name, 'Số lượng:', quantity.value);
    console.log('Giỏ hàng hiện tại:', cartStore.items);

    // Hiển thị thông báo toast
    messageText.value = `${quantity.value}x ${item.name} đã được thêm vào giỏ hàng!`;
    showMessage.value = true;

    // Xóa timeout cũ nếu có
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Đặt timeout mới để ẩn thông báo sau 3 giây
    timeoutId = setTimeout(() => {
      showMessage.value = false;
      messageText.value = '';
    }, 3000);
  }
};
</script>

<style scoped>
.food-detail-container {
  max-width: 960px;
  background: #fffefc;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  padding: 40px 30px;
  margin-top: 60px;
  position: relative;
  min-height: 520px;
  font-family: 'Segoe UI', sans-serif;
}

/* Hình ảnh món ăn */
.food-detail-image {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 8px;
  background: #fdfdfd;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

/* Tên món */
h1 {
  font-weight: 800;
  color: #e65100;
  margin-bottom: 16px;
}

/* Mô tả */
p.lead {
  font-size: 1.15em;
  color: #666;
  margin-bottom: 20px;
}

/* Giá */
p.h3 {
  font-weight: 700;
  color: #c62828;
}

/* Nút tăng giảm số lượng */
.btn-outline-secondary {
  border-color: #ddd;
  color: #444;
  width: 44px;
  height: 44px;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.btn-outline-secondary:hover {
  background-color: #f0f0f0;
  border-color: #bbb;
  color: #000;
}

/* Nút thêm vào giỏ hàng */
.btn-success {
  background-color:skyblue;
  border: none;
  padding: 14px 28px;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(67, 160, 71, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-success:hover {
  background-color: violet;
  transform: scale(1.02);
}

/* Toast thông báo */
.toast-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background: linear-gradient(to right, #66bb6a, #43a047);
  color: white;
  padding: 15px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease, opacity 0.4s ease, visibility 0.4s ease;
  font-size: 1.2em;
  min-width: 300px;
  text-align: center;
}

.toast-notification.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.ten{
  font-size:35px;
  color:turquoise;
  padding: 5px;
}

/* Responsive */
@media (max-width: 768px) {
  .food-detail-container {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .btn-success {
    width: 100%;
    font-size: 1em;
    padding: 12px 0;
  }

  .btn-outline-secondary {
    width: 36px;
    height: 36px;
    font-size: 1em;
  }

  .toast-notification {
    font-size: 1em;
    min-width: 90%;
  }
}
</style>
