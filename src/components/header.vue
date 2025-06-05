<template>
  <header class="header">
    <div class="container">
      <div class="logo">🍜 Ẩm Thực</div>

      <nav class="menu">
        <h1><RouterLink to="/" class="menu-link">Trang Chủ</RouterLink></h1>
        <h1><RouterLink to="/gioi-thieu" class="menu-link">Giới Thiệu</RouterLink></h1>
        <h1><RouterLink to="/lien-he" class="menu-link">Liên Hệ</RouterLink></h1>
        <h1><RouterLink to="/dang-nhap" class="menu-link">Đăng Nhập</RouterLink></h1>

        <h1><RouterLink to="/gio-hang" class="menu-link">🛒
          <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
        </RouterLink></h1>
      </nav>

      <div class="search-bar">
        <select v-model="selectedCategory" class="select-box">
          <option>Thực đơn</option>
          <option value="Món Chính">Món Chính</option>
          <option value="Món Phụ">Món Phụ</option>
          <option value="Tráng Miệng">Tráng Miệng</option>
        </select>
        <input type="text" placeholder="Tìm món ăn..." class="search-input" v-model="searchKeyword"/>
        <button class="search-button" @click="handleSearch">Tìm kiếm</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
// import { foodItems } from '@/router/foodItems' // Dòng này có thể không cần thiết nếu bạn không dùng nó ở đây

const cart = JSON.parse(localStorage.getItem('cart') || '[]')
const cartCount = ref(cart.length)

const router = useRouter()
const selectedCategory = ref('Thực đơn')
const searchKeyword=ref('')

watch(selectedCategory, (newValue) => {
  if (newValue === 'Món Chính') {
    router.push('/mon-chinh')
  } else if (newValue === 'Món Phụ') {
    router.push('/mon-phu')
  } else if (newValue === 'Tráng Miệng') {
    router.push('/trang-mieng')
  } else {
    router.push('/')
  }
})

// Hàm xử lý button tìm kiếm
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    alert('Vui lòng nhập từ khóa trước khi tìm kiếm.')
    return
  }

  const query: Record<string, string> = {
    'tu-khoa': searchKeyword.value.trim(),
  }

  if (selectedCategory.value !== 'Thực đơn') {
    query['danh-muc'] = selectedCategory.value
  }

  router.push({ path: '/tim-kiem', query })
}

</script>

<style scoped>
.header {
  width: 1200px;
  background-color: #ff5722;
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.logo {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
}

.menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
}

.menu-link {
  text-decoration: none;
  color: white;
  position: relative;
}

.menu-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: white;
  left: 0;
  bottom: -4px;
  transition: width 0.3s;
}

.menu-link:hover::after {
  width: 100%;
}

.search-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.select-box,
.search-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  color: black;
}

.search-button {
  padding: 8px 16px;
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.search-button:hover {
  background-color: #ddd;
}
</style>