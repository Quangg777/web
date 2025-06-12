<template>
  <div class="search-result">
    <h2>Kết quả tìm kiếm cho: "{{ keyword }}"</h2>
    <div v-if="filteredFoods.length > 0" class="food-grid">
<router-link
  v-for="food in filteredFoods"
  :key="food.name"
  :to="`/food/${food.name}`"
  class="food-card"
>
  <img :src="food.image" :alt="food.name" />
  <h3>{{ food.name }}</h3>
  <p>{{ food.description }}</p>
  <p><strong>{{ food.price.toLocaleString() }} VNĐ</strong></p>
  <button class="buy-button">Mua ngay</button>
</router-link>

    </div>
    <p v-else>Không tìm thấy món ăn phù hợp.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { foodItems } from '@/router/foodItems' // điều chỉnh đường dẫn nếu khác

const route = useRoute()

const keyword = computed(() => (route.query['tu-khoa'] as string) || '')
const category = computed(() => (route.query['danh-muc'] as string) || '')

const filteredFoods = computed(() => {
  return foodItems.filter((food) => {
    const matchKeyword = keyword.value === '' || food.name.toLowerCase().includes(keyword.value.toLowerCase())
    const matchCategory = category.value === '' || food.category === convertCategory(category.value)
    return matchKeyword && matchCategory
  })
})

// Map tên danh mục thành dạng "slug" giống trong dữ liệu
function convertCategory(danhMuc: string) {
  const map: Record<string, string> = {
    'Món Chính': 'mon-chinh',
    'Món Phụ': 'mon-phu',
    'Tráng Miệng': 'trang-mieng',
    'Thực đơn': '', // nếu chọn "Thực đơn" thì không lọc theo category
  }
  return map[danhMuc] || ''
}
</script>

<style scoped>
.search-result {
  padding: 20px;
}
.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.food-card {
text-decoration: none;
  color: inherit;
  display: block;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  background: #fff;
  text-align: center;
  transition: box-shadow 0.3s ease;
}
.food-card img {
  width: auto;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
}
.food-card img:hover{
        transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

}
.food-card h3{
    font-size: 20px;
  margin: 10px 0;
  color: #ff5722;
  text-decoration: none;
}
.food-card p{
     color: #333;
  font-size: 14px;
}
.buy-button{
    margin-top: 12px;
    padding: 8px 16px;
    background-color: #ff5722;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}
.search-result {
  padding: 40px 20px;
  background-color: #fef9f5;
  min-height: 100vh;
}

.search-result h2 {
  font-size: 26px;
  font-weight: 700;
  color: #d84315;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 28px;
  max-width: 1300px;
  margin: auto;
  padding: 0 10px;
}

.food-card {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
  padding: 24px 18px;
}

.food-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.food-card img {
  width: 100%;
  height: 160px;
  object-fit:contain;
  border-radius: 14px;
  margin-bottom: 16px;
  transition: transform 0.3s ease-in-out;
}

.food-card:hover img {
  transform: scale(1.05);
}

.food-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #ff5722;
  margin-bottom: 8px;
}

.food-card p {
  font-size: 14px;
  color: #444;
  margin-bottom: 6px;
}

.food-card strong {
  color: #e53935;
  font-size: 16px;
}

.buy-button {
  margin-top: 14px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button:hover {
  background-color: #e64a19;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .search-result h2 {
    font-size: 22px;
  }

  .food-card {
    padding: 18px 14px;
  }

  .food-card h3,
  .food-card p {
    font-size: 14px;
  }

  .buy-button {
    padding: 8px 16px;
    font-size: 13px;
  }
}

</style>
