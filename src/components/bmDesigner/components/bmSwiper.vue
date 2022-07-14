<template>
  <!--基础存放容器-->
  <div class="swiper-container">
    <!-- 需要进行轮播的部分 -->
    <div class="swiper-wrapper">
      <!-- 每个节点 -->
      <div class="swiper-slide">
        <img src="../img/banner1.jpg" alt="图片1" />
      </div>
      <div class="swiper-slide">
        <img src="../img/banner2.jpg" alt="图片2" />
      </div>
      <div class="swiper-slide">
        <img src="../img/banner3.jpg" alt="图片2" />
      </div>
    </div>
    <!--如果需要使用分页器-->
    <div class="swiper-pagination swiper-pagination-white"></div>
    <!-- 如果需要使用前进后退按钮 -->
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      //分页器
      pagination: ".swiper-pagination",
      paginationClickable: true,
      //前进后退按钮
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../css/swiper.css";
.swiper-container {
  height: 230px;
  // 进度条 小原点边框
  ::v-deep .swiper-pagination-bullet {
    background-color: #fff;
    border: 2px solid #4f90f9;
  }
  // 进度条 小原点 action 背景色
  ::v-deep .swiper-pagination-white .swiper-pagination-bullet-active {
    background-color: #4f90f9;
  }
  .swiper-wrapper {
    .swiper-slide {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
