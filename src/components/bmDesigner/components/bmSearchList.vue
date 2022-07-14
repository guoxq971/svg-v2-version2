<template>
  <div>
    <div class="search-wrap">
      <el-input
        class="ipt"
        placeholder="请输入末班名称、模板号"
        v-model="search.val"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select class="sel" v-model="search.sel1">
        <el-option label="分类" value=""></el-option>
      </el-select>
      <el-select class="sel" v-model="search.sel2">
        <el-option label="新品" value=""></el-option>
      </el-select>
    </div>
    <div class="list">
      <div
        class="item-list"
        :key="item.id"
        v-for="item in list"
        @click="handlerSel(item)"
      >
        <img :src="item.url" alt="" bm="1"/>
        <div class="collect" @click.stop="handlerCollect(item)">
          {{ item.isCollect === 1 ? "☆" : "★" }}
        </div>
      </div>
      <div class="item-list-space" v-for="item in list.length % 4"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      search: {
        val: "",
        sel1: "",
        sel2: "",
      },
    };
  },
  methods: {
    // 选中图片
    handlerSel(data) {
      this.$emit("clickPic", data);
    },
    // 收藏
    handlerCollect(data) {
      console.log("data2", data);
    },
  },
};
</script>

<style lang="scss" scoped>
// 搜索
.search-wrap {
  display: flex;
  margin: 0 4px 4px 4px;

  .ipt {
    flex: 8;
  }

  .sel {
    flex: 2.5;
  }
}

// 盒子列表
.list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  height: 500px;
  overflow: auto;

  .item-list {
    width: 20%;
    height: 0;
    padding: 10% 0 10% 0;
    margin: 4px;
    border: 1px solid transparent;
    // background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    position: relative;

    img {
      width: 74px;
      height: 74px;
    }

    &:hover {
      border: 1px solid #0099ff !important;
      box-shadow: 0px 1px 7px #0099ff8a;
    }

    .collect {
      position: absolute;
      right: 17px;
      top: -2px;
      font-size: 15px;
      width: 0;
      cursor: pointer;
    }
  }

  .item-list-space {
    width: 20%;
    height: 0;
    padding: 10% 0 10% 0;
    margin: 4px;
  }
}
</style>
