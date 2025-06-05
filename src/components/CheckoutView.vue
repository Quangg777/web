<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Tiến hành thanh toán</h2>

    <div v-if="cartStore.cartItemCount === 0" class="alert alert-warning text-center">
      Giỏ hàng của bạn đang trống. Không thể tiến hành thanh toán.
      <router-link to="/" class="alert-link">Quay lại trang chủ để mua sắm.</router-link>
    </div>

    <div v-else class="checkout-form-container">
      <div class="row">
        <div class="col-md-7">
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Thông tin đơn hàng</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li v-for="(item, index) in cartStore.items" :key="item.name" class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <img :src="item.image" :alt="item.name" class="checkout-item-image me-2">
                    {{ item.name }} x {{ item.quantity }}
                  </div>
                  <span>{{ (item.price * item.quantity).toLocaleString('vi-VN') }}₫</span>
                </li>
              </ul>
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <h4>Tổng cộng:</h4>
                <h4 class="text-danger">{{ cartStore.cartTotal.toLocaleString('vi-VN') }}₫</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-5">
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">Thông tin giao hàng và thanh toán</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitOrder">
                <div class="mb-3">
                  <label for="fullName" class="form-label">Họ và Tên</label>
                  <input type="text" class="form-control" id="fullName" v-model="customerInfo.fullName" required>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">Số điện thoại</label>
                  <input type="tel" class="form-control" id="phone" v-model="customerInfo.phone" required>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Địa chỉ</label>
                  <input type="text" class="form-control" id="address" v-model="customerInfo.address" required>
                </div>
                <div class="mb-3">
                  <label for="notes" class="form-label">Ghi chú (tùy chọn)</label>
                  <textarea class="form-control" id="notes" rows="3" v-model="customerInfo.notes"></textarea>
                </div>

                <div class="mb-4">
                  <label class="form-label">Phương thức thanh toán</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="cashOnDelivery" value="COD" v-model="customerInfo.paymentMethod" required>
                    <label class="form-check-label" for="cashOnDelivery">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="bankTransfer" value="BankTransfer" v-model="customerInfo.paymentMethod" disabled>
                    <label class="form-check-label" for="bankTransfer">
                      Chuyển khoản ngân hàng (Chưa hỗ trợ)
                    </label>
                  </div>
                </div>

                <button type="submit" class="btn btn-success btn-lg w-100">
                  Xác nhận đặt hàng
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showMessage" class="toast-notification" :class="{ 'show': showMessage }">
    {{ messageText }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

// Thông tin khách hàng và thanh toán
const customerInfo = ref({
  fullName: '',
  phone: '',
  address: '',
  notes: '',
  paymentMethod: 'COD', // Mặc định là COD
});

// Biến cho toast notification
const showMessage = ref(false);
const messageText = ref('');
let timeoutId: number | undefined;

const submitOrder = async () => { // Đặt hàm là async
  if (cartStore.cartItemCount === 0) {
    messageText.value = 'Giỏ hàng trống. Không thể đặt hàng!';
    showMessage.value = true;
    setTimeout(() => showMessage.value = false, 3000);
    return;
  }

  try {
    // Gọi action từ Pinia store để gửi đơn hàng lên Supabase
    const orderResult = await cartStore.submitOrderToSupabase(customerInfo.value);

    if (orderResult.success) {
      console.log('Đơn hàng đã được đặt thành công!');
      // Xóa giỏ hàng sau khi đặt hàng thành công
      cartStore.clearCart();

      // Hiển thị thông báo thành công
      messageText.value = 'Đơn hàng của bạn đã được đặt thành công!';
      showMessage.value = true;

      // Xóa thông báo sau 3 giây và chuyển hướng về trang chủ
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        showMessage.value = false;
        messageText.value = '';
        router.push('/'); // Chuyển hướng về trang chủ
      }, 3000);
    } else {
      // Xử lý lỗi khi đặt hàng
      console.error('Lỗi khi đặt hàng:', orderResult.error);
      messageText.value = `Đã xảy ra lỗi khi đặt hàng: ${orderResult.error}. Vui lòng thử lại.`;
      showMessage.value = true;
      setTimeout(() => showMessage.value = false, 5000); // Giữ thông báo lỗi lâu hơn
    }
  } catch (error) {
    console.error('Lỗi không xác định trong quá trình đặt hàng:', error);
    messageText.value = 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
    showMessage.value = true;
    setTimeout(() => showMessage.value = false, 5000);
  }
};
</script>

<style scoped>
.checkout-item-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.checkout-form-container {
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  border-bottom: none;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background-color: rgba(40, 167, 69, 0.9); /* Màu xanh lá cho thành công */
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

/* Tùy chỉnh thêm nếu muốn màu đỏ cho lỗi */
.toast-notification.error {
  background-color: rgba(220, 53, 69, 0.9); /* Màu đỏ cho lỗi */
}
</style>