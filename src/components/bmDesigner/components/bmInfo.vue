<template>
  <div class="info-wrap">
    <div class="price">
      <div class="el-icon-question icon"></div>
      <div class="text">￥19.24</div>
    </div>
    <div class="type">
      <div class="size">
        <div class="el-icon-warning icon"></div>
        <div class="size-list">
          <div class="item-size action" style="background: #fff"></div>
          <div class="item-size" style="background: #000"></div>
        </div>
      </div>
      <div class="size-type">
        <div class="item-size-type action">S(20CM)</div>
        <div class="item-size-type">XL(43CM)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actionSize: "",
      actionSizeType: "",
    };
  },
  methods: {
    // 尺码选择
    handlerSelSize() {},
    // 尺码类型选择
    handlerSelSizeType() {},
  },
};
</script>

<style lang="scss" scoped>
// 基本信息
.info-wrap {
  margin-left: 75px;
  .price {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    font-weight: bold;
    font-size: 17px;
    .icon {
      color: #0099ff;
      margin-right: 4px;
    }
    .text {
      color: #ff7a3d;
    }
  }
  .type {
    .action {
      border: 1px solid #0099ff !important;
      box-shadow: 0px 1px 7px #0099ff8a;
    }
    .size {
      display: flex;
      align-items: center;
      .size-list {
        display: flex;
        .item-size {
          width: 19px;
          height: 19px;
          border: 1px solid #000;
          margin-right: 5px;
          cursor: pointer;
        }
      }
      .icon {
        align-items: center;
        margin-right: 4px;
        color: #ff9900;
      }
    }
    .size-type {
      margin-top: 10px;
      margin-left: 20px;
      display: flex;
      .item-size-type {
        margin-right: 5px;
        border: 1px solid;
        padding: 7px;
        font-size: 10px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
