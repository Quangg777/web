<template>
  <header class="header">
    <div class="container">
      <div class="logo"><img src="/public/LOGO.webp" alt=""> Ẩm Thực</div>

      <nav class="menu">
        <h1><RouterLink to="/" class="menu-link">Trang Chủ</RouterLink></h1>
        <h1><RouterLink to="/gioi-thieu" class="menu-link">Giới Thiệu</RouterLink></h1>
        <h1><RouterLink to="/lien-he" class="menu-link">Liên Hệ</RouterLink></h1>
        <h1><RouterLink to="/dang-nhap" class="menu-link">🔐Đăng Nhập</RouterLink></h1>

        <h1><RouterLink to="/gio-hang" class="menu-link">🛒Giỏ Hàng
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
        <input v-model="searchQuery" @keyup.enter="searchFood" placeholder="Tìm món ăn..." />
        <button class="search-button" @click="handleSearch">Tìm kiếm</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted  } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
// import { foodItems } from '@/router/foodItems' // Dòng này có thể không cần thiết nếu bạn không dùng nó ở đây

const cart = JSON.parse(localStorage.getItem('cart') || '[]')
const cartCount = ref(cart.length)

const router = useRouter()
const selectedCategory = ref('Thực đơn')
const searchQuery=ref('')

const searchFood = () => {
  router.push({ name: 'SearchPage', query: { 'tu-khoa': searchQuery.value } })
  searchQuery.value = ''
}

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
  if (!searchQuery.value.trim()) {
    alert('Vui lòng nhập từ khóa trước khi tìm kiếm.')
    return
  }

  const query: Record<string, string> = {
    'tu-khoa': searchQuery  .value.trim(),
  }

  if (selectedCategory.value !== 'Thực đơn') {
    query['danh-muc'] = selectedCategory.value
  }

  router.push({ path: '/tim-kiem', query })
}

</script>

<style scoped>
/* === BASE HEADER === */
.header {
  width: 100%;
  background-color:#ff5722;
  color: white;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* === CONTAINER === */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

/* === LOGO === */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.logo img {
  width: 65px;
  border-radius: 12px;
}

/* === MENU === */
.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  flex-grow: 1;
}

.menu-link {
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  position: relative;
  padding: 6px 0;
  transition: color 0.25s ease;
}

.menu-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease-in-out;
}

.menu-link:hover {
  color: #ffe0b2;
}

.menu-link:hover::after {
  width: 100%;
}

/* === CART COUNT === */
.cart-count {
  background-color: #fff;
  color: #ff5722;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 4px;
}

/* === SEARCH BAR === */
.search-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  max-width: 360px;
}

.select-box,
.search-bar input {
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 24px;
  border: 1px solid #eee;
  background: white;
  color: #333;
  outline: none;
  transition: box-shadow 0.3s, border-color 0.3s;
  flex-grow: 1;
}

.select-box:focus,
.search-bar input:focus {
  box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.2);
  border-color: #ff5722;
}

/* === BUTTON === */
.search-button {
  padding: 10px 18px;
  border-radius: 24px;
  background-color: white;
  border: 2px solid #ff5722;
  color: #ff5722;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background-color: #e64a19;
  border-color: #e64a19;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* === RESPONSIVE BREAKPOINTS === */
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .menu {
    justify-content: center;
  }

  .search-bar {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .logo {
    font-size: 24px;
  }

  .logo img {
    width: 50px;
  }

  .menu-link {
    font-size: 16px;
  }

  .search-bar {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .select-box,
  .search-bar input,
  .search-button {
    width: 100%;
  }
}
</style>