<template>
  <footer class="footer">
    <div class="container">
      <!-- Bản đồ Google Maps -->
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.814845164487!2d106.6747099152606!3d10.762625192327697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2db6e703cb%3A0x3bc4db3911df48ae!2zMzMgTOG7jWMgVuG6pXksIFBow6FuaCAyLCBRdeG6rW4gMTAsIEhvIMSQ4buTbmcgSG_DoG0!5e0!3m2!1svi!2s!4v1688466221234!5m2!1svi!2s"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="info">
        <p>📞 Điện thoại: <a href="tel:02838330371">028 3833 0371</a></p>
        <p>📍 Địa chỉ: 33 D. Vĩnh Viễn, Phường 2, Quận 10, Hồ Chí Minh</p>
        <p>© 2024 - Khám Phá Ẩm Thực Việt Nam</p>
      </div>

      <!-- Logo Facebook -->
      <div class="social">
        <a href="https://facebook.com" target="_blank" rel="noopener">
          <img src="/public/logofb.jpg" alt="Facebook" class="social-icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #fff8f4;
  color: #333;
  padding: 30px 20px;
  border-top: 4px solid #ff5722;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

.container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
}

.map iframe {
  width: 100%;
  max-width: 350px;
  height: 200px;
  border: 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info {
  flex: 1 1 300px;
  font-size: 15px;
  line-height: 1.6;
  text-align: left;
}

.info p {
  margin: 8px 0;
}

.info a {
  color: #ff5722;
  font-weight: 600;
  text-decoration: none;
}

.info a:hover {
  text-decoration: underline;
}

.social {
  min-width: 120px;
  text-align: center;
}

.social-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .info {
    text-align: center;
  }

  .map iframe {
    max-width: 100%;
  }
}
</style>
