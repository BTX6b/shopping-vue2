<template>
  <div class="carousel-container">
    <!--banner轮播-->
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="carousel in bannerList"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
        <!-- <div class="swiper-slide">
                <img src="./images/banner2.jpg" />
              </div>
              <div class="swiper-slide">
                <img src="./images/banner3.jpg" />
              </div>
              <div class="swiper-slide">
                <img src="./images/banner4.jpg" />
              </div> -->
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
// 轮播图组件
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['bannerList'],
  // watch 监听数据变化
  watch: {
    bannerList: {
      // 数据不管发没发生变化 都会监听一次
      immediate: true,
      handler(newValue, oldValue) {
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 自动播放 默认3秒
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
