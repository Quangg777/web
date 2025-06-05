<template>
  <footer class="footer">
    <div class="container">
      <div class="map">
        <a>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.814845164487!2d106.6747099152606!3d10.762625192327697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2db6e703cb%3A0x3bc4db3911df48ae!2zMzMgTOG7jWMgVuG6pXksIFBow6FuaCAyLCBRdeG6rW4gMTAsIEhvIMSQ4buTbmcgSG_DoG0!5e0!3m2!1svi!2s!4v1688466221234!5m2!1svi!2s"
          ></iframe>
        </a>
      </div>
      <div class="info">
        <p>Điện thoại: <a href="tel:02838330371">028 3833 0371</a></p>
        <p>Địa chỉ: 33 D. Vĩnh Viễn, Phường 2, Quận 10, Hồ Chí Minh</p>
        <p>© 2024 - Khám Phá Ẩm Thực Việt Nam</p>
      </div>
    <div class="facebook">
  <a href="https://facebook.com"  >
    <img src="/public/logofb.jpg" alt="Ảnh mẫu" width="150">
  </a>
</div>
    </div>
  </footer>
</template>




<style scoped>
.footer {
  color: black;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.map iframe {
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.info {
  flex: 1 1 300px;
  text-align: center;
}

.info a {
  color: #ff6633;
  text-decoration: none;
}

.info a:hover {
  text-decoration: underline;
}

.facebook {
  min-width: 150px;
  text-align: right;
}

/* Responsive */
@media (max-width: 800px) {
  .container {
    flex-direction: column;
    text-align: center;
  }
  .facebook {
    text-align: center;
    margin-top: 15px;
  }
}

</style>
