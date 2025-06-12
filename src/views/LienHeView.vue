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
let timeoutId: ReturnType<typeof setTimeout> | undefined;
 // Để lưu ID của setTimeout

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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.contact-container {
  font-family: 'Inter', sans-serif;
  max-width: 620px;
  margin: 60px auto;
  background-color: #fffdfc;
  padding: 36px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  color: #333;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #e65100;
  font-size: 34px;
  font-weight: 600;
}

.contact-info {
  margin-bottom: 32px;
  font-size: 15.5px;
  line-height: 1.7;
  color: #555;
}

.contact-info p {
  margin-bottom: 10px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #ff7043;
  box-shadow: 0 0 0 3px rgba(255, 112, 67, 0.2);
}

.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form button {
  background-color: #ff5722;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease;
  width: 100%;
}

.contact-form button:hover:not(:disabled) {
  background-color: #e64a19;
  transform: translateY(-1px);
}

.contact-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Toast notification */
.toast-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  background-color: #444;
  color: white;
  padding: 16px 28px;
  border-radius: 10px;
  font-size: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease, opacity 0.4s ease, visibility 0.4s ease;
  z-index: 9999;
  text-align: center;
  min-width: 320px;
}

.toast-notification.success {
  background-color: rgba(56, 168, 64, 0.95);
}

.toast-notification.danger {
  background-color: rgba(220, 53, 69, 0.95);
}

.toast-notification.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Responsive */
@media (max-width: 600px) {
  .contact-container {
    padding: 24px;
    margin: 20px;
  }

  .title {
    font-size: 26px;
  }

  .contact-form button {
    font-size: 15px;
  }

  .toast-notification {
    min-width: 260px;
    font-size: 15px;
    padding: 12px 20px;
  }
}
</style>
