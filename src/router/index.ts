import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LienHeView from '../views/LienHeView.vue'
import AuthView from '../views/AuthView.vue'



// Components
import MonChinh from '@/components/MonChinh.vue'
import MonPhu from '@/components/MonPhu.vue'
import TrangMieng from '@/components/TrangMieng.vue'
import FoodDetail from '@/components/FoodDetail.vue'
import TimKiem from '@/components/Timkiem.vue'
import CartView from '@/components/CartView.vue'
import CheckoutView from '@/components/CheckoutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/gioi-thieu', name: 'gioithieu', component: AboutView },

  // ✅ Route đăng nhập/đăng ký chung
  { path: '/auth', name: 'auth', component: AuthView },

  // ❌ Bạn nên xóa nếu không còn dùng riêng LoginView & RegisterView
  // { path: '/dang-nhap', name: 'login', component: LoginView },
  // { path: '/dang-ky', name: 'register', component: RegisterView },

  { path: '/mon-chinh', name: 'monchinh', component: MonChinh },
  { path: '/mon-phu', name: 'monphu', component: MonPhu },
  { path: '/trang-mieng', name: 'trangmieng', component: TrangMieng },
  { path: '/lien-he', name: 'contact', component: LienHeView },
  { path: '/food/:name', name: 'FoodDetail', component: FoodDetail, props: true },
  { path: '/tim-kiem', name: 'timkiem', component: TimKiem },
  { path: '/gio-hang', name: 'cart', component: CartView },
  { path: '/thanh-toan', name: 'checkout', component: CheckoutView },
   { path: '/dang-nhap', name: 'authview', component: AuthView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
