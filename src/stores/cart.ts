// src/stores/cart.ts
import { defineStore } from 'pinia';
import { supabase } from '@/supabase'; // Đảm bảo đường dẫn này chính xác
import { v4 as uuidv4 } from 'uuid';

interface FoodItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    cartTotal(): number {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemCount(): number {
      return this.items.reduce((count, item) => count + item.quantity, 0);
    }
  },

  actions: {
    addToCart(item: FoodItem, amount: number = 1) {
      const existing = this.items.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += amount;
      } else {
        this.items.push({ ...item, quantity: amount });
      }
    },

    removeFromCart(itemName: string) {
      this.items = this.items.filter(item => item.name !== itemName);
    },

    updateQuantity(itemName: string, newQuantity: number) {
      const item = this.items.find(i => i.name === itemName);
      if (item) {
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        } else {
          this.removeFromCart(itemName);
        }
      }
    },

    clearCart() {
      this.items = [];
    },

    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },

    async submitOrderToSupabase(customerInfo: CustomerInfo) {
      const userId = uuidv4();

      try {
        // 1️⃣ Lưu thông tin người dùng vào bảng 'user_info'
        const { error: userError } = await supabase.from('user_info').insert({
          id: userId,
          full_name: customerInfo.fullName,
          phone: customerInfo.phone,
          address: customerInfo.address,
          notes: customerInfo.notes || '',
        });

        if (userError) throw userError;

        // 2️⃣ Chuẩn bị dữ liệu từng món trong giỏ hàng để lưu vào bảng 'order_records'
        const orderItemsToInsert = this.items.map(item => ({
          user_id: userId, // Liên kết với ID người dùng vừa tạo
          user_name: customerInfo.fullName,
          user_address: customerInfo.address,
          user_phone: customerInfo.phone,
          food_name: item.name,
          food_category: item.category, // Giá trị này phải khớp với CHECK constraint trong DB
          food_price: item.price,
          food_image: item.image,
          quantity: item.quantity,
          status: 'ordered', // Trạng thái ban đầu của đơn hàng
        }));

        // 3️⃣ Lưu các món hàng vào bảng 'order_records'
        const { error: orderError } = await supabase.from('order_records').insert(orderItemsToInsert);

        if (orderError) throw orderError;

        return { success: true };
      } catch (err: any) {
        console.error('❌ Lỗi gửi đơn hàng:', err);
        return { success: false, error: err.message || 'Lỗi không xác định' };
      }
    }
  }
});