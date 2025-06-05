<!-- src/views/AuthView.vue -->
<template>
  <div class="auth-form">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()

const email = ref('')
const matKhau = ref('')
const dangKy = ref(false)
const thongBao = ref('')

// đăng kýký

const xuLyDangKy = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: matKhau.value
  })
  thongBao.value = error ? `Lỗi đăng ký: ${error.message}` : 'Vui lòng kiểm tra email để xác nhận đăng ký( mời bạn đăng nhập).'
}

// đăng nhậpnhập

const xuLyDangNhap = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: matKhau.value
  })
  if (error) {
    thongBao.value = `Lỗi đăng nhập: ${error.message}`
  } else {
    thongBao.value = 'Đăng nhập thành công!'
    router.push('/') 
  }
}
</script>

<style scoped>
.auth-form {
  width: 300px;
  margin: 50px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.auth-form input {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 8px;
}
.auth-form button {
  width: 100%;
  padding: 8px;
  background-color: #791af5;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
