<template>
  <div class="contact-container">
    <h1 class="title">Liên hệ với chúng tôi</h1>

    <div class="contact-info">
      <p><strong>📧 Email:</strong> amthuc@example.com</p>
      <p><strong>📞 Số điện thoại:</strong> 0123 456 789</p>
      <p><strong>📍 Địa chỉ:</strong> 123 Đường Ẩm Thực, Quận 1, TP.HCM</p>
    </div>

    <form class="contact-form" @submit.prevent="submitForm">
      <input type="text" v-model="form.name" placeholder="Họ tên" required />
      <input type="email" v-model="form.email" placeholder="Email" required />
      <textarea v-model="form.message" placeholder="Nội dung" rows="5" required></textarea>
      <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ' }}</button>
    </form>
  </div>

  <div v-if="submitMessage" :class="['toast-notification', submitSuccess ? 'success' : 'danger', { 'show': submitMessage }]">
    {{ submitMessage }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/supabase';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitSuccess = ref(false);
let timeoutId: number | undefined; // Để lưu ID của setTimeout

const submitForm = async () => {
  isSubmitting.value = true;
  submitMessage.value = ''; // Reset thông báo cũ
  submitSuccess.value = false;

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: form.value.name,
          email: form.value.email,
          message: form.value.message,
        },
      ]);

    if (error) {
      throw error;
    }

    submitSuccess.value = true;
    submitMessage.value = `Cảm ơn ${form.value.name} đã liên hệ! Tin nhắn của bạn đã được gửi thành công.`;
    form.value = { name: '', email: '', message: '' }; // Xóa form

  } catch (error: any) {
    console.error('Lỗi gửi liên hệ:', error);
    submitSuccess.value = false;
    submitMessage.value = `Lỗi: Không thể gửi tin nhắn. Vui lòng thử lại sau. (${error.message || error.details})`;
  } finally {
    isSubmitting.value = false;
    // Xóa timeout cũ nếu có (để tránh thông báo biến mất quá sớm nếu người dùng bấm liên tục)
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    // Tự động ẩn thông báo sau vài giây (ví dụ 5 giây)
    timeoutId = setTimeout(() => {
      submitMessage.value = '';
    }, 5000);
  }
};
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 40px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  color: #333;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #ff5722;
}

.contact-info {
  margin-bottom: 30px;
  font-size: 15px;
  line-height: 1.6;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.contact-form button {
  background-color: #ff5722;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-form button:hover:not(:disabled) {
  background-color: #e64a19;
}

.contact-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* CSS cho thông báo dạng "Toast"
  Lấy cảm hứng từ style bạn đã có, điều chỉnh cho phù hợp.
*/
.toast-notification {
  position: fixed; /* Ghim thông báo vào viewport */
  top: 20px; /* Cách đỉnh màn hình 20px */
  left: 50%; /* Canh giữa theo chiều ngang */
  transform: translateX(-50%) translateY(-100%); /* Ban đầu ẩn trên màn hình */
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  z-index: 1000; /* Đảm bảo hiển thị trên tất cả các element khác */
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out, visibility 0.4s ease-out;
  font-size: 1.3em;
  min-width: 300px;
  text-align: center;
  color: white; /* Mặc định chữ trắng */
}

.toast-notification.success {
  background-color: rgba(40, 167, 69, 0.9); /* Xanh lá cây */
}

.toast-notification.danger {
  background-color: rgba(220, 53, 69, 0.9); /* Đỏ */
}

.toast-notification.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0); /* Di chuyển xuống vị trí hiển thị */
}
</style>