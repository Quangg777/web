<template>
  <div class="home-view-container">
    <div class="container my-5">
      <h2 class="text-center section-title">🍔 Khám Phá Món Ăn</h2>
      <div class="food-grid other-foods">
        <div
          v-for="food in dsMonDangHienThi"
          :key="food.name"
          class="food-card" >
          <router-link :to="`/food/${food.name}`" class="food-card-link">
            <img :src="food.image" :alt="food.name" />
            <h3>{{ food.name }}</h3>
            <p>{{ food.description }}</p>
            <p><strong>{{ food.price.toLocaleString('vi-VN') }}₫</strong></p>
          </router-link>
          <button class="add-button" @click="handleAddToCart(food)">Mua ngay</button>
        </div>
      </div>

      <div class="text-center load-more-section">
        <button
          v-if="soMonDangHienThi < allFoods.length"
          @click="hienThiThemMon"
          class="load-more-button">
          Xem thêm {{ allFoods.length - soMonDangHienThi }} sản phẩm
        </button>
        <p v-else class="all-foods-loaded">Đã hiển thị tất cả món ăn.</p>
      </div>
    </div>

    <div v-if="showMessage" class="toast-notification" :class="{ 'show': showMessage }">
      {{ messageText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { foodItems } from '@/router/foodItems';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();


const showMessage = ref(false);
const messageText = ref('');
let timeoutId: ReturnType<typeof setTimeout> | undefined;



const allFoods = computed(() => foodItems);


const handleAddToCart = (item: typeof foodItems[0]) => {
  cartStore.addToCart(item);
  console.log('Món ăn đã được thêm vào giỏ hàng:', item.name);

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

// === Phần hiển thị món ăn và "Xem thêm" ===


const soLuongBanDau = 8; 

const buocXemThem = 8; 

const soMonDangHienThi = ref(soLuongBanDau);

const dsMonDangHienThi = computed(() => {
  return allFoods.value.slice(0, soMonDangHienThi.value);
});


const hienThiThemMon = () => {
  soMonDangHienThi.value = Math.min(
    soMonDangHienThi.value + buocXemThem,
    allFoods.value.length
  );
};
</script>





<style scoped>


* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.home-view-container {
  padding: 40px 0 60px;
  background-color: #fffdf9;
}

.section-title {
  font-size: 30px;
  font-weight: 600;
  color: #ff5722;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  width: 70px;
  height: 4px;
  background: #ff5722;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.food-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.food-card h3 {
  margin: 16px 0 8px;
  font-size: 1.20rem;
  color: #d32f2f;
  font-weight: 550;
}

.food-card p {
  color: #666;
  font-size: 0.90rem;
  margin-bottom: 6px;
}

.food-card strong {
  color: #d32f2f;
  font-size: 1.1rem;
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

.add-button {
  margin: 0 16px 16px;
  background-color:peru;
  color: #fff;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button:hover {
  background-color: peru;
  transform: scale(1.03);
}

/* Load more button */
.load-more-section {
  margin-top: 50px;
  text-align: center;
}

.load-more-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 14px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.load-more-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.all-foods-loaded {
  font-size: 1.1rem;
  color: #555;
  font-style: italic;
  margin-top: 20px;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background-color: #28a745;
  color: white;
  padding: 15px 28px;
  border-radius: 10px;
  font-size: 1.1rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out, visibility 0.4s ease-out;
  z-index: 1000;
  min-width: 280px;
  text-align: center;
}

.toast-notification.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
  }

  .food-card h3 {
    font-size: 1.1rem;
  }

  .load-more-button {
    font-size: 1rem;
    padding: 12px 20px;
  }
}
</style>

