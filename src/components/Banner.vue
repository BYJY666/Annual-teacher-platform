<template>
  <div>
    <div class="swiper-container" ref="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in banner" :key="index">
          <img :src="item.imgsrc" />
          <div class="bannerTextBox">
            <div class="m">
              <div class="bannerText">
                <div class="bannerTitle">{{ item.title }}</div>
                <div>———</div>
                <span>{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'Banner',
  props: ['banner'],
  methods: {
    initSwiper() {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1,
        effect: 'fade',
        loop: true,
      })
    },
  },
  mounted() {
    this.initSwiper()
  },
}
</script>

<style lang="less" scoped>
@import '../../node_modules/swiper/dist/css/swiper.css';
html,
body {
  position: relative;
  height: 100%;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  width: 100%;
  height: 100%;
  margin-bottom: 60px;
  min-width: 1200px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  img {
    width: 100%;
  }
}

.bannerTextBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .bannerText {
    width: 600px;
    height: 300px;
    padding-top: 50px;
    color: #fff;
    font-family: KaiTi;
    .bannerTitle {
      font-size: 28px;
      margin-bottom: 10px;
    }
    span {
      padding-top: 10px;
      line-height: 20pt;
    }
  }
}
</style>