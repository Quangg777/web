
<template>
  <div class="auth-form">
    <!-- from đăng xuấtxuất -->
    <template v-if="daDangNhap">
      <h2>Chào: {{ email }}</h2>
      <button @click="dangXuat">Đăng xuất</button>
      <p v-if="thongBao">{{ thongBao }}</p>
    </template>

 <!-- from đăng nhập đăng kýký -->
    <template v-else>
      <h2>{{ dangKy ? 'Đăng ký' : 'Đăng nhập' }}</h2>
      <form @submit.prevent="dangKy ? xuLyDangKy() : xuLyDangNhap()">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="matKhau" type="password" placeholder="Mật khẩu" required />
        <button type="submit">{{ dangKy ? 'Đăng ký' : 'Đăng nhập' }}</button>
      </form>
      <p @click="dangKy = !dangKy" style="cursor:pointer;color:blue">
        {{ dangKy ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký' }}
      </p>
      <p v-if="thongBao">{{ thongBao }}</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()

const email = ref('')
const matKhau = ref('')
const dangKy = ref(false)
const thongBao = ref('')
const daDangNhap = ref(false)

// Kiểm tra trạng thái đăng nhập khi mở trang
onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  if (data.user) {
    daDangNhap.value = true
    email.value = data.user.email
  }
})

//  Xử lý đăng ký
const xuLyDangKy = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: matKhau.value
  })
  thongBao.value = error
    ? `Lỗi đăng ký: ${error.message}`
    : 'Đăng ký thành công mời bạn đăng nhập.'
}

// Xử lý đăng nhập
const xuLyDangNhap = async () => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: matKhau.value
  })
  if (error) {
    thongBao.value = `Lỗi đăng nhập: ${error.message}`
  } else {
    thongBao.value = 'Đăng nhập thành công!'
    daDangNhap.value = true
    email.value = data.user?.email || email.value
    router.push('/')
  }
}

// Xử lý đăng xuất
const dangXuat = async () => {
  await supabase.auth.signOut()
  thongBao.value = 'Đã đăng xuất.'
  daDangNhap.value = false
  email.value = ''
  matKhau.value = ''
}

</script>









<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.auth-form {
  font-family: 'Inter', sans-serif;
  max-width: 400px;
  width: 90%;
  margin: 60px auto;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #222;
  font-weight: 600;
}

.auth-form input {
  width: 100%;
  padding: 12px 16px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  transition: 0.2s;
  background-color: #f9f9f9;
}

.auth-form input:focus {
  border-color: #7f3df7;
  background-color: #fff;
  outline: none;
  box-shadow: 0 0 5px rgba(127, 61, 247, 0.3);
}

.auth-form button {
  width: 100%;
  padding: 12px;
  margin-top: 14px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(135deg, #7f3df7, #b674f8);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.auth-form button:hover {
  background: linear-gradient(135deg, #6c2de2, #a65df3);
  transform: scale(1.02);
}

.auth-form p {
  text-align: center;
  margin-top: 18px;
  font-size: 14px;
  color: #555;
}

.auth-form p[style] {
  color: #7f3df7 !important;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
}

.auth-form p[style]:hover {
  color: #5c22cc !important;
}

@media (max-width: 480px) {
  .auth-form {
    padding: 24px;
    margin: 40px auto;
  }

  .auth-form h2 {
    font-size: 20px;
  }

  .auth-form input,
  .auth-form button {
    font-size: 14px;
  }
}
</style>
