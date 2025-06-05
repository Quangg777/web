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
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.table th, .table td {
  vertical-align: middle;
}

.btn-outline-secondary {
    border-color: #6c757d;
    color: #6c757d;
}

.btn-outline-secondary:hover {
    background-color: #6c757d;
    color: white;
}
</style>