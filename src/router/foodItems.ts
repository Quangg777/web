// src/router/foodItems.ts (hoặc file chứa dữ liệu món ăn của bạn)

export const foodItems = [
    {
      name: 'Cơm Chiên',
      description: 'Cơm chiên vàng giòn, thơm ngon khó cưỡng.',
      price: 40000,
      image: '/comchien.jpg',
      category: 'Món Chính', // ĐÃ SỬA: Phải khớp CHÍNH XÁC với Supabase
    },
    {
        name: 'Cơm Cuộn',
        description: 'Cơm cuộn đầy đặn, phong cách Nhật Bản.',
        price: 45000,
        image: '/comcuon.jpg',
        category: 'Món Chính', // ĐÃ SỬA
      },
      {
        name: 'Cơm Gà',
        description: 'Cơm gà truyền thống, thịt gà mềm ngon.',
        price: 50000,
        image: '/comga.jpg',
        category: 'Món Chính', // ĐÃ SỬA
      },
      {
        name: 'Gyudon',
        description: 'Cơm bò xào hành kiểu Nhật thơm ngon.',
        price: 55000,
        image: '/gyudon.jpg',
        category: 'Món Chính', // ĐÃ SỬA
        isFeatured: true
      },
      {
        name: 'Ramen',
        description: 'Mì ramen nước dùng đậm đà kiểu Nhật.',
        price: 55000,
        image: '/ramen.jpg',
        category: 'Món Chính', // ĐÃ SỬA
        isFeatured: true
      },
      {
        name: 'Mỳ Ý',
        description: 'Mỳ Ý sốt cà chua và thịt bằm truyền thống.',
        price: 48000,
        image: '/myy.jpg',
        category: 'Món Chính', // ĐÃ SỬA
        isFeatured: true
      },
      {
        name: 'Hamburger',
        description: 'Hamburger nhân thịt đậm đà, phô mai tan chảy.',
        price: 50000,
        image: '/humberger.jpg',
        category: 'Món Phụ', // ĐÃ SỬA
      },
      {
        name: 'Sushi',
        description: 'Sushi cá hồi tươi ngon, cơm mềm dẻo.',
        price: 60000,
        image: '/sushi.jpg',
        category: 'Món Phụ', // ĐÃ SỬA
        isFeatured: true
      },

      // Món phụ
      {
        name: 'Khoai Tây Chiên',
        description: 'Khoai tây chiên giòn rụm, ngon miệng.',
        price: 20000,
        image: '/khoaitaychien.jpg',
        category: 'Món Phụ', // ĐÃ SỬA
      },
      {
        name: 'Xúc Xích Chiên',
        description: 'Xúc xích chiên giòn, thơm, phù hợp ăn vặt.',
        price: 22000,
        image: '/xucxichchien.jpg',
        category: 'Món Phụ', // ĐÃ SỬA
      },
      {
        name: 'Salad Trộn',
        description: 'Salad tươi mát với sốt mè rang.',
        price: 30000,
        image: '/saladtron.jpg',
        category: 'Món Phụ', // ĐÃ SỬA
        isFeatured: false
      },
      {
        name: 'Panna Cotta',
        description: 'Món tráng miệng Ý béo mịn, ngọt ngào.',
        price: 35000,
        image: '/PannaCottajpg.jpg',
        category: 'Tráng Miệng', // ĐÃ SỬA
        isFeatured: true
      },
      {
        name: 'Trà Chanh',
        description: 'Trà chanh tươi mát, giải nhiệt ngày hè.',
        price: 15000,
        image: '/traicay.jpg',
        category: 'Tráng Miệng', // ĐÃ SỬA
      },
      {
        name: 'Trà Lài',
        description: 'Trà lài thơm dịu, dễ chịu và thư giãn.',
        price: 12000,
        image: '/tralai-550x550.png',
        category: 'Tráng Miệng', // ĐÃ SỬA
      },
      {
        name: 'Trà Sữa',
        description: 'Trà sữa trân châu ngọt ngào, béo thơm.',
        price: 25000,
        image: '/ts.png',
        category: 'Tráng Miệng', // ĐÃ SỬA
      },
      {
        name: 'Trái Cây Tươi',
        description: 'Mix nhiều loại trái cây tươi ngon mát lạnh.',
        price: 25000,
        image: '/traicay.jpg',
        category: 'Tráng Miệng', // ĐÃ SỬA
      },
      {
        name: 'Sukicha',
        description: 'Trà sữa Sukicha thơm béo, topping trân châu giòn dai.',
        price: 25000,
        image: '/sukicha.jpg',
        category: 'Tráng Miệng', // ĐÃ SỬA
      },
      
  ]