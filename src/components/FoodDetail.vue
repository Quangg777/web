<template>
  <div class="food-detail-container container my-5">
    <div v-if="foodItem" class="row">
      <div class="col-md-6 text-center">
        <img :src="foodItem.image" :alt="foodItem.name" class="food-detail-image img-fluid rounded shadow-sm">
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h1 class="display-4 text-primary">{{ foodItem.name }}</h1>
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
let timeoutId: number | undefined;

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
  max-width: 900px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 50px;
  position: relative; /* Dùng cho toast */
  min-height: 500px;
}

.food-detail-image {
  max-height: 400px;
  object-fit: contain;
  border: 1px solid #eee;
  padding: 10px;
}

h1 {
  font-weight: 700;
  color: #ff5722;
}

p.lead {
  font-size: 1.1em;
  color: #555;
}

p.h3 {
  font-weight: bold;
}

.btn-outline-secondary {
  border-color: #ccc;
  color: #666;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  font-weight: 600;
  padding: 12px 25px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-success:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

/* Toast Notification (giống các component khác) */
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