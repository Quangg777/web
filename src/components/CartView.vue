<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Giỏ hàng của bạn</h2>

    <div v-if="cartStore.cartItemCount === 0" class="alert alert-info text-center">
      Giỏ hàng của bạn đang trống. Hãy thêm một vài món ăn ngon nhé!
    </div>

    <div v-else>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Món ăn</th>
            <th scope="col">Giá</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Tổng</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartStore.items" :key="item.name">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <img :src="item.image" alt="item.name" class="cart-item-image me-2">
              {{ item.name }}
            </td>
            <td>{{ item.price.toLocaleString('vi-VN') }}₫</td>
            <td>
              <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2" @click="cartStore.updateQuantity(item.name, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button class="btn btn-sm btn-outline-secondary ms-2" @click="cartStore.updateQuantity(item.name, item.quantity + 1)">+</button>
              </div>
            </td>
            <td>{{ (item.price * item.quantity).toLocaleString('vi-VN') }}₫</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="cartStore.removeFromCart(item.name)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded">
        <h4>Tổng cộng:</h4>
        <h4 class="text-danger">{{ cartStore.cartTotal.toLocaleString('vi-VN') }}₫</h4>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-primary btn-lg me-3" @click="proceedToCheckout">Tiến hành thanh toán</button>
        <button class="btn btn-warning btn-lg" @click="cartStore.clearCart">Xóa tất cả</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const proceedToCheckout = () => {
  router.push('/thanh-toan'); // Chuyển hướng đến trang thanh toán
};
</script>

<style scoped>
.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.cart-item-image:hover {
  transform: scale(1.05);
}

.table {
  border-collapse: separate;
  border-spacing: 0 8px;
}

.table th, .table td {
  vertical-align: middle;
  background-color: #fff;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table thead th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #dee2e6;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: white;
  transform: scale(1.05);
}

.btn-danger {
  transition: all 0.2s ease-in-out;
}

.btn-danger:hover {
  transform: scale(1.05);
}

.bg-light {
  border: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

h4.text-danger {
  font-weight: bold;
  font-size: 1.5rem;
}

button.btn-lg {
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.2s ease;
}

button.btn-lg:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .table thead {
    display: none;
  }

  .table, .table tbody, .table tr, .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 15px;
    width: 45%;
    font-weight: bold;
    text-align: left;
  }
}

</style>