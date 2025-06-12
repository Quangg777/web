<template>
  <div class="about">
    <div class="container">
      <h2>Chào mừng đến với Quán Ăn Ẩm Thực của Chúng Tôi!</h2>
      <img src="/goithieu1.jpg" alt="Ảnh banner" class="intro-image" />

      <p>
        Chúng tôi là nơi hội tụ những người yêu mến hương vị ẩm thực đặc sắc, nơi bạn có thể khám phá những món ăn ngon được chế biến tỉ mỉ, chia sẻ niềm đam mê ẩm thực và tận hưởng không gian ấm cúng.
      </p>
      <p>
        Mục tiêu của chúng tôi là mang đến cho bạn một trải nghiệm ẩm thực thân thiện và đáng nhớ, giúp bạn dễ dàng lựa chọn và thưởng thức những món ăn yêu thích. Dù bạn muốn khám phá những hương vị truyền thống hay tìm kiếm những món ăn mới lạ, chúng tôi tin rằng bạn sẽ tìm thấy điều gì đó đặc biệt tại Quán Ăn Ẩm Thực của Chúng Tôi.
      </p>

      <h2>Những gì bạn có thể tìm thấy ở đây:</h2>
      <ul>
        <li><b>Thực đơn món ăn đa dạng:</b> Từ những món ăn truyền thống đậm đà hương vị quê nhà đến những sáng tạo mới lạ, hấp dẫn vị giác.</li>
        <li><b>Mô tả chi tiết:</b> Thông tin rõ ràng về nguyên liệu, cách chế biến và hương vị đặc trưng của từng món ăn.</li>
        <li><b>Gợi ý bữa ăn:</b> Các set menu hấp dẫn cho bữa trưa văn phòng, bữa tối gia đình hay những dịp đặc biệt.</li>
        <li><b>Bí quyết ẩm thực:</b> Chia sẻ những mẹo nhỏ giúp bạn lựa chọn món ăn phù hợp và thưởng thức trọn vẹn hương vị.</li>
        <li><b>Không gian ấm cúng:</b> Một địa điểm lý tưởng để bạn thưởng thức bữa ăn ngon miệng bên gia đình, bạn bè và những người thân yêu.</li>
      </ul>

      <div class="image-text-pair">
        <div class="left">
          <img src="/public/thuc-pham-tuoi-song-1024x817.jpeg" alt="Ảnh thực phẩm" />
          <img src="/public/khonggianquanan.jpg" alt="Ảnh không gian" />
        </div>
        <div class="right">
          <div class="text-block">
            <h3>Thực phẩm tươi sống </h3>
            <p>Thực phẩm tươi sống là nền tảng cho những bữa ăn chất lượng và dinh dưỡng.
               Tại quán ăn của chúng tôi, từng nguyên liệu – từ rau củ, thịt cá đến hải sản
               – đều được lựa chọn kỹ lưỡng từ nguồn cung uy tín, đảm bảo độ tươi ngon và an toàn tuyệt đối.
                Chúng tôi tin rằng hương vị thơm ngon bắt đầu từ sự tươi mới trong từng món ăn.</p>
          </div>
          <br><br>  <br><br>  <br><br>
          <div class="text-block">
            <h3>Không gian quán ăn </h3>
            <p>Không gian quán ăn được thiết kế ấm cúng và gần gũi,
               mang lại cảm giác thân thiện như đang dùng bữa tại chính ngôi nhà của bạn.
               Với ánh sáng dịu nhẹ, nội thất tinh tế và cách bày trí hài hòa,
               chúng tôi tạo nên một không gian lý tưởng để bạn thư giãn và tận hưởng trọn vẹn hương vị ẩm thực cùng người thân,
                bạn bè.</p>
          </div>
        </div>
      </div>

      <p class="signature">
        Đội ngũ phát triển Ẩm Thực ❤️
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.about {
  font-family: 'Inter', sans-serif;
  padding: 60px 0;
  background: linear-gradient(to bottom, #fefefe, #f3f3f3);
}

.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 24px;
}

h2 {
  color: #d35400;
  font-size: 26px;
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 600;
}

p {
  line-height: 1.75;
  margin-bottom: 18px;
  color: #333;
  font-size: 16px;
}

ul {
  list-style: disc;
  padding-left: 28px;
  margin-bottom: 24px;
}

li {
  margin-bottom: 12px;
  color: #555;
  font-size: 15.5px;
}

.signature {
  font-style: italic;
  text-align: right;
  color: #888;
  margin-top: 40px;
  font-size: 15px;
}

/* Ảnh banner */
.intro-image {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 16px;
  margin: 28px 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Layout ảnh + mô tả */
.image-text-pair {
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
  margin-top: 50px;
}

.image-text-pair .left,
.image-text-pair .right {
  flex: 1 1 300px;
}

.image-text-pair .left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-text-pair .left img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s;
}

.image-text-pair .left img:hover {
  transform: scale(1.02);
}

.text-block {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.text-block h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #e67e22;
  font-weight: 600;
}

.text-block p {
  color: #444;
  font-size: 15.5px;
  line-height: 1.6;
}

.text-block:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

/* Responsive */
@media (max-width: 768px) {
  .image-text-pair {
    flex-direction: column;
  }

  .container {
    padding: 0 16px;
  }

  h2 {
    font-size: 22px;
  }

  p, li {
    font-size: 15px;
  }
}
</style>

