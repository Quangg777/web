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
  /* @import '../assets/foodStyle.css'; */

</style>
