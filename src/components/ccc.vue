<template>
  <div class="about">
    <div class="container">
      <h1>Chào mừng đến với Quán Ăn Ẩm Thực của Chúng Tôi!</h1>
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
.about {
  padding: 40px 0;
  background-color: #f8f8f8;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  color: #ff5722;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: #ff5722;
  margin-top: 25px;
  margin-bottom: 15px;
}

p {
  line-height: 1.6;
  margin-bottom: 15px;
  color: #333;
}

ul {
  list-style: disc;
  padding-left: 25px;
  margin-bottom: 20px;
}

li {
  margin-bottom: 8px;
  color: #555;
}

.signature {
  font-style: italic;
  text-align: right;
  color: #777;
  margin-top: 30px;
}

/* Ảnh banner */
.intro-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 20px 0;
}

/* Cặp ảnh bên trái và mô tả bên phải */
.image-text-pair {
  display: flex;
  gap: 30px;
  margin-top: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.image-text-pair .left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-text-pair .left img {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-text-pair .right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-block h3 {
  margin-bottom: 5px;
  color: #ff5722;
}

.text-block p {
  margin: 0;
  color: #444;
}
</style>
